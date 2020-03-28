import {
  GET_ERROR,
  CLEAR_ERROR
} from './types';

// RETURN ERROR
export const returnError = (message, status, id = null) => {
  return {
    type: GET_ERROR,
    payload: {
      message,
      status,
      id
    }
  }
}

// CLEAR ERROR

export const clearError = () => {
  return {
    type: CLEAR_ERROR
  }
}
