import React, { Component } from 'react';

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  logOutUser() {
    $.ajax({
      url: '/users/edit',
      contentType: 'application/json',
    })
    .done(data => {
      window.location.href = "/users/edit";
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
