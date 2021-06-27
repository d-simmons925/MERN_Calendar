import axios from 'axios'
import {returnErrors} from './errorActions'

export const loadUser = () => (dispatch, getState) =>{

  dispatch({type: 'USER_LOADING'})

  axios.get('/auth/user', tokenConfig(getState))
    .then(response =>{
      dispatch({
        type: 'USER_LOADED',
        payload: response.data
      })
    })
      .catch(error =>{
        dispatch(returnErrors(error.response.data, error.response.status))
        dispatch({
          type: 'AUTH_ERROR'
        })
      })
}

export const register = (name, password) => dispatch =>{
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify(name, password)

  axios.post('/users', body, config)
    .then(response =>{
        dispatch({
          type: 'REGISTER_SUCCESS',
          payload: response.data
        })
    })
      .catch(error =>{
        dispatch(returnErrors(error.response.data, error.response.status, 'REGISTER_FAIL'))
        dispatch({
          type: 'REGISTER_FAIL'
        })
      })
}

export const login = (name, password) => dispatch =>{
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify(name, password)

  axios.post('/auth', body, config)
    .then(response =>{
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data
      })
    })
      .catch(error =>{
        dispatch(returnErrors(error.response.data, error.response.status, 'LOGIN_FAIL'))
        dispatch({
          type: 'LOGIN_FAIL'
        })
      })
}

export const logout = () =>{
  return{
    type: 'LOGOUT_SUCCESS'
  }
}

export const tokenConfig = getState =>{

  const token = getState().auth.token

  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  }

  if(token){
    config.headers['x-auth-token'] = token
  }

  return config
}