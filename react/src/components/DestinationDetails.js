import React from 'react';
import { Link } from 'react-router';
import RelatedBooks from './RelatedBooks';
import NewDestinationNote from './NewDestinationNote';
import EditDestinationNoteControl from './EditDestinationNoteControl';
import BackToDashboard from './BackToDashboard';

const DestinationDetails = props => {
  let destinationNote = props.userDestinationNotes.filter(note => {
    return note.destination_id == props.selectedDestination;
  });
  debugger;
  let conditionalNoteControl;
  // if valid text in note, show edit controls, otherwise show new note controls
  if ((destinationNote[0] !== undefined) && (destinationNote[0].note !== "")) {

    conditionalNoteControl =
      <EditDestinationNoteControl
        destinationNote={destinationNote[0]}
        editableDestinationNote={props.editableDestinationNote}
        newDestinationNoteBody={props.newDestinationNoteBody}
        destination={props.selectedDestination}
        handleDestinationNoteChange={props.handleDestinationNoteChange}
        handleDestinationNoteSubmit={props.handleDestinationNoteSubmit}
        handleDestinationNoteDeleteClick={props.handleDestinationNoteDeleteClick}
        handleDestinationNoteEditClick={props.handleDestinationNoteEditClick}
      />
  } else {
    conditionalNoteControl =
      <NewDestinationNote
        newDestinationNoteBody={props.newDestinationNoteBody}
        destination={props.selectedDestination}
        handleDestinationNoteChange={props.handleDestinationNoteChange}
        handleDestinationNoteSubmit={props.handleDestinationNoteSubmit}
      />
  }
  return(
    <div className="destinationDetails">
      <div className="row">
          <div className="col s6">
              <img className="responsive-img" src={props.selectedDestination.image}/>
          </div>
          <div className="col s6">
            <h3>{props.selectedDestination.city}</h3>
            <h3>{props.selectedDestination.country}</h3>
            {props.selectedDestination.short_description}
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
          myBooks={props.myBooks}
          selectedDestinationBooks={props.selectedDestinationBooks}
          handleBookAddClick={props.handleBookAddClick}
          handleBookDeleteClick={props.handleBookDeleteClick}
        />
      </div>
    </div>
  )
}

export default DestinationDetails;
