import React from 'react';

const BookIcon = props => {
  return(
    <div>
      <a href={props.book.url}><img src={props.book.image} /></a><br></br>
      <h4>{props.book.title}</h4>
      <h6>{props.book.authors}</h6>
    </div>
  )
}

export default BookIcon;
