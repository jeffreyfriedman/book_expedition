import React, { Component } from 'react';

export default class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [],
      userDestinations: [],
      userDestinationNotes: [],
      userBooks: []
    }
  }


  getDashboard() {
    $.ajax({
      url: '/api/v1/users',
      contentType: 'application/json'
    })
    .done(data => {
      this.setState({
        userInfo: data.user_info,
        userDestinations: data.destinations,
        userDestinationNotes: data.destination_notes,
        userBooks: data.books
      });
    });
  }

  componentDidMount() {
    this.getDashboard();
  }

  render() {
    return(
      <div>
        Dashboard
        <button onClick={this.handleButtonClick}>Click for info</button>
      </div>
    )
  }
}
