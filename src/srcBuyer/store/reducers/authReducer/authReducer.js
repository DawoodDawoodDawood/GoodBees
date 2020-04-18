import {
  LOGIN,
  SIGNUP_CREDENTIONALS,
  SIGNUP_PROFILE,
  RESET_PASSWORD_EMAIL
} from "../../actions/types";
import { LOGIN_ASYNC_STORAGE } from "../../../../appStore/asyncStorage/loginAsyncStorage";
import { AsyncStorage } from "react-native";
const state = {
  buyerLoginData: {},
  buyerSignupCredentials: {},
  buyerSignupFullData: {},
  buyerEmailForResetPassword: ""
};

function AuthReducer(mState = { ...state }, action) {
  switch (action.type) {
    case LOGIN:
      // mState.buyerLoginData = {};
      if (action.payload.success === true) {
        AsyncStorage.setItem(
          LOGIN_ASYNC_STORAGE,
          JSON.stringify(action.payload.result)
        ).then(user => console.log(user));
      }
      mState.buyerLoginData = action.payload.result;
      // console.log(mState.buyerLoginData);
      // console.log('buyer login response from reducer');
      return clone(mState);

    case SIGNUP_CREDENTIONALS:
      // console.log(action.payload);
      // console.log('buyer signup data from reducer');
      mState.buyerSignupCredentials = action.payload;
      // console.log(mState.buyerSignupCredentials);
      // console.log('buyer signup data from reducer after assigning');
      return clone(mState);

    case SIGNUP_PROFILE:
      // console.log(action.payload);
      // console.log('buyer full signup data from reducer');
      mState.buyerSignupFullData = action.payload;
      // console.log(mState.buyerSignupFullData);
      // console.log('buyer full signup data from reducer after assigning');
      return clone(mState);

    case RESET_PASSWORD_EMAIL:
      // console.log(action.payload.email);
      // console.log('email for reset password response from reducer');
      mState.buyerEmailForResetPassword = action.payload.email;
      // console.log(mState.buyerEmailForResetPassword);
      // console.log('email for reset password from reducer after assigning');
      return clone(mState);

    default:
      return clone(mState);
  }
}

const clone = obj => {
  return JSON.parse(JSON.stringify(obj));
};

export default AuthReducer;
