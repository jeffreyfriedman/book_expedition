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

          <div className="col s6 m4" key={relatedKey}>
            <div className="card small horizontal hoverable">
              <div className="card-image">
                <img src={selectedBook.image} />
                <span className="card-title">{selectedBook.category}</span>
              </div>
              <div className="card-stacked">
                <div className="card-content">
                  <p>{selectedBook.title}</p>
                </div>
                <div className="card-action">
                  <p>{selectedBook.authors}</p>
                  <span className="right-align">
                    <BookAddButton
                      key={addKey}
                      onClick={onAddClick}
                      />
                  </span>
                </div>
              </div>
            </div>
          </div>
      }

      return(
        conditionalBook
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
