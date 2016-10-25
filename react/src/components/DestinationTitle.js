import React from 'react';
import { Link } from 'react-router';
import DeleteDestinationButton from './DeleteDestinationButton';

const DestinationTitle = props => {
  let detailPath = `/destinations/${props.id}`
  return(
    <div className="col s6 m4">
      <div className="card medium hoverable">
        <div className="card-image">
          <img src={props.image} />
          <span className="card-title indigo lighten-4">{props.city} {props.country}</span>
        </div>
        <div className="card-content">
          <p>Short Description</p>
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
