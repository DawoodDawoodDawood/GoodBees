import {
  LOGIN,
  SIGNUP_CREDENTIONALS,
  SIGNUP_PROFILE,
  RESET_PASSWORD_EMAIL,
  SEND_VERIFICATION_CODE,
  MATCH_VERIFICATION_CODE
} from "../../actions/types";
import { LOGIN_ASYNC_STORAGE } from "../../../../appStore/asyncStorage/loginAsyncStorage";
import AsyncStorage from "@react-native-community/async-storage";
const state = {
  partnerLoginData: {},
  partnerSignupCredentials: {},
  partnerSignupFullData: {},
  partnerEmailForResetPassword: "",
  phoneVerify: false
};

function AuthReducer(mState = { ...state }, action) {
  switch (action.type) {
    case LOGIN:
      mState.partnerLoginData = {};
      if (action.payload.success === true) {
        AsyncStorage.setItem(
          LOGIN_ASYNC_STORAGE,
          JSON.stringify(action.payload.result)
        ).then(user => console.log(user));
      }
      mState.partnerLoginData = action.payload;
      // console.log(mState.partnerLoginData);
      // console.log('partner login response from reducer after assigning');
      return clone(mState);

    case SIGNUP_CREDENTIONALS:
      mState.partnerSignupCredentials = action.payload;
      // console.log(mState.partnerSignupCredentials);
      // console.log('partner signup data from reducer after assigning');
      return clone(mState);

    case SIGNUP_PROFILE:
      mState.partnerSignupFullData = action.payload;
      // console.log(mState.partnerSignupFullData);
      // console.log('partner full signup data from reducer after assigning');
      return clone(mState);
    case SEND_VERIFICATION_CODE:
      mState.phoneVerify = action.payload.success;
      return clone(mState);
    case MATCH_VERIFICATION_CODE:
      mState.phoneVerify = !mState.phoneVerify;
      return clone(mState);
    case RESET_PASSWORD_EMAIL:
      mState.partnerEmailForResetPassword = action.payload.email;
      // console.log(mState.partnerEmailForResetPassword);
      // console.log(
      //   'partner email for reset password from reducer after assigning',
      // );
      return clone(mState);

    default:
      return clone(mState);
  }
}

const clone = obj => {
  return JSON.parse(JSON.stringify(obj));
};

export default AuthReducer;
