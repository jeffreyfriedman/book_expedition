import React from 'react';

const DeleteDestinationButton = props => {
  return (
    <button className="btn red" onClick={props.onClick}>Delete</button>
  )
}

export default DeleteDestinationButton;
