import {
  LOGIN,
  SEND_VERIFICATION_CODE,
  MATCH_VERIFICATION_CODE,
  SIGNUP_CREDENTIONALS,
  SIGNUP_PROFILE,
  RESET_PASSWORD_EMAIL,
  RESET_PASSWORD_CODE_VERIFICATION,
  SET_NEW_PASSWORD,
  SHOW_BUYER_PROFILE,
  UPDATE_BUYER_PROFILE
} from "../types";
import { ALERT_MSG } from "../../../../appStore/alertMsg/type";
import { LOAD_USER } from "../../../../appStore/loadUser/type";
import { BASE_URL } from "../../../../appStore/BASE_URL";
import axios from "axios";
import { AsyncStorage } from "react-native";
import {
  ALERT_ERROR_COLOR,
  ALERT_SUCCESS_COLOR
} from "../../../../theme/color";
import { LOGIN_ASYNC_STORAGE } from "../../../../appStore/asyncStorage/loginAsyncStorage";

//BuyerAuth
export const buyerLogin = (data, context) => dispatch => {
  context.setState({ spinnerMove: true });
  // console.log(data.email);
  // console.log(data.password);
  // console.log('email and password from action');
  axios
    .post(BASE_URL + "buyer/auth/buyer-login", {
      buyer: { email: data.email, password: data.password }
    })
    .then(res => {
      if (res.data.success === true) {
        context.setState({ spinnerMove: false, loginSuccess: true });
        dispatch({
          type: LOGIN,
          payload: res.data
        });
        dispatch({
          type: LOAD_USER,
          payload: res.data.result
        });
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Login",
            alertIconName: "check-circle",
            alertColor: ALERT_SUCCESS_COLOR
          }
        });
        // console.log(res.data);
        // console.log('buyer login response from action');
      }
      if (res.data.success === false) {
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Login",
            alertColor: ALERT_ERROR_COLOR,
            alertIconName: "exclamation-triangle"
          }
        });
        context.setState({
          spinnerMove: false
        });
      }
      // console.log(res.data);
      // console.log('buyer login response from action');
    })
    .catch(err => {
      console.log(err.data);
    });
};

export const phoneVerificationForSignup = (phone, context) => dispatch => {
  context.setState({ spinnerMove1: true });
  console.log(phone);
  console.log("buyer phone in action");

  axios
    .post(BASE_URL + "seller/auth/verify-phone-and-send-code-in-sms", {
      phone: phone
    })

    .then(res => {
      if (res.data.success === true) {
        context.setState({ spinnerMove1: false, phoneValidate: true });
        dispatch({
          type: SEND_VERIFICATION_CODE,
          payload: res.data
        });
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Phone Verification",
            alertIconName: "check-circle",
            alertColor: ALERT_SUCCESS_COLOR
          }
        });
        console.log(res.data);
        console.log(
          "buyer api response for phone verification from action...success"
        );
      }

      if (res.data.success === false) {
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Phone Verification",
            alertIconName: "exclamation-triangle",
            alertColor: ALERT_ERROR_COLOR
          }
        });
        console.log(res.data);
        console.log(
          "buyer api response for phone verification from action...failure"
        );
        context.setState({
          spinnerMove1: false
        });
      }
    })
    .catch(err => {
      console.log(err.data);
    });
};

export const codeMatchingForSignup = (phone, code, context) => dispatch => {
  context.setState({ spinnerMove2: true });

  axios
    .post(BASE_URL + "seller/auth/verify-code-of-seller", {
      phone: phone,
      code: code
    })
    .then(res => {
      if (res.data.success === true) {
        context.setState({ spinnerMove2: false, codeValidate: true });
        dispatch({
          type: MATCH_VERIFICATION_CODE,
          payload: res.data
        });
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Code Verification",
            alertIconName: "check-circle",
            alertColor: ALERT_SUCCESS_COLOR
          }
        });

        console.log(res.data);
        console.log(
          "buyer api response for code verification from action...success"
        );
      }

      if (res.data.success === false) {
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Code Verification",
            alertIconName: "exclamation-triangle",
            alertColor: ALERT_ERROR_COLOR
          }
        });

        console.log(res.data);
        console.log(
          "buyer api response for code verification from action...failure"
        );

        context.setState({
          spinnerMove2: false
        });
      }
    })
    .catch(err => {
      console.log(err.data);
    });
};

