import React from 'react';
import DeleteDestinationButton from './DeleteDestinationButton';

const DestinationTitle = props => {
  return(
    <div className="col s4 m4">
      <div className="card">
        <div className="card-image">
          <img src={props.image} />
          <span className="card-title">{props.city} {props.country}</span>
        </div>
        <div className="card-content">
          <p>Short Description</p>
        </div>
        <div className="card-action">
          <span onClick={props.onClick}>See Details</span>
          <span>
            <DeleteDestinationButton
              key={props.deleteKey}
              id={props.id}
              onClick={props.deleteClick}
            />
            </span>
        </div>
      </div>
    </div>
  )
}

export default DestinationTitle;
