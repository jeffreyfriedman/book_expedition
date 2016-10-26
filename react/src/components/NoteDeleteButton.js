import React from 'react';

const NoteDeleteButton = props => {
  return(
    <button className="btn red" onClick={props.onClick}>Delete</button>
  )
}

export default NoteDeleteButton;
