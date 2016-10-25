import React from 'react';
import DestinationTitle from './DestinationTitle'
import NewDestination from './NewDestination'

const DestinationList = props => {
  let destinations = "";
  if (props.userDestinations) {
    destinations = props.userDestinations.map(destination => {

      let destinationKey = `destination_${destination.id}`;
      let destinationTitleId = `destination_title_${destination.id}`;
      let destinationDeleteId = `delete_${destination.id}`;
      let onClick = () => this.handleDestinationClick(destination);
      let onDelete = () => this.handleDestinationDeleteClick(destination.id);
      return(
        <div key={destinationKey}>
          <DestinationTitle
            key={destinationTitleId}
            id={destination.id}
            country={destination.country}
            city={destination.city}
            image={destination.image}
            onClick={onClick}
            deleteKey={destinationDeleteId}
            deleteClick={onDelete}
            />
        </div>
      )
    })
  }

  return(
    <div>
      <NewDestination
        onClick={props.handleFormSubmit}
        country={props.newCountry}
        city={props.newCity}
        handleCityChange={props.handleCityChange}
        handleCountryChange={props.handleCountryChange}
        handleFormSubmit={props.handleFormSubmit}
        />
      <div>
        <h3 className>My Destinations</h3>
        <div className="row">
          {destinations}
        </div>
      </div>
    </div>
  )
}

export default DestinationList;
