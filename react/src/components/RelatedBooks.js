import React from 'react';
import BookIcon from './BookIcon'
import BookAddButton from './BookAddButton'

const RelatedBooks = props => {
  let books = "";
  let conditionalBook = "";
  if (props.selectedDestinationBooks !== undefined) {
    books = props.selectedDestinationBooks.map(selectedBook => {
      let relatedKey = `relatedBook_${selectedBook.id}`;
      let addKey = `add_${selectedBook.id}`;
      let onAddClick = () => props.handleBookAddClick(selectedBook);
      let hideBook = props.myBooks.filter(book => {
        return book.id === selectedBook.id;
      });

      if (hideBook.length === 0) {
        conditionalBook =
          <div key={relatedKey}>
            <BookIcon book={selectedBook} />
            <BookAddButton
              key={addKey}
              onClick={onAddClick}
            />
          </div>
      }

      return(
        conditionalBook
      )
    })
  }

  return(
    <div>
      {books}
    </div>
  );
}

export default RelatedBooks;
