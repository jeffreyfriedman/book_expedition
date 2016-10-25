import React, { Component } from 'react';
import DestinationList from '../components/DestinationList'
import DestinationDetails from '../components/DestinationDetails'
import NewDestination from '../components/NewDestination'
import DestinationTitle from '../components/DestinationTitle'
import DeleteDestinationButton from '../components/DeleteDestinationButton'

export default class DestinationsContainer extends Component {
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
    this.handleDestinationClick = this.handleDestinationClick.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleDestinationDeleteClick = this.handleDestinationDeleteClick.bind(this)
    this.handleCountryChange = this.handleCountryChange.bind(this)
    this.handleCityChange = this.handleCityChange.bind(this)
    this.handleDestinationNoteChange = this.handleDestinationNoteChange.bind(this);
    this.handleDestinationNoteSubmit = this.handleDestinationNoteSubmit.bind(this);
    this.handleDestinationNoteDeleteClick = this.handleDestinationNoteDeleteClick.bind(this);
    this.handleDestinationNoteEditClick = this.handleDestinationNoteEditClick.bind(this);
    this.handleBookAddClick = this.handleBookAddClick.bind(this);
  }

  handleBookAddClick(obj) {
    // event.preventDefault();

    let newUserBook = JSON.stringify({ book_id: obj.id });
    let csrfToken = $("meta[name='csrf-token']").attr('content');

    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
      jqXHR.setRequestHeader('X-CSRF-Token', csrfToken);
    });

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


  handleDestinationNoteChange(event) {
    let newNote = event.target.value;
    this.setState({ newDestinationNoteBody: newNote });
  }

  handleDestinationNoteSubmit(id) {

    // temporarily remove the previous version of the note from the notes list
    let newNotes = this.state.userDestinationNotes.filter(note => {
      return note.destination_id !== this.state.selectedDestination.id;
    });
    this.setState({ userDestinationNotes: newNotes });

    let notePost;
    if (this.state.newDestinationNoteBody.length > 0) {
      notePost = JSON.stringify({ note: {note: this.state.newDestinationNoteBody} });
      let csrfToken = $("meta[name='csrf-token']").attr('content');

      $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        jqXHR.setRequestHeader('X-CSRF-Token', csrfToken);
      });

      $.ajax({
        url: '/api/v1/userdestinations/' + id,
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
    // event.preventDefault();
    this.setState({ editableDestinationNote: true });
  }

  handleDestinationNoteDeleteClick(obj) {
    // event.preventDefault();

    let newNotes = this.state.userDestinationNotes.filter(note => {
      return note.id !== obj.id;
    });
    this.setState({ userDestinationNotes: newNotes });

    let noteToDelete = this.state.userDestinationNotes.filter(note => {
      return note.id === obj.id;
    });
    let noteDeleteUrl = `/api/v1/userdestinations/${noteToDelete[0].id}`;

    let csrfToken = $("meta[name='csrf-token']").attr('content');

    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
      jqXHR.setRequestHeader('X-CSRF-Token', csrfToken);
    });

    $.ajax({
      url: noteDeleteUrl,
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
    // Retrieve the current CSRF-TOKEN
    let csrfToken = $("meta[name='csrf-token']").attr('content');

    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
      jqXHR.setRequestHeader('X-CSRF-Token', csrfToken);
    });

    $.ajax({
      url: destinationDeleteUrl,
      contentType: 'application/json',
      method: 'DELETE',
    });
  }

  handleFormSubmit(event) {
    debugger;
    event.preventDefault();
    let destinationPost;

    if (this.state.newCountry.length > 0) {
      destinationPost = JSON.stringify({ country: this.state.newCountry, city: this.state.newCity });
      let csrfToken = $("meta[name='csrf-token']").attr('content');

      $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        jqXHR.setRequestHeader('X-CSRF-Token', csrfToken);
      });

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

    if (this.state.selectedDestination !== "") {
      this.setState({ selectedDestination: "" })
      this.setState({ newDestinationNoteBody: "" });
    } else {
      this.setState({ selectedDestination: obj })
      this.getBooks(obj.id)
      let destinationNote = this.state.userDestinationNotes.filter(note => {
        return note.destination_id === obj.id;
      });

      this.setState({ newDestinationNoteBody: destinationNote[0].note });
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
    });
  }

  componentDidMount() {
    this.getDashboard();
  }

  render() {
    let switchElement;
    if (this.props.params.destination == undefined) {
      switchElement =
      (<DestinationList
        userDestinations={this.state.userDestinations}
        onClick={this.handleFormSubmit}
        country={this.state.newCountry}
        city={this.state.newCity}
        handleCityChange={this.handleCityChange}
        handleCountryChange={this.handleCountryChange}
        handleFormSubmit={this.handleFormSubmit}
      />)
    } else {
      let onSubmit = () => this.handleDestinationNoteSubmit(this.props.params.destination)
      switchElement =
      (<DestinationDetails
        myBooks={this.state.userBooks}
        selectedDestination={this.props.params.destination}
        userDestinationNotes={this.state.userDestinationNotes}
        editableDestinationNote={this.state.editableDestinationNote}
        newDestinationNoteBody={this.state.newDestinationNoteBody}
        handleDestinationNoteChange={this.handleDestinationNoteChange}
        handleDestinationNoteSubmit={onSubmit}
        handleDestinationNoteDeleteClick={this.handleDestinationNoteDeleteClick}
        handleDestinationNoteEditClick={this.handleDestinationNoteEditClick}
        selectedDestinationBooks={this.state.selectedDestinationBooks}
        handleBookAddClick={this.handleBookAddClick}
      />)
    }

    return(
      <div>
        {switchElement}
      </div>
    )
  }
}
