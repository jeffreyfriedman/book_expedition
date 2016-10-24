import React from 'react';

const NoteEditButton = props => {
  return(
    <button className="btn" onClick={props.onClick}>Edit</button>
  )
}

export default NoteEditButton;
