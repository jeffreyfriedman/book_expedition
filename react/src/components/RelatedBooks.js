import React from 'react';
import BookIcon from './BookIcon'
import BookAddButton from './BookAddButton'

const RelatedBooks = props => {
  let books = "";
  if (props.books !== undefined) {
    books = props.books.map(book => {
      let relatedKey = `relatedBook_${book.id}`;
      let addKey = `add_${book.id}`;
      let onAddClick = () => props.handleBookAddClick(book);

      return(
        <div key={relatedKey}>
          <BookIcon book={book}/>
          <BookAddButton
            key={addKey}
            onClick={onAddClick}
          />
        </div>

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
