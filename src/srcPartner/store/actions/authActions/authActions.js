import {
  LOGIN,
  SEND_VERIFICATION_CODE,
  MATCH_VERIFICATION_CODE,
  SIGNUP_CREDENTIONALS,
  SIGNUP_PROFILE,
  RESET_PASSWORD_EMAIL,
  RESET_PASSWORD_CODE_VERIFICATION,
  SET_NEW_PASSWORD,
  SHOW_PATNER_PROFILE,
  UPDATE_PATNER_PROFILE,
} from "../types";
import { ALERT_MSG } from "../../../../appStore/alertMsg/type";
import { LOAD_USER } from "../../../../appStore/loadUser/type";
import { BASE_URL } from "../../../../appStore/BASE_URL";
import axios from "axios";
import {
  ALERT_ERROR_COLOR,
  ALERT_SUCCESS_COLOR,
} from "../../../../theme/color";
import { LOGIN_ASYNC_STORAGE } from "../../../../appStore/asyncStorage/loginAsyncStorage";
import { AsyncStorage } from "react-native";

//PartnerAuth
export const partnerLogin = (data, context) => (dispatch) => {
  context.setState({ spinnerMove: true });
  // console.log(data.email);
  // console.log(data.password);
  // console.log('email and password of partner from action while login');
  axios
    .post(BASE_URL + "partner/auth/partner-login", {
      partner: { email: data.email, password: data.password },
    })
    .then((res) => {
      if (res.data.success === true) {
        context.setState({ spinnerMove: false, loginSuccess: true });
        dispatch({
          type: LOGIN,
          payload: res.data,
        });
        dispatch({
          type: LOAD_USER,
          payload: res.data.result,
        });
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Login",
            alertIconName: "check-circle",
            alertColor: ALERT_SUCCESS_COLOR,
          },
        });
        // console.log(res.data);
        // console.log('partner login response from action...success');
      }
      if (res.data.success === false) {
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Login",
            alertColor: ALERT_ERROR_COLOR,
            alertIconName: "exclamation-triangle",
          },
        });

        // console.log(res.data);
        // console.log('partner login response from action...failure');

        context.setState({
          spinnerMove: false,
        });
      }
    })
    .catch((err) => {
      console.log(err.data);
    });
};

export const phoneVerificationForSignup = (phone, context) => (dispatch) => {
  context.setState({ spinnerMove1: true });
  console.log(phone);
  console.log("partner phone in action");

  axios
    .post(BASE_URL + "seller/auth/verify-phone-and-send-code-in-sms", {
      phone: phone,
    })

    .then((res) => {
      if (res.data.success === true) {
        context.setState({ spinnerMove1: false, phoneValidate: true });
        dispatch({
          type: SEND_VERIFICATION_CODE,
          payload: res.data,
        });
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Phone Verification",
            alertIconName: "check-circle",
            alertColor: ALERT_SUCCESS_COLOR,
          },
        });
        console.log(res.data);
        console.log(
          "partner api response for phone verification from action...success"
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
            alertColor: ALERT_ERROR_COLOR,
          },
        });
        console.log(res.data);
        console.log(
          "partner api response for phone verification from action...failure"
        );
        context.setState({
          spinnerMove1: false,
        });
      }
    })
    .catch((err) => {
      console.log(err.data);
    });
};

export const codeMatchingForSignup = (phone, code, context) => (dispatch) => {
  context.setState({ spinnerMove2: true });

  axios
    .post(BASE_URL + "seller/auth/verify-code-of-seller", {
      phone: phone,
      code: code,
    })
    .then((res) => {
      if (res.data.success === true) {
        context.setState({ spinnerMove2: false, codeValidate: true });
        dispatch({
          type: MATCH_VERIFICATION_CODE,
          payload: res.data,
        });
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Code Verification",
            alertIconName: "check-circle",
            alertColor: ALERT_SUCCESS_COLOR,
          },
        });

        console.log(res.data);
        console.log(
          "partner api response for code verification from action...success"
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
            alertColor: ALERT_ERROR_COLOR,
          },
        });

        console.log(res.data);
        console.log(
          "partner api response for code verification from action...failure"
        );

        context.setState({
          spinnerMove2: false,
        });
      }
    })
    .catch((err) => {
      console.log(err.data);
    });
};

export const signupCredential = (data) => (dispatch) => {
  console.log(data);
  console.log("partner signup data from action");
  const state = {
    type: SIGNUP_CREDENTIONALS,
    payload: data,
  };
  dispatch(state);
};

export const signupProfile = (data, image, context) => (dispatch) => {
  console.log(data);
  console.log("partner signup data in action entry");
  context.setState({ spinnerMove: true });
  let stringifyData = JSON.stringify(data);
  let formData = new FormData();
  formData.append("data", stringifyData);
  formData.append("partnerImages", image);
  console.log(data);
  console.log("partner signup data in formdata");
  axios
    .post(BASE_URL + "partner/auth/register-partner-with-image", formData)
    .then((res) => {
      if (res.data.success === true) {
        context.setState({ spinnerMove: false, signupSuccess: true });
        dispatch({
          type: SIGNUP_PROFILE,
          payload: res.data,
        });
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Signup",
            alertIconName: "check-circle",
            alertColor: ALERT_SUCCESS_COLOR,
          },
        });
        console.log(res.data);
        console.log("response of partner signup full data from sucess");
      }

      if (res.data.success === false) {
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Signup",
            alertIconName: "exclamation-triangle",
            alertColor: ALERT_ERROR_COLOR,
          },
        });
        context.setState({
          spinnerMove: false,
        });
        console.log(res.data);
        console.log("response of partner signup full data from failure");
      }
    })
    .catch((err) => {
      console.log(err.data);
    });
};

