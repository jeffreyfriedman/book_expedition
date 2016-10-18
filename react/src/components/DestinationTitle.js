import React from 'react';

const DestinationTitle = props => {
  return(
    <li onClick={props.onClick}>
      {props.city} {props.country}
    </li>
  )
}

export default DestinationTitle;
