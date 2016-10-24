import React, { PropTypes, Component } from 'react'
import DestinationItem from './DestinationItem'

export default class Footer extends Component {

  render() {
    debugger;
    const { destinations, actions } = this.props
    let destinationList = destinations.map(destination => {
      debugger;
      <li>
        <DestinationItem key={destination.id} destination={destination} {...actions} />
      </li>
    })
    return (
      <footer className="footer">
        FOOTER
        <ul className="filters">
          {destinationList}
        </ul>
      </footer>
    )
  }
}
