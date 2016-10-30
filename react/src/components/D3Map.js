import React, { Component } from 'react';
import COUNTRYCODES from '../data/countryCodes.js'

export default class D3Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDestinations: [],
      countryCodes: COUNTRYCODES,
      world: ""
    }
  }

  getMapData() {
    var jqxhr = $.getJSON("world-50m.json", function(data) {
      console.log( "received json file" );
    })
      .done(data => {
        this.setState({ world: data }, function() {
          this.d3map();
        });
      })
  }

  d3map() {

    // swap country name and code, e.g. "840": "United States" =>
    // "United States": "840" to look up code by country name for highlighted array
    function swap(json) {
      let ret = {};
      for(let key in json) {
        ret[json[key]] = key;
      }
      return ret;
    }

    if (this.state.world !== "") {
      let countryCodes = swap(this.state.countryCodes);
      let userDestinations = this.state.userDestinations;
      let world = this.state.world;

      let width = 960,
      height = 547;

      let projection = d3.geoPatterson()
          .scale(153)
          .translate([width / 2, height / 2])
          .precision(.1);

      let path = d3.geoPath()
          .projection(projection);

      let graticule = d3.geoGraticule();

      let svg = d3.select(".d3map").append("svg")
          .attr("class", "worldmap")
          .attr("width", width)
          .attr("height", height);

      // render grid
      svg.append("path")
          .datum(graticule)
          .attr("class", "graticule")
          .attr("d", path);

      // render landmass
      svg.insert("path", ".graticule")
          .datum(topojson.feature(world, world.objects.land))
          .attr("class", "land")
          .attr("d", path);

      // render borders
      svg.insert("path", ".graticule")
          .datum(topojson.mesh(world, world.objects.countries, function(a, b) {
            return a !== b;
          }))
          .attr("class", "boundary")
          .attr("d", path);

      // e.g. 756 = Switzerland, 392 = Japan,
      // 578 = Norway, 124 = Canada, 554 = New Zealand,
      // 724 = Spain, 246 = Finland
      let highlighted = userDestinations.map(destination => {
        return parseInt(countryCodes[destination.country]);
      })

      // highlight the destinations added by the user
      svg.insert("path", ".graticule")
          .datum(topojson.mesh(world, world.objects.countries, function(a, b) {
            return highlighted.includes(a.id);
          }))
          .attr("class", "highlighted")
          .attr("d", path);

      d3.select(self.frameElement).style("height", height + "px");
    }
  }

  componentWillReceiveProps(nextProps) {

    let previousState = this.state.userDestinations;
    this.setState({ userDestinations: nextProps.userDestinations }, function() {
      // only render new map if new destination has been added
      if (this.state.userDestinations !== previousState) {
        // remove any previous renderings of the map
        d3.select(".d3map svg").remove();
        // then render new map
        this.getMapData()
      }
    })
  }

  render() {
    return(
      <div className="d3map center-align">

      </div>
    )
  }
}
