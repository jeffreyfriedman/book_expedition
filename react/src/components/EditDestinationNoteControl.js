import React from 'react';
import NoteDeleteButton from './NoteDeleteButton';
import NoteEditButton from './NoteEditButton';
import NewDestinationNote from './NewDestinationNote';

const EditDestinationNoteControl = props => {
  let onEditClick = () => props.handleDestinationNoteEditClick(props.destinationNote);
  let onDeleteClick = () => props.handleDestinationNoteDeleteClick(props.destinationNote);
  let conditionalNoteControl;

  if (props.editableDestinationNote.id !== props.destinationNote.id) {
    conditionalNoteControl =
    <div>
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title">Note</span>
          <p>{props.destinationNote.note}</p>
        </div>
        <div className="card-action">
          <NoteEditButton
            onClick={onEditClick}
          />
          <NoteDeleteButton
            onClick={onDeleteClick}
          />
        </div>
      </div>
    </div>
  } else {
    conditionalNoteControl =
    <NewDestinationNote
      newDestinationNoteBody={props.newDestinationNoteBody}
      handleDestinationNoteChange={props.handleDestinationNoteChange}
      handleDestinationNoteSubmit={props.handleDestinationNoteSubmit}
      countryError={props.countryError}
    />
  }

  return(
    <div>
      <h5>My Note:</h5>
      {conditionalNoteControl}
    </div>
  )
}

export default EditDestinationNoteControl;
