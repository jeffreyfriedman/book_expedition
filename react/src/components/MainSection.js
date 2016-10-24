import React, { Component, PropTypes } from 'react'
import DestinationItem from './DestinationItem'
import Footer from './Footer'

export default class MainSection extends Component {
  static propTypes = {
    destinations: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }

  render() {
    const { destinations, actions } = this.props
    let destinationList = destinations.map(destination => {
      return (
        <DestinationItem key={destination.id} destination={destination} {...actions} />
      )
    })

    return (
      <section className="main">
        MAIN SECTION
        <ul className="destination-list">
          {destinationList}
        </ul>
      </section>
    )
  }
}
