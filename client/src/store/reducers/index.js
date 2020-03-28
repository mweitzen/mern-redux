import { combineReducers } from 'redux'

import error from './errorReducers'
import auth from './authReducers'

export default combineReducers({
  error,
  auth
})
