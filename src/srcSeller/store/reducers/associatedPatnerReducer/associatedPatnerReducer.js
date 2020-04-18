import {
  SHOW_ALL_PATNER_LIST,
  CONNECTED_PARTNERS,
  SEARCH_PATNER,
  SEND_REQUEST_TO_PATNER
} from "../../actions/types";

const state = {
  showPatnerList: [],
  connectedPatnerWithSeller: [],
  searchedPatner: []
};

function AssociatedPatnerReducer(mState = { ...state }, action) {
  switch (action.type) {
    case SHOW_ALL_PATNER_LIST:
      if (action.payload.offset === 1) {
        mState.showPatnerList = [];
      }
      action.payload.data.forEach(element => {
        mState.showPatnerList.push(element);
      });

      return clone(mState);
    case CONNECTED_PARTNERS:
      mState.connectedPatnerWithSeller = [];
      action.payload.forEach(element => {
        mState.connectedPatnerWithSeller.push(element);
      });
      return clone(mState);
    case SEARCH_PATNER:
      mState.searchedPatner = [];

      action.payload.forEach(item => mState.searchedPatner.push(item));
      return clone(mState);

    case SEND_REQUEST_TO_PATNER:
      console.log("action.payload");
      console.log(action.payload);
      let filterRequest = mState.searchedPatner.filter(list => {
        list._id != action.payload;
      });
      console.log(filterRequest);
      mState.searchedPatner = [];

      filterRequest.forEach(element => mState.searchedPatner.push(element));
      return clone(mState);
    default:
      return clone(mState);
  }
}

const clone = obj => {
  return JSON.parse(JSON.stringify(obj));
};

export default AssociatedPatnerReducer;
