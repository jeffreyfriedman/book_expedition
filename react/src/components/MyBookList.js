import React from 'react';
import BookDeleteButton from './BookDeleteButton'

const MyBookList = props => {

  let myBooks = "";
  if (props.books) {
    myBooks = props.books.map(book => {
      let bookKey = `book_${book.id}`;
      let deleteKey = `delete_${book.id}`;
      let onDeleteClick = () => props.handleBookDeleteClick(book);

      let authors = book.authors;
      let maxLength = 25;

      if (book.authors.length > maxLength) {
        authors = authors.substr(0,maxLength-3) + "…";
      }

      return(
        <div className="col s6 m4" key={bookKey}>
          <div className="card small horizontal hoverable">
            <div className="card-image">
              <img src={book.image} />
              <span className="card-title indigo lighten-4">{book.category}</span>
            </div>
            <div className="card-stacked">
              <div className="card-content">
                <p>Title: {book.title}</p>
              </div>
              <div className="card-action">
                <p>Author(s): {authors}</p>
                <span className="right-align">
                  <BookDeleteButton
                    key={deleteKey}
                    onClick={onDeleteClick}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      )
    })
  }

  return(
    <div>
      <h3>My Books</h3>
      <div className="row">
        {myBooks}
      </div>

    </div>
  )
}

export default MyBookList;
