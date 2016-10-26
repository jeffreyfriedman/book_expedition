import React from 'react';

const BookDeleteButton = props => {
  return(
    <button className="btn btn-default red" onClick={props.onClick}>Remove</button>
  )
}

export default BookDeleteButton;
