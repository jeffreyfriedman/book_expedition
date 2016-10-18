import React from 'react';

const NewDestination = props => {
  return(
    <div>
      Country (required):
      <input
        value={props.country}
        onChange={props.handleCountryChange}
      />
      City (optional):
      <input
        value={props.city}
        onChange={props.handleCityChange}
      />
      <button onClick={props.handleFormSubmit}>Submit</button>
    </div>

  )
}

export default NewDestination;
