import {
  LOGIN,
  SEND_VERIFICATION_CODE,
  MATCH_VERIFICATION_CODE,
  SIGNUP_CREDENTIONALS,
  SIGNUP_PROFILE,
  RESET_PASSWORD_EMAIL,
  RESET_PASSWORD_CODE_VERIFICATION,
  SET_NEW_PASSWORD,
  SHOW_SELLER_PROFILE,
  UPDATE_SELLER_PROFILE,
  ALL_SELLER_TYPE,
} from "../types";
import { ALERT_MSG } from "../../../../appStore/alertMsg/type";
import { LOAD_USER } from "../../../../appStore/loadUser/type";
import { BASE_URL } from "../../../../appStore/BASE_URL";
import axios from "axios";
import {
  ALERT_ERROR_COLOR,
  ALERT_SUCCESS_COLOR,
} from "../../../../theme/color";
import { AsyncStorage } from "react-native";
import { LOGIN_ASYNC_STORAGE } from "../../../../appStore/asyncStorage/loginAsyncStorage";
//SellerAuth
export const sellerLogin = (data, context) => (dispatch) => {
  console.log(data);
  context.setState({ spinnerMove: true });

  axios
    .post(BASE_URL + "seller/auth/seller-login", {
      seller: { email: data.email, password: data.password },
    })
    .then((res) => {
      if (res.data.success === true) {
        console.warn(res.data.result);
        context.props.loadUserAction(res.data.result);
        // dispatch({
        //   type: LOAD_USER,
        //   payload: res.data.result
        // });

        context.setState({
          spinnerMove: false,
          loginSuccess: true,
          sellerType: res.data.result.sellerType.selerTypesName,
        });
        dispatch({
          type: LOGIN,
          payload: res.data,
        });
        dispatch({
          type: LOAD_USER,
          payload: res.data.result,
        });
        // dispatch({
        //   type: ALERT_MSG,
        //   payload: {
        //     data: res.data,
        //     success: true,
        //     alert: "Login",
        //     alertIconName: "check-circle",
        //     alertColor: ALERT_SUCCESS_COLOR
        //   }
        // });
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
        context.setState({
          spinnerMove: false,
        });
      }
      // console.log(res.data);
      // console.log('api response from action');
    })
    .catch((err) => {
      console.log(err.data);
    });
};

