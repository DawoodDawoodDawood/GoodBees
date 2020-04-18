import {
  BROADCAST_LIST_OF_MENUS,
  SHOW_LIST_OF_NEEDED_CONFIRMATION
} from "../../actions/types";
import { LOGIN_ASYNC_STORAGE } from "../../../../appStore/asyncStorage/loginAsyncStorage";
import { AsyncStorage } from "react-native";
const state = {
  listOFBroadCastMenus: [],
  listOfMenuForOrder: []
};

function BuyerBroadCastReducer(mState = { ...state }, action) {
  switch (action.type) {
    case BROADCAST_LIST_OF_MENUS:
      mState.listOFBroadCastMenus = [];
      if (action.payload.length > 0) {
        action.payload.forEach(item => mState.listOFBroadCastMenus.push(item));
      }

      return clone(mState);
    case SHOW_LIST_OF_NEEDED_CONFIRMATION:
      mState.listOfMenuForOrder = [];
      if (action.payload.length > 0) {
        action.payload.forEach(item => mState.listOfMenuForOrder.push(item));
      }
      return clone(mState);
    default:
      return clone(mState);
  }
}

const clone = obj => {
  return JSON.parse(JSON.stringify(obj));
};

export default BuyerBroadCastReducer;
