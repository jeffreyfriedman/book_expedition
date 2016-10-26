import React, { Component } from 'react';
import MyBookList from '../components/MyBookList'

export default class BooksContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userBooks: []
    }
    this.handleBookDeleteClick = this.handleBookDeleteClick.bind(this);
  }

  handleBookDeleteClick(obj) {
    let newBooks = this.state.userBooks.filter(book => {
      return book.id !== obj.id;
    });
    this.setState({ userBooks: newBooks });

    let bookToDelete = this.state.userBooks.filter(book => {
      return book.id === obj.id;
    });
    let bookDeleteUrl = `/api/v1/userbooks/${bookToDelete[0].id}`;
    let csrfToken = $("meta[name='csrf-token']").attr('content');

    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
      jqXHR.setRequestHeader('X-CSRF-Token', csrfToken);
    });

    $.ajax({
      url: bookDeleteUrl,
      contentType: 'application/json',
      method: 'DELETE'
    });
  }

  getBooks() {
    $.ajax({
      url: '/api/v1/users',
      contentType: 'application/json'
    })
    .done(data => {
      this.setState({
        userBooks: data.books
      });
    });
  }

  componentWillMount() {
    this.getBooks();
  }

  render() {
    return(
      <div>
        <MyBookList
          books={this.state.userBooks}
          handleBookDeleteClick={this.handleBookDeleteClick}
        />
      </div>
    )
  }
}
