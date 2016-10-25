import React, { Component } from 'react';

export default class SignOut extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  logOutUser() {
    $.ajax({
      url: '/users/sign_out',
      contentType: 'application/json',
      method: 'DELETE'
    })
    .done(data => {
      window.location.href = "/";
    });
  }

  componentDidMount() {
    this.logOutUser();
  }

  render() {
    return(
      <div></div>
    )
  }
}
