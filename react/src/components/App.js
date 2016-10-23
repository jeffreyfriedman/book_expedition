import React, { Component } from 'react';
import DestinationDetails from './DestinationDetails'
import NewDestination from './NewDestination'
import DestinationTitle from './DestinationTitle'
import DeleteDestinationButton from './DeleteDestinationButton'
import MyBookList from './MyBookList'
import MyNoteList from './MyNoteList'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [],
      userDestinations: [],
      userDestinationNotes: [],
      userBooks: [],
      selectedDestination: "",
      selectedDestinationBooks: [],
      editableDestinationNote: false,
      newDestinationNoteBody: "",
      newCountry: "",
      newCity: "",
      blurb: "",
      image: ""
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleDestinationClick = this.handleDestinationClick.bind(this);
    this.handleDestinationDeleteClick = this.handleDestinationDeleteClick.bind(this);
    this.handleBookAddClick = this.handleBookAddClick.bind(this);
    this.handleBookDeleteClick = this.handleBookDeleteClick.bind(this);
    this.handleDestinationNoteChange = this.handleDestinationNoteChange.bind(this);
    this.handleDestinationNoteSubmit = this.handleDestinationNoteSubmit.bind(this);
    this.handleDestinationNoteDeleteClick = this.handleDestinationNoteDeleteClick.bind(this);
    this.handleDestinationNoteEditClick = this.handleDestinationNoteEditClick.bind(this);
  }

  handleDestinationNoteChange(event) {
    let newNote = event.target.value;
    this.setState({ newDestinationNoteBody: newNote });
  }

  handleDestinationNoteSubmit(event) {
    event.preventDefault();

    // temporarily remove the previous version of the note from the notes list
    let newNotes = this.state.userDestinationNotes.filter(note => {
      return note.destination_id !== this.state.selectedDestination.id;
    });
    this.setState({ userDestinationNotes: newNotes });

    let notePost;
    if (this.state.newDestinationNoteBody.length > 0) {
      notePost = JSON.stringify({ note: {note: this.state.newDestinationNoteBody} });
      $.ajax({
        url: '/api/v1/userdestinations/' + this.state.selectedDestination.id,
        contentType: 'application/json',
        method: 'PATCH',
        data: notePost,
        success: function(data) {
          let newUserDestinationNotes = [{
            id: data.userDestination.id,
            user_id: data.userDestination.user_id,
            destination_id: data.userDestination.destination_id,
            note: data.userDestination.note
          }, ...this.state.userDestinationNotes]
          this.setState({ userDestinationNotes: newUserDestinationNotes });
          this.setState({ newDestinationNoteBody: "" });
          this.setState({ editableDestinationNote: false });
        }.bind(this)
      });
    }
  }

  handleDestinationNoteEditClick(obj) {
    event.preventDefault();
    this.setState({ editableDestinationNote: true });
  }

  handleDestinationNoteDeleteClick(obj) {
    event.preventDefault();

    let newNotes = this.state.userDestinationNotes.filter(note => {
      return note.id !== obj.id;
    });
    this.setState({ userDestinationNotes: newNotes });

    let noteToDelete = this.state.userDestinationNotes.filter(note => {
      return note.id === obj.id;
    });
    let noteDeleteUrl = `/api/v1/userdestinations/${noteToDelete[0].id}`;

    $.ajax({
      url: noteDeleteUrl,
      contentType: 'application/json',
      method: 'DELETE'
    });
  }

  handleCountryChange(event) {
    let newCountry = event.target.value;
    this.setState({ newCountry: newCountry });
  }

  handleCityChange(event) {
    let newCity = event.target.value;
    this.setState({ newCity: newCity });
  }

  handleDestinationDeleteClick(id) {
    let newDestinations = this.state.userDestinations.filter(destination => {
      return destination.id !== id;
    });
    this.setState({ userDestinations: newDestinations });

    let destinationToDelete = this.state.userDestinations.filter(destination => {
      return destination.id === id;
    });
    let destinationDeleteUrl = `/api/v1/destinations/${destinationToDelete[0].id}`;

    this.setState({ selectedDestination: "" });
    this.setState({ selectedDestinationBooks: [] });

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
          let newDestinations = [data.destination, ...this.state.userDestinations];
          let newUserDestinationNotes = [{
            id: data.userDestination.id,
            user_id: data.userDestination.user_id,
            destination_id: data.userDestination.destination_id,
            note: ""
          }, ...this.state.userDestinationNotes]
          this.setState({ userDestinations: newDestinations });
          this.setState({ userDestinationNotes: newUserDestinationNotes });
          this.setState({ newCountry: "" });
          this.setState({ newCity: "" });
        }.bind(this)
      });
    }
  }

  handleDestinationClick(obj) {
    this.setState({ selectedDestination: obj })
    this.getBooks(obj.id)
    let destinationNote = this.state.userDestinationNotes.filter(note => {
      return note.destination_id === obj.id;
    });

    this.setState({ newDestinationNoteBody: destinationNote[0].note });
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
        let newBooks = [data.book, ...this.state.userBooks];
        this.setState({ userBooks: newBooks });
      }.bind(this)
    });
  }

  handleBookDeleteClick(obj) {
    event.preventDefault();

    let newBooks = this.state.userBooks.filter(book => {
      return book.id !== obj.id;
    });
    this.setState({ userBooks: newBooks });

    let bookToDelete = this.state.userBooks.filter(book => {
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
      this.setState({
        userInfo: data.user_info,
        userDestinations: data.destinations,
        userDestinationNotes: data.destination_notes,
        userBooks: data.books
      });
    });
  }

  componentDidMount() {
    this.getDashboard();
  }

  render() {
    let destinations = "";
    if (this.state.userDestinations) {
      destinations = this.state.userDestinations.map(destination => {
        let destinationKey = `destination_${destination.id}`;
        let destinationTitleId = `destination_title_${destination.id}`;
        let destinationDeleteId = `delete_${destination.id}`;
        let onClick = () => this.handleDestinationClick(destination);
        let onDelete = () => this.handleDestinationDeleteClick(destination.id);
        return(
          <div key={destinationKey}>
            <DestinationTitle
              key={destinationTitleId}
              id={destination.id}
              country={destination.country}
              city={destination.city}
              onClick={onClick}
            />

            <DeleteDestinationButton
                key={destinationDeleteId}
                id={destination.id}
                onClick={onDelete}
              />
          </div>
        )
      })
    }

    let conditionalDestinationDetails = "";
    if (this.state.selectedDestination.id !== undefined) {

      conditionalDestinationDetails =
      <DestinationDetails
        myBooks={this.state.userBooks}
        selectedDestination={this.state.selectedDestination}
        userDestinationNotes={this.state.userDestinationNotes}
        editableDestinationNote={this.state.editableDestinationNote}
        newDestinationNoteBody={this.state.newDestinationNoteBody}
        handleDestinationNoteChange={this.handleDestinationNoteChange}
        handleDestinationNoteSubmit={this.handleDestinationNoteSubmit}
        handleDestinationNoteDeleteClick={this.handleDestinationNoteDeleteClick}
        handleDestinationNoteEditClick={this.handleDestinationNoteEditClick}
        selectedDestinationBooks={this.state.selectedDestinationBooks}
        handleBookAddClick={this.handleBookAddClick}
      />
    }

    return(
      <div>
        <h1>Book Expedition</h1>
        <MyBookList
          books={this.state.userBooks}
          handleBookDeleteClick={this.handleBookDeleteClick}
        />
        <MyNoteList
          bookNotes={this.state.userBooks.notes}
          userDestinationNotes={this.state.userDestinationNotes}
          handleDestinationNoteDeleteClick={this.handleDestinationNoteDeleteClick}
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
        {conditionalDestinationDetails}
      </div>
    )
  }
}
