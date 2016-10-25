import React, { Component } from 'react';
import MyNoteList from '../components/MyNoteList'

export default class NotesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userNotes: []
    }
    this.handleDestinationNoteDeleteClick = this.handleDestinationNoteDeleteClick.bind(this);
  }

  handleDestinationNoteDeleteClick(obj) {
    let newNotes = this.state.userNotes.filter(note => {
      return note.id !== obj.id;
    });
    this.setState({ userNotes: newNotes });

    let noteToDelete = this.state.userNotes.filter(note => {
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
        userNotes: data.destination_notes
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
          userDestinationNotes={this.state.userNotes}
          handleDestinationNoteDeleteClick={this.handleDestinationNoteDeleteClick}
        />
      </div>
    )
  }
}
