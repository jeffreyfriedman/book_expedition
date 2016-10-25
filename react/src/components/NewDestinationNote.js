import React from 'react';

const NewDestinationNote = props => {

  return(
    <div>
      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input id="textarea1" placeholder="Enter Note" className="materialize-textarea min-padding"
                value={props.newDestinationNoteBody}
                onChange={props.handleDestinationNoteChange}
              ></input>

            </div>
          </div>
        </form>
      </div>
    <button className="btn" onClick={props.handleDestinationNoteSubmit}>Submit</button>
    </div>

  )
}

export default NewDestinationNote;
