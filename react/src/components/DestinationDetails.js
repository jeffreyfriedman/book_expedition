import React from 'react';
import RelatedBooks from './RelatedBooks'

const DestinationDetails = props => {

  let displayElement = "";
  if (props.selectedDestination !== undefined) {
    displayElement =
    <div>
      <div className="destinationDetails">
        {props.selectedDestination.city}
        {props.selectedDestination.country}
        <p>{props.selectedDestination.short_description}</p>
        <img className="img-responsive" src={props.selectedDestination.image}/>
      </div>
      <div className="relatedBooks">
        <RelatedBooks
          books={props.selectedDestinationBooks}
          handleBookAddClick={props.handleBookAddClick}
          handleBookDeleteClick={props.handleBookDeleteClick}
        />
      </div>
    </div>

  }

  return(
    <div>
      {displayElement}
    </div>
  )
}

export default DestinationDetails;
