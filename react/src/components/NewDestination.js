import React from 'react';

const NewDestination = props => {
  return(
    <div className="row center-align">
      <h4>Enter New Destination</h4>
      <form className="col s8 center-align" onSubmit={props.handleFormSubmit}>
        <div className="row center-align">
          <div className="input-field col s4">
            <i className="material-icons prefix align-left">room</i>
            <input
              onChange={props.handleCountryChange}
              value={props.country}
              placeholder="Enter Country (required)"
              id="country"
              type="text"
              className="validate autocomplete" />
            <label htmlFor="country" data-error="" data-success="" className="red-text">{props.countryError}</label>
          </div>
          <div className="input-field col s4">
            <i className="material-icons prefix">business</i>
            <input
              onChange={props.handleCityChange}
              value={props.city}
              placeholder="Enter City"
              id="city"
              type="text"
              className="validate" />
          </div>
          <div className="input-field col s4">
            <button className="btn" onClick={props.handleFormSubmit}>Submit</button>
          </div>
        </div>
        <div className="row">
        </div>
      </form>
    </div>
  )
}

export default NewDestination;
