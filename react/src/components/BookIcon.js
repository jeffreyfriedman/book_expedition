import React from 'react';

const BookIcon = props => {
  let uppercaseCategory = props.book.category.toUpperCase();
  return(
    <div>
      <a href={props.book.url}><img src={props.book.image} /></a><br></br>
      <h4>{props.book.title}</h4>
      <h5>{props.book.authors}</h5>
      <h6>{uppercaseCategory}</h6>
    </div>
  )
}

export default BookIcon;
