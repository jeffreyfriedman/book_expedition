import React from 'react';

const DestinationDetails = props => {
  return(
    <div>
      <h3>{props.city} {props.country}</h3>
      <p>{props.blurb}</p>
      <img src={props.image}/>
    </div>
  )
}

export default DestinationDetails;