//Reset Password Step-1
export const sendEmailForResetPassword = (email, context) => (dispatch) => {
  context.setState({ spinnerMove: true });
  // console.log(email);
  // console.log('partner email for reset password from action');
  axios
    .post(BASE_URL + "partner/auth/forget-pass-send-email", {
      email: email,
    })
    .then((res) => {
      if (res.data.success === true) {
        context.setState({ spinnerMove: false, emailValidate: true });
        dispatch({
          type: RESET_PASSWORD_EMAIL,
          payload: { data: res.data, email: email },
        });
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Reset Password",
            alertIconName: "check-circle",
            alertColor: ALERT_SUCCESS_COLOR,
          },
        });
      }
      // console.log(email);
      // console.log('partner email for reset password response from action');

      if (res.data.success === false) {
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Reset Password",
            alertIconName: "exclamation-triangle",
            alertColor: ALERT_ERROR_COLOR,
          },
        });
        context.setState({
          spinnerMove: false,
        });
      }
    })
    .catch((err) => {
      console.log(err.data);
    });
};

//Reset Password Step-2
export const codeVerificationForResetPassword = (email, code, context) => (
  dispatch
) => {
  context.setState({ spinnerMove: true });
  // console.log(email);
  // console.log('partner email for reset password from action');
  // console.log(code);
  // console.log('code for reset password from action');
  axios
    .post(BASE_URL + "partner/auth/forget-pass-code-match", {
      partner: { email: email, randomcode: code },
    })
    .then((res) => {
      if (res.data.success === true) {
        context.setState({ spinnerMove: false, codeValidate: true });
        dispatch({
          type: RESET_PASSWORD_CODE_VERIFICATION,
          payload: res.data,
        });
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Code Verification",
            alertIconName: "check-circle",
            alertColor: ALERT_SUCCESS_COLOR,
          },
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
            alertColor: ALERT_ERROR_COLOR,
          },
        });
        context.setState({
          spinnerMove: false,
        });
      }
    })
    .catch((err) => {
      console.log(err.data);
    });
};

//Reset Password Step-3
export const setNewPassword = (email, password, context) => (dispatch) => {
  context.setState({ spinnerMove: true });
  // console.log(email);
  // console.log('partner email for reset password from action');
  // console.log(password);
  // console.log('partner new password from action');
  axios
    .post(BASE_URL + "partner/auth/add-new-password", {
      partner: { email: email, password: password },
    })
    .then((res) => {
      if (res.data.success === true) {
        context.setState({ spinnerMove: false, setNewPassword: true });
        dispatch({
          type: SET_NEW_PASSWORD,
          payload: res.data,
        });
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Recover Password",
            alertIconName: "check-circle",
            alertColor: ALERT_SUCCESS_COLOR,
          },
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
            alertColor: ALERT_ERROR_COLOR,
          },
        });
        // console.log(res.data);
        // console.log('new password set response from failure');
        context.setState({
          spinnerMove: false,
        });
      }
    })
    .catch((err) => {
      console.log(err.data);
    });
};

//ShowSellerProfile
export const showPatnerProfile = (partnerID, context) => (dispatch) => {
  axios
    .post(BASE_URL + "partner/auth/show-one-partner-against-id", {
      partnerID: partnerID,
    })
    .then((res) => {
      console.log(res.data);
      if (res.data.success === true) {
        dispatch({
          type: SHOW_PATNER_PROFILE,
          payload: res.data,
        });
        context.setState({
          _id: res.data.foundpartner._id,
          patnerPoints: res.data.foundpartner.partnerPoints,
          email: res.data.foundpartner.email,
          phoneNumber: res.data.foundpartner.phone,
          address: res.data.foundpartner.address,
          partnerImgURL: res.data.foundpartner.partnerImgURL[0],
          partnerName: res.data.foundpartner.partnerName,
          postalCode: res.data.foundpartner.postalCode,
          partnerPoints: res.data.foundpartner.partnerPoints,
          longitude: res.data.foundpartner.location.longitude,
          latitude: res.data.foundpartner.location.latitude,
        });
      }

      if (res.data.success === false) {
        context.setState({
          spinnerMove: false,
        });
      }
    })
    .catch((err) => {
      console.log(err.data);
    });
};

export const updatePatnerProfile = (data, image, context) => (dispatch) => {
  context.setState({ spinnerMove: true });
  let stringifyData = JSON.stringify(data);
  let formData = new FormData();
  formData.append("data", stringifyData);
  formData.append("partnerImages", image);

  axios
    .post(BASE_URL + "partner/auth/update-partner-with-image", formData)
    .then((res) => {
      console.log(res.data);

      if (res.data.success === true) {
        AsyncStorage.removeItem(LOGIN_ASYNC_STORAGE).then((user) =>
          AsyncStorage.setItem(
            LOGIN_ASYNC_STORAGE,
            JSON.stringify(res.data.savedpartner)
          ).then((user) =>
            context.props.loadUserAction(res.data.savedpartner, context)
          )
        );
        context.setState({ spinnerMove: false, toggleMode: false });
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Patner Update",
            alertIconName: "check-circle",
            alertColor: ALERT_SUCCESS_COLOR,
          },
        });
        dispatch({
          type: UPDATE_PATNER_PROFILE,
          payload: res.data,
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
            alertColor: ALERT_ERROR_COLOR,
          },
        });
        context.setState({
          spinnerMove: false,
        });
        // console.log(res.data);
        // console.log('response of seller signup from failure');
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
