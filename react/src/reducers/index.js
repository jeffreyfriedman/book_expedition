import { combineReducers } from 'redux'
import destinations from './destinations'
import books from './books'
import notes from './notes'

const rootReducer = combineReducers({
  destinations,
  books,
  notes
})

export default rootReducer
