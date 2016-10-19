import React, { Component } from 'react';
import DestinationDetails from './DestinationDetails'
import NewDestination from './NewDestination'
import DestinationTitle from './DestinationTitle'
import DeleteDestination from './DeleteDestination'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userdata: [],
      destinations: [],
      selectedDestination: "",
      newCountry: "",
      newCity: "",
      blurb: "",
      image: "",
      intervalId: null
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleDestinationClick = this.handleDestinationClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleCountryChange(event) {
    let newCountry = event.target.value;
    this.setState({ newCountry: newCountry });
  }

  handleCityChange(event) {
    let newCity = event.target.value;
    this.setState({ newCity: newCity });
  }

  handleDeleteClick(id) {
    let newDestinations = this.state.destinations.filter(destination => {
      return destination.id !== id;
    });
    this.setState({ destinations: newDestinations });

    let destinationToDelete = this.state.destinations.filter(destination => {
      return destination.id === id;
    });
    let destinationDeleteUrl = `/api/v1/destinations/${destinationToDelete[0].id}`;

    $.ajax({
      url: destinationDeleteUrl,
      contentType: 'application/json',
      method: 'DELETE'
    });
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
      let destination_id = `destination_${destination.id}`;
      let destination_title_id = `destination_title_${destination.id}`;
      let destination_delete_id = `delete_${destination.id}`;
      let onClick = () => this.handleDestinationClick(destination.id);
      let onDelete = () => this.handleDeleteClick(destination.id);
      return(
        <div key={destination_id}>
          <DestinationTitle
            key={destination_title_id}
            id={destination.id}
            country={destination.country}
            city={destination.city}
            onClick={onClick}
          />

          <DeleteDestination
            key={destination_delete_id}
            id={destination.id}
            onClick={onDelete}
          />
        </div>
      )
    })

    return(
      <div>
        <h1>Book Expedition</h1>
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
