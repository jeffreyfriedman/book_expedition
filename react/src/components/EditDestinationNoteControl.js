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
      <NoteEditButton
        onClick={onEditClick}
      />
      <NoteDeleteButton
        onClick={onDeleteClick}
      />
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
      <h3>My Notes:</h3>
      {conditionalNoteControl}
    </div>
  )
}

export default EditDestinationNoteControl;
