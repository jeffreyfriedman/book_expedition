import { ADD_DESTINATION, DELETE_DESTINATION, FETCH_DESTINATIONS } from '../constants/ActionTypes'

const initialState = []

export default function destinations(state = initialState, action) {

  switch (action.type) {
    case ADD_DESTINATION:
      return [
        {
          id: state.reduce((maxId, destination) => Math.max(destination.id, maxId), -1) + 1,
          text: action.text
        },
        ...state
      ]

    case DELETE_DESTINATION:
      return state.filter(destination =>
        destination.id !== action.id
      )

    case FETCH_DESTINATIONS:
      return [
        {
          userInfo: action.userInfo,
          userDestinations: action.userDestinations,
          userDestinationNotes: action.userDestinationNotes,
          userBooks: action.userBooks,
          text: "Japan",
          id: 0
        },
        ...state
      ]

    default:
      return state
  }
}
