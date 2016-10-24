import React, { Component, PropTypes } from 'react'
import DestinationTextInput from './DestinationTextInput'

export default class DestinationItem extends Component {
  static propTypes = {
    destination: PropTypes.object.isRequired,
    deleteDestination: PropTypes.func.isRequired,
  }

  state = {
    editing: false
  }

  handleDoubleClick = () => {
    this.setState({ editing: true })
  }

  handleSave = (id, text) => {
    if (text.length === 0) {
      this.props.deleteDestination(id)
    }
    this.setState({ editing: false })
  }

  render() {
    const { destination, deleteDestination } = this.props

    let element
    if (this.state.editing) {
      element = (
        <DestinationTextInput text={destination.text}
                       editing={this.state.editing}
                       onSave={(text) => this.handleSave(destination.id, text)} />
      )
    } else {
      element = (
        <div className="view">
          <label onDoubleClick={this.handleDoubleClick}>
            {destination.text}
          </label>
          <button className="destroy"
                  onClick={() => deleteDestination(destination.id)} />
        </div>
      )
    }

    return (
      <li className="">
        {element}
      </li>
    )
  }
}
