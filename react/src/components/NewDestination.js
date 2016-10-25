import React from 'react';

const NewDestination = props => {
  return(
    <div className="container col s4">
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
      <button className="btn" onClick={props.handleFormSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default NewDestination;
