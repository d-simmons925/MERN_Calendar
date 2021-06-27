import {
  GET_EVENTS,
  ADD_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT,
  EVENTS_LOADING,
  CLEAR_EVENTS
} from '../actions/types'

const initialState = {
  events: [],
  loading: false
}

const eventReducer = (state = initialState, action)=>{
  switch(action.type){
    case GET_EVENTS:
      return{
        ...state,
        events: action.payload,
        loading: false
      }
    case EVENTS_LOADING:
      return{
        ...state,
        loading: true
      }
    case ADD_EVENT:
      return{
        ...state,
        events: [action.payload, ...state.events]
      }
    case DELETE_EVENT:
      return{
        ...state,
        events: state.events.filter(event => event._id !== action.payload)
      }
    case UPDATE_EVENT:
      return{
        ...state,
        events: state.events.map(event =>{
          if(event._id !== action.payload.id) return event
          return Object.assign({}, event, {title: action.payload.title})
        })
      }
    case CLEAR_EVENTS:
      return{
        events: []
      }
    default:
      return state
  }
}

export default eventReducer