import {
  SHOW_REQUESTS_OF_SELLERS,
  ACCEPT_REJECT_SELLER_REQUEST,
  ACCPTED_SELLER_LIST
} from "../../actions/types";

const state = {
  showRequestofSellers: [],
  acceptedSellerList: []
};

function SellerConnectionReducer(mState = { ...state }, action) {
  switch (action.type) {
    case SHOW_REQUESTS_OF_SELLERS:
      mState.showRequestofSellers = [];
      action.payload.forEach(element => {
        mState.showRequestofSellers.push(element);
      });

      return clone(mState);
    case ACCEPT_REJECT_SELLER_REQUEST:
      let filterRequest = mState.showRequestofSellers.filter(
        list => list._id != action.payload.ID
      );
      mState.showRequestofSellers = [];

      filterRequest.forEach(element =>
        mState.showRequestofSellers.push(element)
      );
      return clone(mState);
    case ACCPTED_SELLER_LIST:
      mState.acceptedSellerList = [];
      action.payload.forEach(element => {
        mState.acceptedSellerList.push(element);
      });
      return clone(mState);
    default:
      return clone(mState);
  }
}

const clone = obj => {
  return JSON.parse(JSON.stringify(obj));
};

export default SellerConnectionReducer;
