import React from 'react';

const BookDeleteButton = props => {
  return(
    <button className="btn btn-default" onClick={props.onClick}>Delete</button>
  )
}

export default BookDeleteButton;
