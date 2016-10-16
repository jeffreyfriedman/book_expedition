import React, { Component } from 'react';

export default class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <div onClick={this.props.onClick}>
        {this.props.text}
      </div>
    )
  }
}
