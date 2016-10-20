import React from 'react';

const DeleteDestination = props => {
  return (
    <button type="button" className="btn btn-default" onClick={props.onClick}>Delete</button>
  )
}

export default DeleteDestination;
