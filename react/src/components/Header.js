import React, { PropTypes, Component } from 'react'
import DestinationTextInput from './DestinationTextInput'

export default class Header extends Component {
  static propTypes = {
    addDestination: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.fetchDestinations()
  }

  handleSave = text => {
    if (text.length !== 0) {
      this.props.addDestination(text)
    }
  }

  render() {
    return (
      <header className="header">
        <h1>Destinations</h1>
        <DestinationTextInput newDestination
                       onSave={this.handleSave}
                       placeholder="Where do you want to go?" />
      </header>
    )
  }
}
