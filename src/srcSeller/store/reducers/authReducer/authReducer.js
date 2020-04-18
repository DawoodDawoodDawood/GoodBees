import {
  LOGIN,
  SIGNUP_CREDENTIONALS,
  SIGNUP_PROFILE,
  RESET_PASSWORD_EMAIL,
  UPDATE_SELLER_PROFILE,
  ALL_SELLER_TYPE,
  SEND_VERIFICATION_CODE,
  DYNAMIC_ROUTE,
  MATCH_VERIFICATION_CODE
} from "../../actions/types";
import { LOGIN_ASYNC_STORAGE } from "../../../../appStore/asyncStorage/loginAsyncStorage";
import { AsyncStorage } from "react-native";
const state = {
  SellerLoginData: {},
  signupCredentials: {},
  signupFullData: {},
  updateProfileFullData: {},

  sellerEmailForResetPassword: "",
  sellerTypeListData: [],
  routeName: "SellerAllMealScreen",
  phoneVerify: false
};

function AuthReducer(mState = { ...state }, action) {
  switch (action.type) {
    case LOGIN:
      mState.SellerLoginData = {};
      if (action.payload.success === true) {
        AsyncStorage.setItem(
          LOGIN_ASYNC_STORAGE,
          JSON.stringify(action.payload.result)
        ).then(user => console.log(""));
      }
      // console.log(action.payload.msg);
      // console.log('email and password in reducer');
      mState.SellerLoginData = action.payload;

      return clone(mState);

    case SIGNUP_CREDENTIONALS:
      mState.signupCredentials = action.payload;

      return clone(mState);

    case SIGNUP_PROFILE:
      mState.signupFullData = action.payload;

      return clone(mState);
    case UPDATE_SELLER_PROFILE:
      mState.updateProfileFullData = action.payload;

      return clone(mState);

    case RESET_PASSWORD_EMAIL:
      mState.sellerEmailForResetPassword = action.payload.email;

      return clone(mState);
    case SEND_VERIFICATION_CODE:
      mState.phoneVerify = action.payload.success;
      return clone(mState);
    case MATCH_VERIFICATION_CODE:
      mState.phoneVerify = !mState.phoneVerify;
      return clone(mState);
    case ALL_SELLER_TYPE:
      if (mState.sellerTypeListData.length > 0) {
      } else {
        action.payload.forEach(item =>
          mState.sellerTypeListData.push({
            value: item.selerTypesName,
            key: item.selerTypesName
          })
        );
      }
    case DYNAMIC_ROUTE:
      mState.routeName = action.payload;
      return clone(mState);

    default:
      return clone(mState);
  }
}

const clone = obj => {
  return JSON.parse(JSON.stringify(obj));
};

export default AuthReducer;
