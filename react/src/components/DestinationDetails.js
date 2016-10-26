import React, { Component } from 'react';
import { Link } from 'react-router';
import RelatedBooks from './RelatedBooks';
import NewDestinationNote from './NewDestinationNote';
import EditDestinationNoteControl from './EditDestinationNoteControl';
import BackToDashboard from './BackToDashboard';

export default class DestinationDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: "",
      destinationNote: "",
      userBooks: [],
      destinationBooks: [],
      editableDestinationNote: false,
      newDestinationNoteBody: ""
    }
    this.handleDestinationNoteChange = this.handleDestinationNoteChange.bind(this);
    this.handleDestinationNoteSubmit = this.handleDestinationNoteSubmit.bind(this);
    this.handleDestinationNoteDeleteClick = this.handleDestinationNoteDeleteClick.bind(this);
    this.handleDestinationNoteEditClick = this.handleDestinationNoteEditClick.bind(this);
    this.handleBookAddClick = this.handleBookAddClick.bind(this);
    this.handleBookDeleteClick = this.handleBookDeleteClick.bind(this);
  }

  handleBookDeleteClick(obj) {
    let newBooks = this.state.userBooks.filter(book => {
      return book.id !== obj.id;
    });
    this.setState({ userBooks: newBooks });

    let bookToDelete = this.state.userBooks.filter(book => {
      return book.id === obj.id;
    });
    let bookDeleteUrl = `/api/v1/userbooks/${bookToDelete[0].id}`;

    let csrfToken = $("meta[name='csrf-token']").attr('content');

    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
      jqXHR.setRequestHeader('X-CSRF-Token', csrfToken);
    });

    $.ajax({
      url: bookDeleteUrl,
      contentType: 'application/json',
      method: 'DELETE'
    });
  }

  handleBookAddClick(obj) {
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
        Materialize.toast('Book added!', 2000)
      }.bind(this)
    });
  }


  handleDestinationNoteChange(event) {
    let newNote = event.target.value;
    this.setState({ newDestinationNoteBody: newNote });
  }

  handleDestinationNoteSubmit() {
    let notePost;
    if (this.state.newDestinationNoteBody.length > 0) {
      notePost = JSON.stringify({ note: {note: this.state.newDestinationNoteBody} });
      let csrfToken = $("meta[name='csrf-token']").attr('content');

      $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        jqXHR.setRequestHeader('X-CSRF-Token', csrfToken);
      });

      $.ajax({
        url: '/api/v1/userdestinations/' + this.state.destinationNote.id,
        contentType: 'application/json',
        method: 'PATCH',
        data: notePost
      })
      .done(data => {
        let newUserDestinationNote = {
          id: data.userDestination.id,
          user_id: data.userDestination.user_id,
          destination_id: data.userDestination.destination_id,
          note: data.userDestination.note
        }
        this.setState({ destinationNote: newUserDestinationNote });
        this.setState({ newDestinationNoteBody: "" });
        this.setState({ editableDestinationNote: false });
        Materialize.toast('Note added!', 2000)
      });
    }
  }

  handleDestinationNoteEditClick() {
    // event.preventDefault();
    this.setState({ editableDestinationNote: true });
    this.setState({ newDestinationNoteBody: this.state.destinationNote.note });
  }

  handleDestinationNoteDeleteClick() {
    this.setState({ destinationNote: "" })
    let noteToDelete = this.state.destinationNote
    let noteDeleteUrl = `/api/v1/userdestinations/${noteToDelete.destination_id}`;

    let csrfToken = $("meta[name='csrf-token']").attr('content');

    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
      jqXHR.setRequestHeader('X-CSRF-Token', csrfToken);
    });

    $.ajax({
      url: noteDeleteUrl,
      contentType: 'application/json',
      method: 'DELETE'
    })
    .done(data => {
      Materialize.toast('Note deleted!', 2000)
    })
  }


  getDestination(destination_id) {
    $.ajax({
      url: `/api/v1/destinations/${destination_id}`,
      contentType: 'application/json'
    })
    .done(data => {
      this.setState({
        destination: data.destination,
        destinationNote: data.note,
        destinationBooks: data.books,
        userBooks: data.userBooks
      });
    });
  }

  componentWillMount() {
    this.getDestination(this.props.selectedDestination);
  }

  render() {
    let conditionalNoteControl;

    // if valid text in note, show edit controls, otherwise show new note controls
    if (
      (this.state.destinationNote !== undefined) &&
      (this.state.destinationNote.note !== "") &&
      (this.state.destinationNote !== "")) {

      conditionalNoteControl =
        <EditDestinationNoteControl
          destinationNote={this.state.destinationNote}
          editableDestinationNote={this.state.editableDestinationNote}
          newDestinationNoteBody={this.state.newDestinationNoteBody}
          destination={this.state.destination}
          handleDestinationNoteChange={this.handleDestinationNoteChange}
          handleDestinationNoteSubmit={this.handleDestinationNoteSubmit}
          handleDestinationNoteDeleteClick={this.handleDestinationNoteDeleteClick}
          handleDestinationNoteEditClick={this.handleDestinationNoteEditClick}
        />
    } else {

      conditionalNoteControl =
        <NewDestinationNote
          newDestinationNoteBody={this.state.newDestinationNoteBody}
          destination={this.state.selectedDestination}
          handleDestinationNoteChange={this.handleDestinationNoteChange}
          handleDestinationNoteSubmit={this.handleDestinationNoteSubmit}
        />
    }

    return(
      <div className="destinationDetails">
        <div className="row">
            <div className="col s6">
                <img className="responsive-img" src={this.state.destination.image}/>
            </div>
            <div className="col s6">
              <h3>{this.state.destination.city}</h3>
              <h3>{this.state.destination.country}</h3>
              {this.state.destination.short_description}
              {conditionalNoteControl}
            </div>
          </div>
        <div>
          <Link to="/destinations">
            <p className="waves-effect waves-light btn">
              <i className="material-icons left">ic_arrow_back</i>Back to Destinations
            </p>
          </Link>
        </div>
        <div className="relatedBooks">
          <h4>Books Related to this Destination</h4>
          <RelatedBooks
            myBooks={this.state.userBooks}
            selectedDestinationBooks={this.state.destinationBooks}
            handleBookAddClick={this.handleBookAddClick}
            handleBookDeleteClick={this.handleBookDeleteClick}
          />
        </div>
      </div>
    )
  }
}
