import { LOAD_EMAIL } from '../actions';

const INITTAL_STATE = {
  email: '',
};

const user = (state = INITTAL_STATE, action) => {
  switch (action.type) {
  case LOAD_EMAIL:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
};

export default user;
