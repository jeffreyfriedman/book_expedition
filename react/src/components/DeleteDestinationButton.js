import React from 'react';

const DeleteDestinationButton = props => {
  return (
    <button className="btn red lighten-3" onClick={props.onClick}>Delete</button>
  )
}

export default DeleteDestinationButton;
