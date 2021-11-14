import axios from 'axios'
import { tokenConfig } from './authActions'
import { returnErrors } from './errorActions'
import { EventI } from '../types/interfaces'

export const getEvents = () => (dispatch: Function, getState: Function) => {
  dispatch(setEventsLoading())
  axios
    .get('/events', tokenConfig(getState))
    .then(response => {
      dispatch({
        type: 'GET_EVENTS',
        payload: response.data,
      })
    })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status))
    })
}

export const setEventsLoading = () => {
  return {
    type: 'EVENTS_LOADING',
  }
}

export const addEvent = (event: EventI) => (dispatch: Function, getState: Function) => {
  axios
    .post('/events', event, tokenConfig(getState))
    .then(response => {
      dispatch({
        type: 'ADD_EVENT',
        payload: response.data,
      })
    })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status))
    })
}

export const deleteEvent = (id: string) => (dispatch: Function, getState: Function) => {
  axios
    .delete(`/events/${id}`, tokenConfig(getState))
    .then(response => {
      dispatch({
        type: 'DELETE_EVENT',
        payload: id,
      })
    })
    .catch(error => dispatch(returnErrors(error.response.data, error.response.status)))
}

export const updateEvent = (event: EventI) => (dispatch: Function, getState: Function) => {
  axios
    .put(`/events/${event.id}`, event, tokenConfig(getState))
    .then(() => {
      dispatch({
        type: 'UPDATE_EVENT',
        payload: event,
      })
    })
    .catch(error => dispatch(returnErrors(error.response.data, error.response.status)))
}

export const clearEvents = () => {
  return {
    type: 'CLEAR_EVENTS',
  }
}
