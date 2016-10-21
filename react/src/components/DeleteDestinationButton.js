import React from 'react';

const DeleteDestinationButton = props => {
  return (
    <button type="button" className="btn btn-default" onClick={props.onClick}>Delete</button>
  )
}

export default DeleteDestinationButton;
