import {
  BROADCAST_LIST_OF_MENUS,
  SHOW_INTREST_AGAINST_BROADCAST,
  SHOW_LIST_OF_NEEDED_CONFIRMATION
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
export const boardCastListOfMenus = (buyerID, context) => dispatch => {
  context.setState({ spinnerMove: true });
  console.log(buyerID);
  axios
    .post(BASE_URL + "partner/broadCast/show-all-broadCasts-with-their-menus", {
      buyerID: buyerID
    })
    .then(res => {
      console.log(res.data);
      if (res.data.success === true) {
        if (res.data.buyersBroadCasts.length > 0) {
          context.setState({ spinnerMove: false });
          dispatch({
            type: BROADCAST_LIST_OF_MENUS,
            payload: res.data.buyersBroadCasts
          });
        } else {
          context.setState({ spinnerMove: false, noMenu: true });
        }
      }
      if (res.data.success === false) {
        context.setState({ noMenu: true });
        context.setState({ spinnerMove: false });
      }
    })
    .catch(err => {
      console.log(err.data);
    });
};

//ShowIntrestInBroadCast
export const showIntrestAgainstBroadCast = (
  broadcastID,
  buyerID,
  context
) => dispatch => {
  context.setState({ spinnerMove: true });
  console.log(broadcastID);
  console.log(buyerID);
  axios
    .post(BASE_URL + "partner/broadCast/broadcast-response", {
      broadCast: {
        broadcastID: broadcastID,
        buyerID: buyerID
      }
    })
    .then(res => {
      console.log(res.data);
      if (res.data.success === true) {
        context.setState({ spinnerMove: false, loginSuccess: true });
        dispatch({
          type: SHOW_INTREST_AGAINST_BROADCAST,
          payload: res.data
        });
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: { msg: "Intrest Marked" },
            success: true,
            alert: "Menu Intrest",
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
            alert: "Menu Intrest",
            alertColor: ALERT_ERROR_COLOR,
            alertIconName: "exclamation-triangle"
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

export const showListNeedToBeConfirmed = (buyerID, context) => dispatch => {
  context.setState({ spinnerMove: true });
  console.log(buyerID);
  axios
    .post(
      BASE_URL +
        "partner/broadCast/show-re-send-broadcast-and-confirm-qunatity-list",
      {
        buyerID: buyerID
      }
    )
    .then(res => {
      console.log(res.data);
      if (res.data.success === true) {
        if (res.data.foundConfirmations.length > 0) {
          context.setState({ spinnerMove: false });
          dispatch({
            type: SHOW_LIST_OF_NEEDED_CONFIRMATION,
            payload: res.data.foundConfirmations
          });
        } else {
          context.setState({ spinnerMove: false, noMenu: true });
        }
      }
      if (res.data.success === false) {
        context.setState({ noMenu: true });
        context.setState({ spinnerMove: false });
      }
    })
    .catch(err => {
      console.log(err);
    });
};
export const confirmOrderToPatner = (
  broadcastID,
  buyerID,
  qty,
  price,
  deliveryAddress
) => dispatch => {
  context.setState({ spinnerMove: true });
  console.log(broadcastID);
  console.log(buyerID);
  axios
    .post(BASE_URL + "partner/broadCast/get-order-details-by-each-buyer", {
      broadCast: {
        broadcastID: broadcastID,
        buyerID: buyerID
      }
    })
    .then(res => {
      console.log(res.data);
      if (res.data.success === true) {
        context.setState({ spinnerMove: false, loginSuccess: true });
        dispatch({
          type: SHOW_INTREST_AGAINST_BROADCAST,
          payload: res.data
        });
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: { msg: "Intrest Marked" },
            success: true,
            alert: "Menu Intrest",
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
            alert: "Menu Intrest",
            alertColor: ALERT_ERROR_COLOR,
            alertIconName: "exclamation-triangle"
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
