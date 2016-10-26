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
      debugger;
      recentNote = this.state.userDestinationNotes[0].note;
    }
    return(
      <div>
        <h1 className="center-align">Welcome, {userName}</h1>

          <div className="row">
            <div className="col s4 m4">
              <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                  <span className="card-title">Recently Added Destination</span>
                  <p>{recentDestination}</p>
                </div>
                <div className="card-action">
                  <a href="#">My Destinations</a>
                </div>
              </div>
            </div>
              <div className="col s4 m4">
              <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                  <span className="card-title">Recently Added Book</span>
                  <p>{recentBook}</p>
                </div>
                <div className="card-action">
                  <a href="#">My Books</a>
                </div>
              </div>
            </div>
              <div className="col s4 m4">
              <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                  <span className="card-title">Recently Added Note</span>
                  <p>{recentNote}</p>
                </div>
                <div className="card-action">
                  <a href="#">My Notes</a>
                </div>
              </div>
            </div>
          </div>
      </div>
    )
  }
}
