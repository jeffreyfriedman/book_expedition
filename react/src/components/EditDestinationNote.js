import React from 'react';
import NoteDeleteButton from './NoteDeleteButton';

const EditDestinationNote = props => {

  let onDeleteClick = () => props.handleDestinationNoteDeleteClick(props.destinationNote);
  return(
    <div>
      <h3>My Notes:</h3>
      {props.destinationNote.note}
      <NoteDeleteButton
        onClick={onDeleteClick}
      />
    </div>
  )
}

export default EditDestinationNote;
