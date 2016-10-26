import React from 'react';

const NewDestination = props => {

  return(
    <div className="row">
      <h4>Enter New Destination</h4>
      <form className="col s8">
        <div className="row">
          <div className="input-field col s4">
            <i className="material-icons prefix align-left">room</i>
            <input
              onChange={props.handleCountryChange}
              value={props.country}
              placeholder="Enter Country"
              id="country"
              type="text"
              className="validate autocomplete" />
            <label htmlFor="country" data-error="" data-success="" className="red-text">{props.countryError}</label>
          </div>
          <div className="input-field col s4">
            <i className="material-icons prefix">business</i>
            <input
              onChange={props.handleCountryChange}
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
