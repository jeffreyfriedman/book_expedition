import React from 'react';
import BookDeleteButton from './BookDeleteButton'

const MyBookList = props => {

  let myBooks = "";
  if (props.books) {
    myBooks = props.books.map(book => {
      let bookKey = `book_${book.id}`;
      let deleteKey = `delete_${book.id}`;
      let onDeleteClick = () => props.handleBookDeleteClick(book);

      return(
        <div key={bookKey} className="col-sm-2">
          <figure>
            <img src={book.image} />
            <figcaption>{book.title}</figcaption>
              <BookDeleteButton
                key={deleteKey}
                onClick={onDeleteClick}
              />
          </figure>
        </div>
      )
    })
  }

  return(
    <div>
      <h3>My Book List</h3>
      <div className="row">
        {myBooks}
      </div>

    </div>
  )
}

export default MyBookList;
