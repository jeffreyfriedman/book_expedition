import React, { Component } from 'react';

export default class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [""],
      userDestinations: [""],
      userDestinationNotes: [""],
      userBooks: [""]
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
    let userName, recentDestination, recentBook, recentNote = "";
    if (this.state.userInfo.first_name != undefined) {
      userName = this.state.userInfo.first_name;
    }
    if (this.state.userDestinations[0] != undefined) {
      recentDestination = this.state.userDestinations[0].country;
    }
    if (this.state.userBooks[0] != undefined) {
      recentBook = this.state.userBooks[0].title;
    }
    if (this.state.userDestinationNotes[0] != undefined) {
      recentNote = this.state.userDestinationNotes[0].note;
    }
    return(
      <div>
        <p>Welcome, {userName}</p>
        <p>Most Recently Added Destination: {recentDestination}</p>
        <p>Most Recently Added Book: {recentBook}</p>
        <p>Most Recently Added Note: {recentNote}</p>
      </div>
    )
  }
}
