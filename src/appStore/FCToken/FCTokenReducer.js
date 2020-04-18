import { LOAD_USER, SELLER_BUYER_FCTOKEN, PATNER_FCTOKEN } from "./type";

const state = { userData: {} };

function FCReducer(mState = { ...state }, action) {
  switch (action.type) {
    case LOAD_USER:
      console.log(action.payload);
      mState.userData = action.payload;
      console.log(mState.userData);
      return clone(mState);

    default:
      return clone(mState);
  }
}

const clone = obj => {
  return JSON.parse(JSON.stringify(obj));
};

export default FCReducer;
