import React, { Component } from 'react';
import { Link } from 'react-router'
import { IndexLink } from 'react-router'
import NavLink from './NavLink'

export default class NewApp extends Component {
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
              <li className=""><NavLink to="/destinations">Destinations</NavLink></li>
              <li className=""><NavLink to="/books">Books</NavLink></li>
              <li className=""><NavLink to="/notes">Notes</NavLink></li>
            </ul>
          </div>
        </nav>
        {this.props.children}
      </div>
    )
  }
}
