import * as types from '../constants/ActionTypes'

export const addDestination = text => ({ type: types.ADD_DESTINATION, text })
export const deleteDestination = id => ({ type: types.DELETE_DESTINATION, id })
export const addNote = text => ({ type: types.ADD_NOTE, text })
export const deleteNote = id => ({ type: types.DELETE_NOTE, id })
export const editNote = (id, text) => ({ type: types.EDIT_NOTE, id, text })
export const addBook = id => ({ type: types.ADD_BOOK, id })
export const deleteBook = id => ({ type: types.DELETE_BOOK, id })

export const fetchDestinations = () => dispatch => {
  debugger;
  fetch(`/api/v1/users`)
    .then(response => response.json())
    .then(json =>
      dispatch(types.FETCH_DESTINATIONS, json)
    )
}