export const phoneVerificationForSignup = (phone, context) => (dispatch) => {
  context.setState({ spinnerMove1: true });
  console.log(phone);
  console.log("phone in action");

  axios
    .post(BASE_URL + "seller/auth/verify-phone-and-send-code-in-sms", {
      phone: phone,
    })
    .then((res) => {
      context.setState({ spinnerMove1: false });
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
          "api response for phone verification from action...success"
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
          "api response for phone verification from action...failure"
        );
      }
    })
    .catch((err) => {
      console.log(err);
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
        console.log("api response for code verification from action...success");
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
        console.log("api response for code verification from action...failure");

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
  // console.log(data);
  // console.log('signup data from action');
  const state = {
    type: SIGNUP_CREDENTIONALS,
    payload: data,
  };
  dispatch(state);
};

export const signupProfile = (data, image, context) => (dispatch) => {
  console.log(data);
  context.setState({ spinnerMove: true });
  let stringifyData = JSON.stringify(data);
  let formData = new FormData();
  formData.append("data", stringifyData);
  formData.append("sellerImages", image);
  console.warn(formData);
  axios
    .post(BASE_URL + "seller/auth/register-seller-with-image", formData)
    .then((res) => {
      console.log(res.data);
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
        // console.log(res.data);
        // console.log('response of seller signup from sucess');
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
        // console.log(res.data);
        // console.log('response of seller signup from failure');
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

//Reset Password Step-1
export const sendEmailForResetPassword = (email, context) => (dispatch) => {
  context.setState({ spinnerMove: true });
  // console.log(email);
  // console.log('email from action');
  axios
    .post(BASE_URL + "seller/auth/forget-pass-send-email", {
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
      // console.log('api response from action...email');

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
  // console.log('email from action');
  // console.log(code);
  // console.log('code from action');
  axios
    .post(BASE_URL + "seller/auth/forget-pass-code-match", {
      seller: { email: email, randomcode: code },
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
      // console.log('api response from action');

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
  // console.log('email from action');
  // console.log(password);
  // console.log('password from action');
  axios
    .post(BASE_URL + "seller/auth/add-new-password", {
      seller: { email: email, password: password },
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
      }
      // console.log(res.data);
      // console.log('api response from action');

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
export const showSellerProfile = (sellerId, context) => (dispatch) => {
  axios
    .post(BASE_URL + "seller/auth/show-specific-seller-details", {
      sellerID: sellerId,
    })
    .then((res) => {
      console.log("res.data");
      console.log(res.data);
      if (res.data.success === true) {
        console.warn(res.data.foundSeller);
        context.setState({
          sellerPoints: res.data.foundSeller.sellerPoints,
          id: res.data.foundSeller._id,
          sellerType: res.data.foundSeller.sellerType.selerTypesName,
          sellerTypeID: res.data.foundSeller.sellerType._id,
          postalCode: res.data.foundSeller.postalCode,
          imageURL: res.data.foundSeller.sellerImgURL[0],
          name: res.data.foundSeller.sellerName,
          email: res.data.foundSeller.email,
          phone: res.data.foundSeller.phone,
          veg: res.data.foundSeller.foodType.veg,
          nonVeg: res.data.foundSeller.foodType.nonVeg,
          breakfast: res.data.foundSeller.foodFor.breakFast,
          lunch: res.data.foundSeller.foodFor.lunch,
          dinner: res.data.foundSeller.foodFor.dinner,
          halal: res.data.foundSeller.foodCategory.halal,
          notHalal: res.data.foundSeller.foodCategory.notHalal,
          address: res.data.foundSeller.address,
          delivery: res.data.foundSeller.delivery,
          selfPickUp: res.data.foundSeller.selfPickUp,
          longitude: res.data.foundSeller.location.longitude,
          latitude: res.data.foundSeller.location.latitude,
          spinnerMove: false,
          getSellerProfile: true,
        });
        dispatch({
          type: SHOW_SELLER_PROFILE,
          payload: res.data,
        });

        console.log(res.data);
        console.log(
          " show Seller Profile Detail response from action...success"
        );
      }

      if (res.data.success === false) {
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Seller Profile Detail",
            alertIconName: "exclamation-triangle",
            alertColor: ALERT_ERROR_COLOR,
          },
        });

        console.log(res.data);
        console.log(
          " show Seller Profile Detail response from action...failure"
        );
        context.setState({
          spinnerMove: false,
        });
      }
    })
    .catch((err) => {
      console.log(err.data);
    });
};

export const updateSellerProfile = (data, image, context) => (dispatch) => {
  context.setState({ spinnerMove: true });
  let stringifyData = JSON.stringify(data);
  let formData = new FormData();
  formData.append("data", stringifyData);
  formData.append("sellerImages", image);
  console.warn(formData);
  axios
    .post(BASE_URL + "seller/auth/update-seller-with-image", formData)
    .then((res) => {
      console.log(res.data);

      if (res.data.success === true) {
        AsyncStorage.removeItem(LOGIN_ASYNC_STORAGE).then((user) =>
          AsyncStorage.setItem(
            LOGIN_ASYNC_STORAGE,
            JSON.stringify(res.data.savedseller)
          ).then((user) =>
            context.props.loadUserAction(res.data.savedseller, context)
          )
        );
        context.setState({ spinnerMove: false, toggleMode: false });
        dispatch({
          type: UPDATE_SELLER_PROFILE,
          payload: res.data,
        });
        console.log(res.data);

        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Update Profile",
            alertIconName: "check-circle",
            alertColor: ALERT_SUCCESS_COLOR,
          },
        });
        // console.log(res.data);
        // console.log('response of seller signup from sucess');
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
export const sellerTypeList = (context) => (dispatch) => {
  axios
    .post(BASE_URL + "seller/auth/show-all-seller-types")
    .then((res) => {
      console.log(res.data);

      if (res.data.success === true) {
        dispatch({
          type: ALL_SELLER_TYPE,
          payload: res.data.foundSellerTypesLists,
        });
        context.setState({ sellerTypeArray: res.data.foundSellerTypesLists });
        // console.log(res.data);
        // console.log('response of seller signup from sucess');
      }

      if (res.data.success === false) {
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
