import {
  SEND_BROADCAST_TO_BUYER,
  WAITING_BROADCAST
} from "../../actions/types";

const state = {
  broadCastSaved: {},
  intrestedBuyerList: []
};

function AuthReducer(mState = { ...state }, action) {
  switch (action.type) {
    case SEND_BROADCAST_TO_BUYER:
      mState.broadCastSaved = action.payload;

      return clone(mState);
    case WAITING_BROADCAST:
      mState.intrestedBuyerList = [];

      action.payload.forEach((item, index) => {
        if (index === 3) {
        } else {
          mState.intrestedBuyerList.push(item);
        }
      });
      return clone(mState);
    default:
      return clone(mState);
  }
}

const clone = obj => {
  return JSON.parse(JSON.stringify(obj));
};

export default AuthReducer;
