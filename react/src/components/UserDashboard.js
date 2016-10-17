import React, { Component } from 'react';
import DestinationDetails from './DestinationDetails'
import NewDestination from './NewDestination'

export default class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destinations: [],
      newCountry: "",
      newCity: "",
      blurb: "",
      image: ""
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
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
          let newDestination = {
            id: data.destination.id,
            newCountry: this.state.newDestinationCountry,
            newCity: this.state.newReviewBody,
          };
          let newDestinations = [...this.state.reviews, newDestination];
          this.setState({
            destinations: newDestinations,
            newCountry: '',
            newCity: ''
          });
        }.bind(this)
      });
    }
  }

  getDestinations() {
    $.ajax({
      url: '/api/v1/destinations',
      contentType: 'application/json'
    })
    .done(data => {
      // this.setState({ blurb: data.blurb, image: data.image });
      this.setState({ destinations: data.destinations })
    });
  }

  componentDidMount() {
    this.getDestinations();
  }

  render() {
    // let onSubmit = () => this.handleFormSubmit();
    return(
      <div>
        <NewDestination
          onClick={this.handleFormSubmit}
          handleCityChange={this.handleCityChange}
          handleCountryChange={this.handleCountryChange}
          handleFormSubmit={this.handleFormSubmit}
        />
        <DestinationDetails
          city={this.state.newCity}
          country={this.state.newCountry}
          blurb={this.state.blurb}
          image={this.state.image}
        />
      </div>
    )
  }
}
