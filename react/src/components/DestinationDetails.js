import React from 'react';
import RelatedBooks from './RelatedBooks'
import NewDestinationNote from './NewDestinationNote';
import EditDestinationNoteControl from './EditDestinationNoteControl';

const DestinationDetails = props => {

  let destinationNote = props.userDestinationNotes.filter(note => {
    return note.id === props.selectedDestination.id;
  });

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
    <div>
      <div className="destinationDetails">
        {props.selectedDestination.city}
        {props.selectedDestination.country}
        <p>{props.selectedDestination.short_description}</p>
        <img className="img-responsive" src={props.selectedDestination.image}/>
      </div>
      <div>
        {conditionalNoteControl}
      </div>
      <div className="relatedBooks">
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
