import {
  SEND_BROADCAST_TO_BUYER,
  WAITING_BROADCAST,
  ASKING_FOR_CONFIRMATION,
} from "../types";
import { ALERT_MSG } from "../../../../appStore/alertMsg/type";

import { BASE_URL } from "../../../../appStore/BASE_URL";
import axios from "axios";
import {
  ALERT_ERROR_COLOR,
  ALERT_SUCCESS_COLOR,
} from "../../../../theme/color";

//PartnerAuth
export const sendBroadcastToBuyer = (
  partnerID,
  menuID,
  menuSellerID,
  minAge,
  maxAge,
  context
) => (dispatch) => {
  context.setState({ filterSpinner: true });

  axios
    .post(
      BASE_URL + "partner/broadCast/send-broadcast-from-partner-to-buyers",
      {
        broadCast: {
          partnerID: partnerID,
          menuID: menuID,
          menuSellerID: menuSellerID,
          minAge: minAge,
          maxAge: maxAge,
        },
      }
    )
    .then((res) => {
      if (res.data.success === true) {
        context.setState({ spinnerMove: false });
        dispatch({
          type: SEND_BROADCAST_TO_BUYER,
          payload: res.data.broadCastSaved,
        });
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "BroadCast Status",
            alertIconName: "check-circle",
            alertColor: ALERT_SUCCESS_COLOR,
          },
        });
        context.setState({ modalVisible: false });
      }
      if (res.data.success === false) {
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "BroadCast Status",
            alertIconName: "check-circle",
            alertColor: ALERT_ERROR_COLOR,
          },
        });
      }
      context.setState({
        filterSpinner: false,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const checkActivateDeActiveBroadCast = () => (dispatch) => {
  axios
    .post(
      BASE_URL +
        "partner/broadCast/check-every-broadcast-with-current-time-and-and-deactivate-them"
    )

    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const listOfIntrestedBuyers = (partnerID, context) => (dispatch) => {
  context.setState({ spinnerMove: true });
  console.log(partnerID);
  axios
    .post(
      BASE_URL +
        "partner/broadCast/show-all-intersted-buyers-of-specifc-partners-broadcast",
      {
        partnerID: partnerID,
      }
    )
    .then((res) => {
      console.log(res.data);
      if (res.data.success === true) {
        context.setState({ spinnerMove: false });
        dispatch({
          type: WAITING_BROADCAST,
          payload: res.data.data,
        });
      }
      if (res.data.success === false) {
        context.setState({ spinnerMove: false });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const askForconfirmation = (broadcastID, context) => (dispatch) => {
  context.setState({ spinnerMove: true });

  axios
    .post(
      BASE_URL + "partner/broadCast/re-send-broadcast-and-confirm-qunatity",
      {
        broadCast: { broadcastID: broadcastID },
      }
    )
    .then((res) => {
      console.log(res.data);
      if (res.data.success === true) {
        context.setState({ spinnerMove: false });
        dispatch({
          type: ASKING_FOR_CONFIRMATION,
          payload: res.data.foundBroadCast,
        });
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Ask For Confirmation",
            alertIconName: "check-circle",
            alertColor: ALERT_SUCCESS_COLOR,
          },
        });
      }
      if (res.data.success === false) {
        context.setState({ spinnerMove: false });
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Ask For Confirmation",
            alertIconName: "check-circle",
            alertColor: ALERT_ERROR_COLOR,
          },
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
