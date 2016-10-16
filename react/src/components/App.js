import React, { Component } from 'react';
import UserDashboard from './UserDashboard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userdata: [],
      intervalId: null
    }
    this.handleButtonClick = this.handleButtonClick.bind(this)
  }

  getDashboard() {
    // debugger;
    $.ajax({
      url: '/api/v1/users',
      contentType: 'application/json'
    })
    .done(data => {
      // debugger;
      this.setState({ userdata: data.userdata });
    });
  }

  componentDidMount() {
    this.getDashboard()
    // let intervalId = setInterval(function() {
    //   this.getDashboard();
    // }.bind(this), 2000);
    // this.setState({ intervalId: intervalId });
  }

  handleButtonClick() {
    console.log("Text was clicked")
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    let greeting = ""
    if (this.state.userdata.length !== 0) {
      greeting = `, ${this.state.userdata.first_name}`;
    }
    let handleButtonClick = () => this.handleButtonClick();
    return(
      <div>
        <h1>Welcome to Breakable Toy{greeting}!</h1>
        <UserDashboard
          text="Testing Render of UserDashboard"
          onClick={handleButtonClick}
        />
      </div>
    );
  }
}

export default App;