export const signupCredential = data => dispatch => {
  const state = {
    type: SIGNUP_CREDENTIONALS,
    payload: data
  };
  dispatch(state);
};

export const signupProfile = (data, image, context) => dispatch => {
  context.setState({ spinnerMove: true });
  let stringifyData = JSON.stringify(data);
  let formData = new FormData();
  formData.append("data", stringifyData);
  formData.append("buyerImages", image);
  console.log(formData);

  // console.log('buyer signup data in form data');
  axios
    .post(BASE_URL + "buyer/auth/register-buyer-with-image", formData)
    .then(res => {
      if (res.data.success === true) {
        context.setState({ spinnerMove: false, signupSuccess: true });
        dispatch({
          type: SIGNUP_PROFILE,
          payload: res.data
        });
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Signup",
            alertIconName: "check-circle",
            alertColor: ALERT_SUCCESS_COLOR
          }
        });
        // console.log(res.data);
        // console.log('response of buyer signup full data from sucess');
      }

      if (res.data.success === false) {
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Signup",
            alertIconName: "exclamation-triangle",
            alertColor: ALERT_ERROR_COLOR
          }
        });
        context.setState({
          spinnerMove: false
        });
        // console.log(res.data);
        // console.log('response of buyer signup full data from failure');
      }
    })
    .catch(err => {
      console.log(err.data);
    });
};

//Reset Password Step-1
export const sendEmailForResetPassword = (email, context) => dispatch => {
  context.setState({ spinnerMove: true });
  // console.log(email);
  // console.log('email for reset password from action');
  axios
    .post(BASE_URL + "buyer/auth/forget-pass-send-email", {
      email: email
    })
    .then(res => {
      if (res.data.success === true) {
        context.setState({ spinnerMove: false, emailValidate: true });
        dispatch({
          type: RESET_PASSWORD_EMAIL,
          payload: { data: res.data, email: email }
        });
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Reset Password",
            alertIconName: "check-circle",
            alertColor: ALERT_SUCCESS_COLOR
          }
        });
      }
      // console.log(email);
      // console.log('email for reset password response from action');

      if (res.data.success === false) {
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Reset Password",
            alertIconName: "exclamation-triangle",
            alertColor: ALERT_ERROR_COLOR
          }
        });
        context.setState({
          spinnerMove: false
        });
      }
    })
    .catch(err => {
      console.log(err.data);
    });
};

//Reset Password Step-2
export const codeVerificationForResetPassword = (
  email,
  code,
  context
) => dispatch => {
  context.setState({ spinnerMove: true });
  // console.log(email);
  // console.log('buyer email for reset password from action');
  // console.log(code);
  // console.log('code for reset password from action');
  axios
    .post(BASE_URL + "buyer/auth/forget-pass-code-match", {
      buyer: { email: email, randomcode: code }
    })
    .then(res => {
      if (res.data.success === true) {
        context.setState({ spinnerMove: false, codeValidate: true });
        dispatch({
          type: RESET_PASSWORD_CODE_VERIFICATION,
          payload: res.data
        });
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Code Verification",
            alertIconName: "check-circle",
            alertColor: ALERT_SUCCESS_COLOR
          }
        });
      }
      // console.log(res.data);
      // console.log('code verification for reset password response from action');

      if (res.data.success === false) {
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Code Verification",
            alertIconName: "exclamation-triangle",
            alertColor: ALERT_ERROR_COLOR
          }
        });
        context.setState({
          spinnerMove: false
        });
      }
    })
    .catch(err => {
      console.log(err.data);
    });
};

