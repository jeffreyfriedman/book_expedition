import React from 'react';

const NewDestination = props => {
  return(
    <div className="row">
      <h4>Enter New Destination</h4>
      <form className="col s8">
        <div className="row">
          <div className="input-field col s4">
            <i className="material-icons prefix">account_circle</i>
            <input placeholder="Enter Country" id="country" type="text" className="validate" />
            <label htmlFor="country">Country</label>
          </div>
          <div className="input-field col s4">
            <i className="material-icons prefix">account_circle</i>
            <input placeholder="Enter City" id="city" type="text" className="validate" />
            <label htmlFor="city">City</label>
          </div>
          <div className="input-field col s4">
            <button className="btn" onClick={props.handleFormSubmit}>Submit</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default NewDestination;

// <div className="row">
//   <div className="container col s4">
//     <h4>Enter New Destination:</h4>
//       Country (required):
//       <input
//         value={props.country}
//         onChange={props.handleCountryChange}
//       />
//       City (optional):
//       <input
//         value={props.city}
//         onChange={props.handleCityChange}
//       />
//     <button className="btn" onClick={props.handleFormSubmit}>Submit</button>
//   </div>
// </div>
