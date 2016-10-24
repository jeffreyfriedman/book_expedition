import React from 'react';

const BackToDashboard = props => {
  return(
    <p className="waves-effect waves-light btn" onClick={props.returnClick}><i className="material-icons left">ic_arrow_back</i>Back to Dashboard</p>
  )
}

export default BackToDashboard;
