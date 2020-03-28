import axios from 'axios';

import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL
} from './types'

import {
  returnError
} from './errorActions'

  //Check token & load user
export const loadUser = () => (dispatch, getState) => {

  // User loading
  dispatch({ type: USER_LOADING });
  axios.get('/api/auth/user', tokenConfig(getState))
    .then(res => {
      res.data ?
      dispatch({
        type: USER_LOADED,
        payload: res.data
      }) :
      dispatch({
        type: AUTH_ERROR,
        payload: "token invalid"
      })
    })
    .catch(err => {
      const { text } = err.response.data;
      dispatch(returnError(text, err.response.status));
      dispatch({
        type: AUTH_ERROR,
        payload: text
      })
    })
}

// Login User
export const loginUser = ({name, email, password}) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  // Body
  const body = { email, password};

  axios.post('/api/auth', body, config)
    .then(res => dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnError(err.response.data.text, err.response.status, 'LOGIN_FAIL'));
      dispatch({
        type: LOGIN_FAIL
      })
    })
}

// Signup User
export const signupUser = ({name, email, password}) => dispatch => {
  // Headers
  // const config = {
  //   headers: {
  //     "Content-Type": "application/json"
  //   }
  // }

  // Body
  const body = { name, email, password};

  axios.post('/api/users', body)
    .then(res => dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnError(err.response.data.text, err.response.status, 'SIGNUP_FAIL'));
      dispatch({
        type: SIGNUP_FAIL
      })
    })
}

// Logout User
export const logoutUser = () => dispatch => dispatch({
  type: LOGOUT_SUCCESS
})

// Token Config Method
export const tokenConfig = getState => {
  // Get token from localstorage
  const token =  getState().auth.token || localStorage.getItem('token') ;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  }

  // If token, add to header
  if(token) {
    config.headers['x-auth-token'] = token;
  }

  return config
}
