import {
  SHOW_BOOKED_ORDERS_OF_BUYER,
  SHOW_BOOKED_ORDERS_OF_PARTNER,
  SHOW_DELIVERED_ORDERS_OF_BUYER,
  SHOW_DELIVERED_ORDERS_OF_PARTNER,
  ORDER_DELIVERED,
} from "../types";
import { ALERT_MSG } from "../../../../appStore/alertMsg/type";
import { BASE_URL } from "../../../../appStore/BASE_URL";
import axios from "axios";
import {
  ALERT_SUCCESS_COLOR,
  ALERT_ERROR_COLOR,
} from "../../../../theme/color";

export const showBookedOrdersOfBuyer = (sellerId, userType, context) => (
  dispatch
) => {
  context.setState({ spinnerMove: true });

  axios
    .post(BASE_URL + "order/buyer/show-BOOKED-order-of-Seller", {
      sellerID: sellerId,
      userType: userType,
    })
    .then((res) => {
      console.log(res.data);
      if (res.data.success === true) {
        context.setState({ spinnerMove: false, buyerBookedOrder: true });
        dispatch({
          type: SHOW_BOOKED_ORDERS_OF_BUYER,
          payload: res.data.allBOOKEDOrderOfSeller,
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

//2
export const showBookedOrdersOfPartner = (sellerId, userType, context) => (
  dispatch
) => {
  context.setState({ spinnerMove: true });

  axios
    .post(BASE_URL + "order/buyer/show-BOOKED-order-of-Seller", {
      sellerID: sellerId,
      userType: userType,
    })
    .then((res) => {
      if (res.data.success === true) {
        context.setState({ spinnerMove: false, partnerBookedOrder: true });
        dispatch({
          type: SHOW_BOOKED_ORDERS_OF_PARTNER,
          payload: res.data.allBOOKEDOrderOfSeller,
        });
        // dispatch({
        //   type: ALERT_MSG,
        //   payload: {
        //     data: res.data,
        //     success: true,
        //     alert: "Partner Booked Orders",
        //     alertIconName: "check-circle",
        //     alertColor: ALERT_SUCCESS_COLOR,
        //   },
        // });
        console.log(res.data);
        console.log(
          "response of show Partner Booked Orders from action...success"
        );
      }

      if (res.data.success === false) {
        // dispatch({
        //   type: ALERT_MSG,
        //   payload: {
        //     data: res.data,
        //     success: true,
        //     alert: "Partner Booked Orders",
        //     alertIconName: "exclamation-triangle",
        //     alertColor: ALERT_ERROR_COLOR
        //   }
        // });

        console.log(res.data);
        console.log(
          "response of Show Partner Booked Orders from action...failure"
        );

        context.setState({
          spinnerMove: false,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

//3
export const showDeliveredOrdersOfBuyer = (sellerId, userType, context) => (
  dispatch
) => {
  console.log(sellerId);
  context.setState({ spinnerMove: true });

  axios
    .post(BASE_URL + "order/buyer/show-Delivered-order-of-Seller", {
      sellerID: sellerId,
      userType: userType,
    })
    .then((res) => {
      console.log(res.data);
      if (res.data.success === true) {
        context.setState({ spinnerMove: false, buyerDeliveredOrder: true });
        dispatch({
          type: SHOW_DELIVERED_ORDERS_OF_BUYER,
          payload: res.data.allDeliveredOrderOfSeller,
        });
        // dispatch({
        //   type: ALERT_MSG,
        //   payload: {
        //     data: res.data,
        //     success: true,
        //     alert: "Buyer Delivered Orders",
        //     alertIconName: "check-circle",
        //     alertColor: ALERT_SUCCESS_COLOR,
        //   },
        // });
      }

      if (res.data.success === false) {
        // dispatch({
        //   type: ALERT_MSG,
        //   payload: {
        //     data: res.data,
        //     success: true,
        //     alert: "Buyer Delivered Orders",
        //     alertIconName: "exclamation-triangle",
        //     alertColor: ALERT_ERROR_COLOR,
        //   },
        // });

        context.setState({
          spinnerMove: false,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

//4
export const showDeliveredOrdersOfPartner = (sellerId, userType, context) => (
  dispatch
) => {
  context.setState({ spinnerMove: true });

  axios
    .post(BASE_URL + "order/buyer/show-Delivered-order-of-Seller", {
      sellerID: sellerId,
      userType: userType,
    })
    .then((res) => {
      if (res.data.success === true) {
        console.log(res.data);
        context.setState({ spinnerMove: false, partnerDeliveredOrder: true });
        dispatch({
          type: SHOW_DELIVERED_ORDERS_OF_PARTNER,
          payload: res.data.allDeliveredOrderOfSeller,
        });
        // dispatch({
        //   type: ALERT_MSG,
        //   payload: {
        //     data: res.data,
        //     success: true,
        //     alert: "Partner Delivered Orders",
        //     alertIconName: "check-circle",
        //     alertColor: ALERT_SUCCESS_COLOR
        //   }
        // });
      }

      if (res.data.success === false) {
        // dispatch({
        //   type: ALERT_MSG,
        //   payload: {
        //     data: res.data,
        //     success: true,
        //     alert: "Partner Delivered Orders",
        //     alertIconName: "exclamation-triangle",
        //     alertColor: ALERT_ERROR_COLOR
        //   }
        // });

        context.setState({
          spinnerMove: false,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const markOrderDelivered = (orderID, context) => (dispatch) => {
  console.log(orderID);
  context.setState({ spinnerMove: true });

  axios
    .post(BASE_URL + "order/buyer/delivered-order-by-seller", {
      orderID: orderID,
    })
    .then((res) => {
      console.log(res.data);
      if (res.data.success === true) {
        context.setState({ spinnerMove: false, partnerDeliveredOrder: true });
        dispatch({
          type: ORDER_DELIVERED,
          payload: res.data.allDeliveredOrderOfSeller,
        });
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Order Status",
            alertIconName: "check-circle",
            alertColor: ALERT_SUCCESS_COLOR,
          },
        });
      }

      if (res.data.success === false) {
        context.setState({
          spinnerMove: false,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
