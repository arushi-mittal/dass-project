import { CREATE_MESSAGE, GET_ERRORS, CLEAR_ERRORS } from './types';

// CREATE MESSAGE
export const createMessage = (msg) => {
  return {
    type: CREATE_MESSAGE,
    payload: msg,
  };
};

// RETURN ERRORS
export const returnErrors = (msg, status, id=null) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id },
  };
};

export const clearErrors = () => {
  return {
      type: CLEAR_ERRORS
  }
}
