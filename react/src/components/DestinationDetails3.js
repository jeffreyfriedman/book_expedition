import React, { Component } from 'react';
import { Link } from 'react-router';
import RelatedBooks from './RelatedBooks';
import NewDestinationNote from './NewDestinationNote';
import EditDestinationNoteControl from './EditDestinationNoteControl';
import BackToDashboard from './BackToDashboard';

export default class DestinationDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    debugger;
    let destinationNote = this.props.userDestinationNotes.filter(note => {
      debugger;
      return note.id === this.props.selectedDestination.id;
    });

    let conditionalNoteControl;
    // if valid text in note, show edit controls, otherwise show new note controls
    if ((destinationNote[0] !== undefined) && (destinationNote[0].note !== "")) {

      conditionalNoteControl =
        <EditDestinationNoteControl
          destinationNote={destinationNote[0]}
          editableDestinationNote={this.props.editableDestinationNote}
          newDestinationNoteBody={this.props.newDestinationNoteBody}
          destination={this.props.selectedDestination}
          handleDestinationNoteChange={this.props.handleDestinationNoteChange}
          handleDestinationNoteSubmit={this.props.handleDestinationNoteSubmit}
          handleDestinationNoteDeleteClick={this.props.handleDestinationNoteDeleteClick}
          handleDestinationNoteEditClick={this.props.handleDestinationNoteEditClick}
        />
    } else {
      conditionalNoteControl =
        <NewDestinationNote
          newDestinationNoteBody={this.props.newDestinationNoteBody}
          destination={this.props.selectedDestination}
          handleDestinationNoteChange={this.props.handleDestinationNoteChange}
          handleDestinationNoteSubmit={this.props.handleDestinationNoteSubmit}
        />
    }
    return(
      <div className="destinationDetails">
        <div className="row">
            <div className="col s6">
                <img className="responsive-img" src={this.props.selectedDestination.image}/>
            </div>
            <div className="col s6">
              <h3>{this.props.selectedDestination.city}</h3>
              <h3>{this.props.selectedDestination.country}</h3>
              {this.props.selectedDestination.short_description}
              {conditionalNoteControl}
            </div>
          </div>
        <div>
          <Link to="/destinations">
            <p className="waves-effect waves-light btn">
              <i className="material-icons left">ic_arrow_back</i>Back to Destinations
            </p>
          </Link>
        </div>
        <div className="relatedBooks">
          <h4>Books Related to this Destination</h4>
          <RelatedBooks
            myBooks={this.props.myBooks}
            selectedDestinationBooks={this.props.selectedDestinationBooks}
            handleBookAddClick={this.props.handleBookAddClick}
            handleBookDeleteClick={this.props.handleBookDeleteClick}
          />
        </div>
      </div>
    )
  }
}
