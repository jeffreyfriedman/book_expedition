import React from 'react';
import NoteDeleteButton from './NoteDeleteButton';
import NoteEditButton from './NoteEditButton';
import NewDestinationNote from './NewDestinationNote';

const EditDestinationNoteControl = props => {
  let onEditClick = () => props.handleDestinationNoteEditClick(props.destinationNote);
  let onDeleteClick = () => props.handleDestinationNoteDeleteClick(props.destinationNote);
  let conditionalNoteControl;

  if (props.editableDestinationNote === false) {
    conditionalNoteControl =
    <div>
      {props.destinationNote.note}
      <div>
        <NoteEditButton
          onClick={onEditClick}
        />
        <NoteDeleteButton
          onClick={onDeleteClick}
        />
      </div>

    </div>
  } else {
    conditionalNoteControl =
    <NewDestinationNote
      newDestinationNoteBody={props.newDestinationNoteBody}
      destination={props.selectedDestination}
      handleDestinationNoteChange={props.handleDestinationNoteChange}
      handleDestinationNoteSubmit={props.handleDestinationNoteSubmit}
    />
  }

  return(
    <div>
      <h5>My Notes:</h5>
      {conditionalNoteControl}
    </div>
  )
}

export default EditDestinationNoteControl;
