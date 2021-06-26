import {combineReducers} from 'redux'
import errorReducer from './errorReducer'
import authReducer from './authReducer'
import eventReducer from './eventReducer'

const allReducers = combineReducers({
  event: eventReducer,
  error: errorReducer,
  auth: authReducer
})

export default allReducers