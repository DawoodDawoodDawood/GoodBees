import {
  SHOW_ALL_PATNER_LIST,
  SEARCH_PATNER,
  SEND_REQUEST_TO_PATNER,
  CONNECTED_PARTNERS
} from "../types";
import { ALERT_MSG } from "../../../../appStore/alertMsg/type";
import { BASE_URL } from "../../../../appStore/BASE_URL";
import axios from "axios";
import {
  ALERT_SUCCESS_COLOR,
  ALERT_ERROR_COLOR
} from "../../../../theme/color";

export const showAllPatnerList = (limit, offset, context) => dispatch => {
  //   context.setState({ saveSpin: true });

  axios
    .post(BASE_URL + "partner/auth/show-all-partners-to-seller-in-chunks", {
      limit,
      offset
    })
    .then(res => {
      //   context.setState({ saveSpin: false });

      if (res.data.success === true) {
        dispatch({
          type: SHOW_ALL_PATNER_LIST,
          payload: { data: res.data.foundpartnersList, offset: offset }
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

export const searchAssociatedPartner = (
  sellerID,
  partnerName,
  partnerPhone,
  isNameOrPhone,
  context
) => dispatch => {
  console.log(sellerID, partnerName, partnerPhone, isNameOrPhone);
  //   context.setState({ saveSpin: true });

  axios
    .post(BASE_URL + "seller/friendRequest/search-partner-by-name-or-phone", {
      sellerID: sellerID,
      partnerName,
      partnerPhone,
      isNameOrPhone
    })
    .then(res => {
      console.log(res.data);
      if (res.data.success === true) {
        dispatch({
          type: SEARCH_PATNER,
          payload: res.data.found
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

export const sellerRequestPatner = (
  sellerID,
  partnerID,
  context
) => dispatch => {
  context.setState({ spinnerMove: true });
  axios
    .post(
      BASE_URL +
        "seller/friendRequest/seller-send-or-create-request-to-partner",
      {
        friendRequest: { sellerID: sellerID, partnerID: partnerID }
      }
    )
    .then(res => {
      console.log(res.data);
      if (res.data.success === true) {
        dispatch({
          type: SEND_REQUEST_TO_PATNER,
          payload: partnerID
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
        context.setState({
          spinnerMove: false
        });
      }

      if (res.data.success === false) {
        context.setState({
          spinnerMove: false
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
    })
    .catch(err => {
      console.log(err);
    });
};

export const connectedPatner = (sellerrID, context) => dispatch => {
  context.setState({ spinnerMove: false });
  axios
    .post(
      BASE_URL +
        "seller/friendRequest/show-all-accepted-friendrequests-of-specific-seller",
      {
        sellerrID: sellerrID
      }
    )
    .then(res => {
      console.log(res.data);
      if (res.data.success === true) {
        dispatch({
          type: CONNECTED_PARTNERS,
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
