import React, { Component } from 'react';
import { Link } from 'react-router';

export default class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [""],
      userDestinations: [""],
      userDestinationNotes: [""],
      userBooks: [""]
    }
  }

  getDashboard() {
    $.ajax({
      url: '/api/v1/users',
      contentType: 'application/json'
    })
    .done(data => {
      this.setState({
        userInfo: data.user_info,
        userDestinations: data.destinations,
        userDestinationNotes: data.destination_notes,
        userBooks: data.books
      });

      this.drawRadialDendrogram(data.datamap);
    });
  }

  drawRadialDendrogram(data) {
    let project = (x, y) => {
      let angle = (x - 90) / 180 * Math.PI, radius = y;
      return [radius * Math.cos(angle), radius * Math.sin(angle)];
    }

    let svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height"),
        g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + (height / 2 + 20) + ")");

    let stratify = d3.stratify()
        .parentId(function(d) { return d.id.substring(0, d.id.lastIndexOf(".")); });

    let cluster = d3.cluster()
        .size([360, width / 2 - 120]);

    let root = stratify(data)
        .sort(function(a, b) { return a.height - b.height || a.id.localeCompare(b.id); });

    cluster(root);

    let link = g.selectAll(".link")
        .data(root.descendants().slice(1))
      .enter().append("path")
        .attr("class", "link")
        .attr("d", function(d) {
          return("M" + project(d.x, d.y)
              + "C" + project(d.x, (d.y + d.parent.y) / 2)
              + " " + project(d.parent.x, (d.y + d.parent.y) / 2)
              + " " + project(d.parent.x, d.parent.y));
        });

    let node = g.selectAll(".node")
        .data(root.descendants())
      .enter().append("g")
        .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
        .attr("transform", function(d) { return "translate(" + project(d.x, d.y) + ")"; });

    node.append("circle")
        .attr("r", 2.5);

    node.append("text")
        .attr("dy", "0.31em")
        .attr("x", function(d) { return d.x < 180 === !d.children ? 6 : -6; })
        .style("text-anchor", function(d) { return d.x < 180 === !d.children ? "start" : "end"; })
        .attr("transform", function(d) { return "rotate(" + (d.x < 180 ? d.x - 90 : d.x + 90) + ")"; })
        .text(function(d) { return d.id.substring(d.id.lastIndexOf(".") + 1); });
  }



  componentDidMount() {
    this.getDashboard();
  }

  render() {
    let userName,
        recentDestination,
        recentBook,
        recentNote,
        tentativeRecentNote,
        destinationMatch,
        destination = "",
        city = "";

    if (this.state.userInfo.first_name != undefined) {
      userName = this.state.userInfo.first_name;
    }
    if (this.state.userDestinations[0] != undefined) {
      recentDestination = this.state.userDestinations[0].country;
    }
    if (this.state.userBooks[0] != undefined) {
      recentBook = this.state.userBooks[0].title;
    }

    for (let note of this.state.userDestinationNotes) {
      if (note.note !== "") {
        tentativeRecentNote = note;
        break;
      }
    }

    if (this.state.userDestinationNotes[0] != undefined) {
      if ((tentativeRecentNote !== "") && (tentativeRecentNote !== undefined)) {
        destinationMatch = this.state.userDestinations.filter(destination => {
          return destination.id === tentativeRecentNote.destination_id;
        });
        recentNote = tentativeRecentNote.note;
      }
    }

    if (destinationMatch !== undefined) {
      if (destinationMatch[0].city !== "") {
        city = `${destinationMatch[0].city}, `;
      }
      destination = `${city}${destinationMatch[0].country}:`;
    }

    return(
      <div className="container">
        <h1 className="center-align">Welcome, {userName}</h1>

          <div className="row">
            <div className="col s4 m4 center-align">
              <h5>Recent Activity</h5>
              <div className="divider"></div>
              <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                  <span className="card-title">Recent Destination</span>
                  <p>{recentDestination}</p>
                </div>
                <div className="card-action">
                  <Link to="/destinations">My Destinations</Link>
                </div>
              </div>


              <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                  <span className="card-title">Recent Book</span>
                  <p>{recentBook}</p>
                </div>
                <div className="card-action">
                  <Link to="/books">My Books</Link>
                </div>
              </div>


              <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                  <span className="card-title">Recent Note</span>
                  <p>{destination}</p>
                  <p>{recentNote}</p>
                </div>
                <div className="card-action">
                  <Link to="/notes">My Notes</Link>
                </div>
              </div>
            </div>
            <div className="col s8 center-align">
                <h5>My Data Map</h5>
                <div className="divider"></div>
                  <div className="scaling-svg-container">
                    <svg className="radial_dendrogram" width="600" height="562"></svg>
                </div>
            </div>
          </div>

      </div>
    )
  }
}
