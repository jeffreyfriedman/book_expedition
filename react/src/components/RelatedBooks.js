import React from 'react';
import BookAddButton from './BookAddButton'
import BookDeleteButton from './BookDeleteButton'

const RelatedBooks = props => {
  let books = "";
  let conditionalButton = "";

  if (props.selectedDestinationBooks !== undefined) {
    books = props.selectedDestinationBooks.map(selectedBook => {
      let relatedKey = `relatedBook_${selectedBook.id}`;

      let addKey = `add_${selectedBook.id}`;
      let deleteKey = `delete_${selectedBook.id}`;
      let onAddClick = () => props.handleBookAddClick(selectedBook);
      let onDeleteClick = () => props.handleBookDeleteClick(selectedBook);

      let authors = selectedBook.authors;
      let maxLength = 25;

      if (selectedBook.authors.length > maxLength) {
        authors = authors.substr(0,maxLength-3) + "…";
      }

      // determine if book is already in user's book list
      let deleteBook = props.myBooks.filter(book => {
        return book.id === selectedBook.id;
      });

      if (deleteBook[0] !== undefined) {
        conditionalButton =
        (<BookDeleteButton
          key={deleteKey}
          onClick={onDeleteClick}
        />)
      } else {
        conditionalButton =
        <BookAddButton
          key={addKey}
          onClick={onAddClick}
        />
      }
      return (
        <div className="col s6 m4" key={relatedKey}>
          <div className="card small horizontal hoverable">
            <div className="card-image">
              <img src={selectedBook.image} />
              <span className="card-title indigo lighten-4">{selectedBook.category}</span>
            </div>
            <div className="card-stacked">
              <div className="card-content">
                <p>{selectedBook.title}</p>
              </div>
              <div className="card-action">
                <p className="truncate=">{authors}</p>
                <span className="right-align">
                  {conditionalButton}
                </span>
              </div>
            </div>
          </div>
        </div>
      )
    })
  }

  return(
    <div className="row">
      {books}
    </div>
  );
}

export default RelatedBooks;
