import {
  SHOW_REQUESTS_OF_SELLERS,
  ACCEPT_REJECT_SELLER_REQUEST,
  ACCPTED_SELLER_LIST
} from "../types";
import { ALERT_MSG } from "../../../../appStore/alertMsg/type";
import { LOAD_USER } from "../../../../appStore/loadUser/type";
import { BASE_URL } from "../../../../appStore/BASE_URL";
import axios from "axios";
import {
  ALERT_ERROR_COLOR,
  ALERT_SUCCESS_COLOR
} from "../../../../theme/color";
import { LOGIN_ASYNC_STORAGE } from "../../../../appStore/asyncStorage/loginAsyncStorage";
import { AsyncStorage } from "react-native";

//PartnerAuth
export const showRequestedSelleres = (partnerID, context) => dispatch => {
  context.setState({ spinnerMove: true });

  axios
    .post(
      BASE_URL +
        "seller/friendRequest/show-all-partners-friend-requests-received-by-sellers",
      {
        partnerID: partnerID
      }
    )
    .then(res => {
      console.log(res.data);
      if (res.data.success === true) {
        context.setState({ spinnerMove: false });
        dispatch({
          type: SHOW_REQUESTS_OF_SELLERS,
          payload: res.data.foundrequests
        });

        // console.log(res.data);
        // console.log('partner login response from action...success');
      }
      if (res.data.success === false) {
        // console.log(res.data);
        // console.log('partner login response from action...failure');

        context.setState({
          spinnerMove: false,
          noData: true
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};
export const acceptRejectRequest = (
  friendRequestID,
  isAcceptOrRejectstatus,
  context
) => dispatch => {
  context.setState({ spinnerMove: true });

  axios
    .post(
      BASE_URL +
        "seller/friendRequest/accept-or-reject-request-of-seller-by-partner",
      {
        friendRequestID: friendRequestID,
        isAcceptOrRejectstatus: isAcceptOrRejectstatus
      }
    )
    .then(res => {
      if (res.data.success === true) {
        context.setState({ spinnerMove: false });

        dispatch({
          type: ACCEPT_REJECT_SELLER_REQUEST,
          payload: { data: res.data.foundrequests, ID: friendRequestID }
        });
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Request Status",
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
            alert: "Request Status",
            alertIconName: "check-circle",
            alertColor: ALERT_SUCCESS_COLOR
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

export const allAcceptedSeller = (partnerID, context) => dispatch => {
  context.setState({ spinnerMove: true });

  axios
    .post(
      BASE_URL +
        "seller/friendRequest/show-all-accepted-friendrequests-of-specific-partner",
      {
        partnerID: partnerID
      }
    )
    .then(res => {
      if (res.data.success === true) {
        context.setState({ spinnerMove: false });

        dispatch({
          type: ACCPTED_SELLER_LIST,
          payload: res.data.foundrequests
        });
      }
      if (res.data.success === false) {
        context.setState({
          spinnerMove: false
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};
