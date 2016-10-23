import React from 'react';

const NoteDeleteButton = props => {
  return(
    <button className="btn btn-default" onClick={props.onClick}>Delete</button>
  )
}

export default NoteDeleteButton;
