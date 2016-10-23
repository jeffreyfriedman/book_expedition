import React from 'react';
import NoteDeleteButton from './NoteDeleteButton'

const MyNoteList = props => {

  let myNotes = "";
  let myDestinationNotes = "";
  if (props.userDestinationNotes) {
    // only show notes with valid text
    myDestinationNotes = props.userDestinationNotes.filter(destinationNote => {
      return destinationNote.note != "";
    }).map(destinationNote => {
      let destinationNoteKey = `destinationNote_${destinationNote.id}`;
      let deleteDestinationNoteKey = `deleteDestinationNote_${destinationNote.id}`;
      let onDeleteClick = () => props.handleDestinationNoteDeleteClick(destinationNote);

      return(
        <div key={destinationNoteKey} className="col-sm-2">
          {destinationNote.note}
          <NoteDeleteButton
            key={deleteDestinationNoteKey}
            onClick={onDeleteClick}
          />
        </div>
      )
    })
  }

  return(
    <div>
      <h3>My Notes</h3>
      <div className="row">
        {myDestinationNotes}
      </div>

    </div>
  )
}

export default MyNoteList;
