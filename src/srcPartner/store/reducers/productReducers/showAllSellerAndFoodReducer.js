import { SHOW_ALL_SELLER_TO_PATNER } from "../../actions/types";

const state = {
  showAllSeller: []
};

function ShowAllSellerAndFoodReducer(mState = { ...state }, action) {
  switch (action.type) {
    case SHOW_ALL_SELLER_TO_PATNER:
      mState.showAllSeller = [];
      action.payload.forEach(element => {
        mState.showAllSeller.push(element);
      });

      return clone(mState);

    default:
      return clone(mState);
  }
}

const clone = obj => {
  return JSON.parse(JSON.stringify(obj));
};

export default ShowAllSellerAndFoodReducer;
