import React from 'react';
import NoteDeleteButton from './NoteDeleteButton'
import NoteEditButton from './NoteEditButton'
import NewDestinationNote from './NewDestinationNote'

const MyNoteList = props => {
  let myNotes = "";
  let myDestinationNotes = "";
  let conditionalNoteControl;
  if (props.userDestinationNotes) {
    // only show notes with valid text
    myDestinationNotes = props.userDestinationNotes.filter(destinationNote => {
      return destinationNote.note !== "";
    }).map(destinationNote => {
      let destinationNoteKey = `destinationNote_${destinationNote.id}`;
      let deleteDestinationNoteKey = `deleteDestinationNote_${destinationNote.id}`;
      let editDestinationNoteKey = `editDestinationNote_${destinationNote.id}`;
      let newDestinationNoteKey= `newDestinationNote_${destinationNote.id}`;
      let onDeleteClick = () => props.handleDestinationNoteDeleteClick(destinationNote);
      let onEditClick = () => props.handleDestinationNoteEditClick(destinationNote);
      let onSubmit = () => props.handleDestinationNoteSubmit(destinationNote);

      let destination = props.userDestinations.filter(destination => {
        return destination.id === destinationNote.destination_id;
      });

      if (props.editableDestinationNote.id !== destinationNote.id) {
        conditionalNoteControl =
        <div className="card blue-grey darken-1" key={destinationNoteKey}>
          <div className="card-content white-text">
            <span className="card-title">{destination[0].city} {destination[0].country} Note</span>
            <p>{destinationNote.note}</p>
          </div>
          <div className="card-action">
            <NoteEditButton
              key={editDestinationNoteKey}
              onClick={onEditClick}
            />
            <NoteDeleteButton
              key={deleteDestinationNoteKey}
              onClick={onDeleteClick}
            />
          </div>
        </div>
      } else {
        conditionalNoteControl =
        <NewDestinationNote
          key={newDestinationNoteKey}
          newDestinationNoteBody={props.newDestinationNoteBody}
          destination={props.selectedDestination}
          handleDestinationNoteChange={props.handleDestinationNoteChange}
          handleDestinationNoteSubmit={onSubmit}
        />
      }

      return(
        conditionalNoteControl
      )
    })
  }

  return(
    <div>
      <h3>My Notes</h3>
      <div className="row">
        <div className="col s6 m4">
          {myDestinationNotes}
        </div>
      </div>

    </div>
  )
}

export default MyNoteList;