//Reset Password Step-3
export const setNewPassword = (email, password, context) => dispatch => {
  context.setState({ spinnerMove: true });
  // console.log(email);
  // console.log('buyer email for reset password from action');
  // console.log(password);
  // console.log('buyer new password from action');
  axios
    .post(BASE_URL + "buyer/auth/add-new-password", {
      buyer: { email: email, password: password }
    })
    .then(res => {
      if (res.data.success === true) {
        context.setState({ spinnerMove: false, setNewPassword: true });
        dispatch({
          type: SET_NEW_PASSWORD,
          payload: res.data
        });
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Recover Password",
            alertIconName: "check-circle",
            alertColor: ALERT_SUCCESS_COLOR
          }
        });
        // console.log(res.data);
        // console.log('new password set response from success');
      }

      if (res.data.success === false) {
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Recover Password",
            alertIconName: "exclamation-triangle",
            alertColor: ALERT_ERROR_COLOR
          }
        });
        // console.log(res.data);
        // console.log('new password set response from failure');
        context.setState({
          spinnerMove: false
        });
      }
    })
    .catch(err => {
      console.log(err.data);
    });
};

//ShowSellerProfile
export const showBuyerProfile = (buyerID, context) => dispatch => {
  axios
    .post(BASE_URL + "buyer/auth/show-one-buyer-against-id", {
      buyerID: buyerID
    })
    .then(res => {
      console.log(res.data);
      if (res.data.success === true) {
        console.log(res.data.foundBuyer);
        context.setState({
          id: res.data.foundBuyer._id,
          buyerPoints: res.data.foundBuyer.buyerPoints,
          buyerImgURL: res.data.foundBuyer.buyerImgURL[0],
          name: res.data.foundBuyer.buyerName,
          email: res.data.foundBuyer.email,
          phoneNumber: res.data.foundBuyer.phone,
          age: res.data.foundBuyer.age,
          postalCode: res.data.foundBuyer.postalCode,
          address: res.data.foundBuyer.address,
          breakfast: res.data.foundBuyer.foodFor.breakFast,
          lunch: res.data.foundBuyer.foodFor.lunch,
          dinner: res.data.foundBuyer.foodFor.dinner,
          halal: res.data.foundBuyer.foodCategory.halal,
          notHalal: res.data.foundBuyer.foodCategory.notHalal,
          alergicDetail: res.data.foundBuyer.foodCategory.alergicDetails,
          veg: res.data.foundBuyer.foodType.veg,
          nonVeg: res.data.foundBuyer.foodType.nonVeg,
          alergicDetails: res.data.foundBuyer.alergicDetails,
          longitude: res.data.foundBuyer.location.longitude,
          latitude: res.data.foundBuyer.location.latitude
        });
        dispatch({
          type: SHOW_BUYER_PROFILE,
          payload: res.data
        });
      }

      if (res.data.success === false) {
        // dispatch({
        //   type: ALERT_MSG,
        //   payload: {
        //     data: res.data,
        //     success: true,
        //     alert: "Seller Profile Detail",
        //     alertIconName: "exclamation-triangle",
        //     alertColor: ALERT_ERROR_COLOR
        //   }
        // });

        context.setState({
          spinnerMove: false
        });
      }
    })
    .catch(err => {
      console.log(err.data);
    });
};

export const updateBuyerProfile = (data, image, context) => dispatch => {
  context.setState({ spinnerMove: true });
  let stringifyData = JSON.stringify(data);
  let formData = new FormData();
  formData.append("data", stringifyData);
  formData.append("buyerImages", image);
  console.warn(formData);
  axios
    .post(BASE_URL + "buyer/auth/update-buyer-with-image", formData)
    .then(res => {
      console.log(res.data);

      if (res.data.success === true) {
        AsyncStorage.removeItem(LOGIN_ASYNC_STORAGE).then(user =>
          AsyncStorage.setItem(
            LOGIN_ASYNC_STORAGE,
            JSON.stringify(res.data.updatedbuyer)
          ).then(user =>
            context.props.loadUserAction(res.data.updatedbuyer, context)
          )
        );
        context.setState({ spinnerMove: false, toggleMode: false });
        dispatch({
          type: UPDATE_BUYER_PROFILE,
          payload: res.data
        });

        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Update Profile",
            alertIconName: "check-circle",
            alertColor: ALERT_SUCCESS_COLOR
          }
        });
      }

      if (res.data.success === false) {
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Update Profile",
            alertIconName: "exclamation-triangle",
            alertColor: ALERT_ERROR_COLOR
          }
        });
        context.setState({
          spinnerMove: false
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};
