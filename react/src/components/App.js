import React, { Component } from 'react';
import DestinationDetails from './DestinationDetails'
import NewDestination from './NewDestination'
import DestinationTitle from './DestinationTitle'
import DeleteDestination from './DeleteDestination'
import MyBookList from './MyBookList'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [],
      destinations: [],
      books: [],
      selectedDestination: "",
      selectedDestinationBooks: [],
      newCountry: "",
      newCity: "",
      blurb: "",
      image: ""
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleDestinationClick = this.handleDestinationClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleBookAddClick = this.handleBookAddClick.bind(this);
    this.handleBookDeleteClick = this.handleBookDeleteClick.bind(this);
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
          let newDestinations = [data.destination, ...this.state.destinations];
          this.setState({ destinations: newDestinations });
          this.setState({ newCountry: "" });
          this.setState({ newCity: "" });
        }.bind(this)
      });
    }
  }

  handleDestinationClick(obj) {
    this.setState({ selectedDestination: obj })
    this.getBooks(obj.id)
  }

  handleBookAddClick(obj) {
    event.preventDefault();

    let newUserBook = JSON.stringify({ book_id: obj.id });
    $.ajax({
      url: '/api/v1/userbooks',
      contentType: 'application/json',
      method: 'POST',
      data: newUserBook,
      success: function(data) {
        let newBooks = [data.book, ...this.state.books];
        this.setState({ books: newBooks });
      }.bind(this)
    });
  }

  handleBookDeleteClick(obj) {
    event.preventDefault();

    let newBooks = this.state.books.filter(book => {
      return book.id !== obj.id;
    });
    this.setState({ books: newBooks });

    let bookToDelete = this.state.books.filter(book => {
      return book.id === obj.id;
    });
    let bookDeleteUrl = `/api/v1/userbooks/${bookToDelete[0].id}`;

    $.ajax({
      url: bookDeleteUrl,
      contentType: 'application/json',
      method: 'DELETE'
    });
  }

  getBooks(destination_id) {
    $.ajax({
      url: `/api/v1/destinations/${destination_id}`,
      contentType: 'application/json'
    })
    .done(data => {
      this.setState({ selectedDestinationBooks: data.books });
    });
  }

  getDashboard() {
    $.ajax({
      url: '/api/v1/users',
      contentType: 'application/json'
    })
    .done(data => {
      this.setState({ userInfo: data.user_info, destinations: data.destinations, books: data.books });
    });
  }

  componentDidMount() {
    this.getDashboard();
  }

  render() {
    let destinations = "";
    if (this.state.destinations) {
      destinations = this.state.destinations.map(destination => {
        let destinationKey = `destination_${destination.id}`;
        let destinationTitleId = `destination_title_${destination.id}`;
        let destinationDeleteId = `delete_${destination.id}`;
        let onClick = () => this.handleDestinationClick(destination);
        let onDelete = () => this.handleDeleteClick(destination.id);
        return(
          <div key={destinationKey}>
            <DestinationTitle
              key={destinationTitleId}
              id={destination.id}
              country={destination.country}
              city={destination.city}
              onClick={onClick}
            />

            <DeleteDestination
              key={destinationDeleteId}
              id={destination.id}
              onClick={onDelete}
            />
          </div>
        )
      })
    }


    return(
      <div>
        <h1>Book Expedition</h1>
        <MyBookList
          books={this.state.books}
          handleBookDeleteClick={this.handleBookDeleteClick}
        />
        <h3>Enter New Destination:</h3>
        <NewDestination
          onClick={this.handleFormSubmit}
          country={this.state.newCountry}
          city={this.state.newCity}
          handleCityChange={this.handleCityChange}
          handleCountryChange={this.handleCountryChange}
          handleFormSubmit={this.handleFormSubmit}
        />
      <h3>My Destinations:</h3>
        {destinations}
        <br></br>
        <DestinationDetails
          selectedDestination={this.state.selectedDestination}
          selectedDestinationBooks={this.state.selectedDestinationBooks}
          handleBookAddClick={this.handleBookAddClick}
        />
      </div>
    )
  }
}
