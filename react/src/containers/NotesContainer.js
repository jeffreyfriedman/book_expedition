import React, { Component } from 'react';
import MyNoteList from '../components/MyNoteList'

export default class NotesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDestinations: [],
      userDestinationNotes: [],
      editableDestinationNote: "",
      destinationNote: "",
      newDestinationNoteBody: ""
    }
    this.handleDestinationNoteChange = this.handleDestinationNoteChange.bind(this);
    this.handleDestinationNoteSubmit = this.handleDestinationNoteSubmit.bind(this);
    this.handleDestinationNoteDeleteClick = this.handleDestinationNoteDeleteClick.bind(this);
    this.handleDestinationNoteEditClick = this.handleDestinationNoteEditClick.bind(this);
  }

  handleDestinationNoteChange(event) {
    let newNote = event.target.value;
    this.setState({ newDestinationNoteBody: newNote });
  }

  handleDestinationNoteSubmit(obj) {
    // temporarily remove the previous version of the note from the notes list
    let newNotes = this.state.userDestinationNotes.filter(note => {
      return note.destination_id !== obj.id;
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
        url: '/api/v1/userdestinations/' + obj.destination_id,
        contentType: 'application/json',
        method: 'PATCH',
        data: notePost
      })
      .done(data => {
        let newUserDestinationNotes = [{
          id: data.userDestination.id,
          user_id: data.userDestination.user_id,
          destination_id: data.userDestination.destination_id,
          note: data.userDestination.note
        }, ...this.state.userDestinationNotes]
        this.setState({ userDestinationNotes: newUserDestinationNotes });
        this.setState({ newDestinationNoteBody: "" });
        this.setState({ editableDestinationNote: "" });
        this.setState({ destinationNote: "" });
        Materialize.toast('Note added!', 2000);
      })
    }
  }

  handleDestinationNoteEditClick(obj) {
    this.setState({ editableDestinationNote: obj });
    this.setState({ newDestinationNoteBody: obj.note });
  }

  handleDestinationNoteDeleteClick(obj) {
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
    })
    .done(data => {
      Materialize.toast('Note deleted!', 2000);
    })
  }

  getNotes() {
    $.ajax({
      url: '/api/v1/users',
      contentType: 'application/json'
    })
    .done(data => {
      this.setState({
        userDestinationNotes: data.destination_notes,
        userDestinations: data.destinations
      });
    });
  }

  componentWillMount() {
    this.getNotes();
  }

  render() {

    return(
      <div>
        <MyNoteList
          userDestinationNotes={this.state.userDestinationNotes}
          handleDestinationNoteDeleteClick={this.handleDestinationNoteDeleteClick}
          handleDestinationNoteEditClick={this.handleDestinationNoteEditClick}
          handleDestinationNoteChange={this.handleDestinationNoteChange}
          handleDestinationNoteSubmit={this.handleDestinationNoteSubmit}
          editableDestinationNote={this.state.editableDestinationNote}
          newDestinationNoteBody={this.state.newDestinationNoteBody}
          userDestinations={this.state.userDestinations}
        />
      </div>
    )
  }
}
