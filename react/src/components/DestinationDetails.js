import React from 'react';

const DestinationDetails = props => {
  let selectedElement = props.destinations.filter(destination => {
    return destination.id === props.selectedDestination;
  });

  let displayElement;
  if (selectedElement.length > 0) {
    displayElement = <div className="destinationDetails">
      {selectedElement[0].city}
      {selectedElement[0].country}
      <p>{selectedElement[0].short_description}</p>
      <img src={selectedElement[0].image}/>
    </div>;
  }

  return(
    <div>
      {displayElement}
    </div>
  )
}

export default DestinationDetails;
