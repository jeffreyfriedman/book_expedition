import React, { Component } from 'react';
import { Link } from 'react-router'
import { IndexLink } from 'react-router'
import NavLink from './NavLink'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <div className="nav-wrapper">
        <nav>
          <div className="nav-wrapper">
            <ul>
              <li className=""><IndexLink to="/">Dashboard</IndexLink></li>
              <li className=""><NavLink to="/destinations">My Destinations</NavLink></li>
              <li className=""><NavLink to="/books">My Books</NavLink></li>
              <li className=""><NavLink to="/notes">My Notes</NavLink></li>
              <li className=""><NavLink to="/editprofile">Edit Profile</NavLink></li>
              <li className=""><NavLink to="/signout">Sign Out</NavLink></li>
            </ul>
          </div>
        </nav>
        {this.props.children}
      </div>
    )
  }
}
