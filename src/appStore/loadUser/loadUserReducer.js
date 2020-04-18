import { LOAD_USER } from "./type";

const state = { userData: {} };

function LoadUserReducer(mState = { ...state }, action) {
  switch (action.type) {
    case LOAD_USER:
   
      mState.userData = action.payload;

      return clone(mState);

    default:
      return clone(mState);
  }
}

const clone = obj => {
  return JSON.parse(JSON.stringify(obj));
};

export default LoadUserReducer;
