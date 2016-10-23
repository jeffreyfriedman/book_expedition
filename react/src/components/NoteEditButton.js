import React from 'react';

const NoteEditButton = props => {
  return(
    <button className="btn btn-default" onClick={props.onClick}>Edit</button>
  )
}

export default NoteEditButton;
