import { SEARCH_SELLER } from "../../actions/types";

const state = {
  nearestSeller: [],
};

function SearchMealAndSellers(mState = { ...state }, action) {
  switch (action.type) {
    case SEARCH_SELLER:
      mState.nearestSeller = [];
      if (action.payload.length > 0) {
        action.payload.forEach((element) => {
          mState.nearestSeller.push(element);
        });
      } else {
        mState.nearestSeller = [];
      }

      return clone(mState);

    default:
      return clone(mState);
  }
}

const clone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export default SearchMealAndSellers;
