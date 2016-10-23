import React from 'react';

const NewDestinationNote = props => {

  return(
    <div>
      Note:
      <textarea
        value={props.newDestinationNoteBody}
        onChange={props.handleDestinationNoteChange}
      />
    <button onClick={props.handleDestinationNoteSubmit}>Submit</button>
    </div>

  )
}

export default NewDestinationNote;
