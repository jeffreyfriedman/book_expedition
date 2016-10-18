import React, { Component } from 'react';
import DestinationDetails from './DestinationDetails'
import NewDestination from './NewDestination'
import DestinationTitle from './DestinationTitle'

export default class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userdata: [],
      intervalId: null,
      destinations: [],
      selectedDestination: "",
      newCountry: "",
      newCity: "",
      blurb: "",
      image: ""
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleDestinationClick = this.handleDestinationClick.bind(this);
  }

  handleCountryChange(event) {
    let newCountry = event.target.value;
    this.setState({ newCountry: newCountry });
  }

  handleCityChange(event) {
    let newCity = event.target.value;
    this.setState({ newCity: newCity });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let destinationPost;

    if (this.state.newCountry.length > 0) {
      destinationPost = JSON.stringify({ country: this.state.newCountry, city: this.state.newCity });
      $.ajax({
        url: '/api/v1/destinations',
        contentType: 'application/json',
        method: 'POST',
        data: destinationPost,
        success: function(data) {
          let newDestinations = [...this.state.destinations, data.destination];
          this.setState({ destinations: newDestinations });
          this.setState({ newCountry: "" });
          this.setState({ newCity: "" });
        }.bind(this)
      });
    }
  }

  handleDestinationClick(id) {
    this.setState({ selectedDestination: id })
  }

  getDashboard() {
    $.ajax({
      url: '/api/v1/users',
      contentType: 'application/json'
    })
    .done(data => {
      this.setState({ userdata: data.userdata, destinations: data.destinations });
    });
  }

  componentDidMount() {
    this.getDashboard();
  }

  render() {
    let destinations = this.state.destinations.map(destination => {
      let onClick = () => this.handleDestinationClick(destination.id)
      return(
        <DestinationTitle
          key={destination.id}
          id={destination.id}
          country={destination.country}
          city={destination.city}
          onClick={onClick}
        />
      )
    })

    return(
      <div>
        <NewDestination
          onClick={this.handleFormSubmit}
          country={this.state.newCountry}
          city={this.state.newCity}
          handleCityChange={this.handleCityChange}
          handleCountryChange={this.handleCountryChange}
          handleFormSubmit={this.handleFormSubmit}
        />
        <br></br>
        {destinations}
        <br></br>
        <DestinationDetails
          destinations={this.state.destinations}
          selectedDestination={this.state.selectedDestination}
        />
      </div>
    )
  }
}
