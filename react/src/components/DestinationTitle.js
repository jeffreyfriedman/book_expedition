import React from 'react';
import { Link } from 'react-router';
import DeleteDestinationButton from './DeleteDestinationButton';

const DestinationTitle = props => {
  let detailPath = `/destinations/${props.id}`;
  let destinationTitle;
  if (props.city.length > 0) {
    destinationTitle = `${props.city}, ${props.country}`
  } else {
    destinationTitle = `${props.country}`
  }
  return(
    <div className="col s6 m4">
      <div className="card medium hoverable">
        <Link to={detailPath}>
          <div className="card-image">
            <img src={props.image} />
            <span className="card-title indigo lighten-4">{destinationTitle}</span>
          </div>
        </Link>
        <div className="card-content">

        </div>
        <div className="card-action">
          <Link to={detailPath}>See Details</Link>
          <span className="right-align">
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
