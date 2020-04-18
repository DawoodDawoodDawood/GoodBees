import {
  PLACE_ORDER,
  ODERLINE_PREPARE,
  BUYER_ORDER_HISTORY,
  BOOKED_ORDER_BUYER,
  DELIVERED_ORDER_BUYER
} from "../types";
import { ALERT_MSG } from "../../../../appStore/alertMsg/type";
import { BASE_URL } from "../../../../appStore/BASE_URL";
import axios from "axios";
import {
  ALERT_ERROR_COLOR,
  ALERT_SUCCESS_COLOR
} from "../../../../theme/color";

//Buyer order:
export const orderHstoryBuyer = (buyerID, context) => dispatch => {
  console.log(buyerID);
  context.setState({ spinnerMove: true });
  axios
    .post(BASE_URL + "order/buyer/show-Delivered-order-of-buyer", {
      buyerID: buyerID
    })
    .then(res => {
      console.log(res.data);
      if (res.data.success === true) {
        console.log(res.data);

        dispatch({
          type: BUYER_ORDER_HISTORY,
          payload: res.data
        });

        context.setState({ spinnerMove: false });
      }

      if (res.data.success === false) {
        // context.onModalPress();
        // dispatch({
        //   type: ALERT_MSG,
        //   payload: {
        //     data: res.data,
        //     success: true,
        //     alert: "No Pervious Order",
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
      console.log(err);
    });
};

//ORDERED MEAL:
export const orderedMealOfBuyer = (buyerID, context) => dispatch => {
  console.log(buyerID);
  context.setState({ spinnerMove: true });
  axios
    .post(BASE_URL + "order/buyer/show-booked-order-of-buyer", {
      buyerID: buyerID
    })
    .then(res => {
      console.log(res.data);
      if (res.data.success === true) {
        console.log(res.data);

        dispatch({
          type: BOOKED_ORDER_BUYER,
          payload: res.data
        });

        context.setState({ spinnerMove: false });
      }

      if (res.data.success === false) {
        // context.onModalPress();
        // dispatch({
        //   type: ALERT_MSG,
        //   payload: {
        //     data: res.data,
        //     success: true,
        //     alert: "No Pervious Order",
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
      console.log(err);
    });
};
//BuyerCart
export const orderLinePrePaper = data => dispatch => {
  console.log(data);
  dispatch({
    type: ODERLINE_PREPARE,
    payload: data
  });
};

export const placeOrder = (data, context) => dispatch => {
  console.log(data);
  context.setState({ spinnerMove: true });
  axios
    .post(BASE_URL + "order/buyer/place-order-buyer", {
      order: {
        buyerCartID: data.buyerCartID,
        buyerID: data.buyerID,
        sellerID: data.sellerID,
        totalPrice: data.totalPrice,
        deliveryCharges: data.deliveryCharges,
        delivery: data.delivery,
        selfPickUp: data.selfPickUp,
        deliveryDetails: data.deliveryDetails,
        timeOfDelivery: data.timeOfDelivery,
        orderLine: data.orderLine
      }
    })
    .then(res => {
      if (res.data.success === true) {
        console.log(res.data);
        context.onModalPress();

        dispatch({
          type: PLACE_ORDER,
          payload: data.buyerCartID
        });
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Order Successfull",
            alertIconName: "check-circle",
            alertColor: ALERT_SUCCESS_COLOR
          }
        });
        context.setState({ spinnerMove: false });
      }

      if (res.data.success === false) {
        context.onModalPress();
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Order Not Completed",
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
