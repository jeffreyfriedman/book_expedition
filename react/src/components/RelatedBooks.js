import React from 'react';
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

      let authors = selectedBook.authors;
      let maxLength = 25;

      if (selectedBook.authors.length > maxLength) {
        authors = authors.substr(0,maxLength-3) + "…";
      }

      if (hideBook.length === 0) {
        conditionalBook =

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
