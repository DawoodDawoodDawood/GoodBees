import {
  ADD_TO_CART_BUYER,
  SHOW_CART_OF_BUYER,
  DELETE_TO_CART_BUYER,
  DECRIMEMT_PRODUCT_CART,
  INCRIMENT_PRODUCT_CART,
  DELETE_COMPLETE_BUYER_CART,
  MATCH_VOUCHER_CODE
} from "../types";
import { ALERT_MSG } from "../../../../appStore/alertMsg/type";
import { BASE_URL } from "../../../../appStore/BASE_URL";
import axios from "axios";
import {
  ALERT_ERROR_COLOR,
  ALERT_SUCCESS_COLOR
} from "../../../../theme/color";

//BuyerCart

export const matchVoucherCode = (
  buyerID,
  mealID,
  voucherCode,
  context
) => dispatch => {
  console.log(buyerID, mealID, voucherCode);
  context.setState({ spinnerMove: true });
  axios
    .post(BASE_URL + "meal/manage/vouchercode-match-api", {
      buyerID,
      mealID,
      voucherCode
    })
    .then(res => {
      if (res.data.success === true) {
        context.setModalVisible();

        context.setState({ spinnerMove: false, newVoucherCode: "" });
        dispatch({
          type: MATCH_VOUCHER_CODE,
          payload: res.data
        });
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Voucher Code Check",
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
            alert: "Voucher Code Check",
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

export const addToCart = (
  foodType,
  foodId,
  sellerId,
  price,
  quantity,
  buyerId,
  context
) => dispatch => {
  console.log(foodType, foodId, sellerId, price, quantity, buyerId);
  context.setState({ spinnerMove: true });
  axios
    .post(BASE_URL + "order/buyerCart/add-to-cart-buyer", {
      buyerCart: {
        foodItem: {
          foodType: foodType,
          foodID: foodId,
          sellerID: sellerId,
          price: price,
          quantity: quantity
        },
        buyerID: buyerId
      }
    })
    .then(res => {
      if (res.data.success === true) {
        context.setModalVisible();
        // context.props.navigation.navigate("BuyerCartScreen");
        context.setState({ spinnerMove: false });
        dispatch({
          type: ADD_TO_CART_BUYER,
          payload: res.data
        });
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Add To Cart",
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
            alert: "Add To Cart",
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

export const showCartDetail = (buyerId, context) => dispatch => {
  context.setState({ spinnerMove: true });
  axios
    .post(BASE_URL + "order/buyerCart/show-cart-of-Buyer", {
      BuyerID: buyerId
    })
    .then(res => {
      if (res.data.success === true) {
        context.setState({ spinnerMove: false, addedCartList: true });
        dispatch({
          type: SHOW_CART_OF_BUYER,
          payload: res.data.foundCartOfBuyer
        });

        // console.log(res.data);
        // console.log('show added Cart response from action...success');
      }

      if (res.data.success === false) {
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Show Added Cart",
            alertIconName: "exclamation-triangle",
            alertColor: ALERT_ERROR_COLOR
          }
        });

        // console.log(res.data);
        // console.log('show added Cart response from action...failure');
        context.setState({
          spinnerMove: false
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

export const deleteToCart = (buyerCartId, foodId, context) => dispatch => {
  context.setState({ spinnerMove: true });
  axios
    .post(BASE_URL + "order/buyerCart/delete-buyerCart", {
      buyerCartID: buyerCartId,
      foodID: foodId
    })
    .then(res => {
      if (res.data.success === true) {
        context.setState({ spinnerMove: false, cartItemDeleted: true });
        dispatch({
          type: DELETE_TO_CART_BUYER,
          payload: { buyerCartID: buyerCartId, foodID: foodId }
        });
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Delete from Cart",
            alertIconName: "check-circle",
            alertColor: ALERT_SUCCESS_COLOR
          }
        });

        console.log(res.data);
        console.log("Delete from Cart response from action...success");
      }

      if (res.data.success === false) {
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Delete from Cart",
            alertIconName: "exclamation-triangle",
            alertColor: ALERT_ERROR_COLOR
          }
        });

        console.log(res.data);
        console.log("Delete from Cart response from action...failure");
        context.setState({
          spinnerMove: false
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

export const addMenuToCart = (
  foodType,
  foodId,
  sellerId,
  price,
  quantity,
  buyerId,
  context
) => dispatch => {
  context.setState({ spinnerMove: true });
  console.log(foodType, foodId, sellerId, price, quantity, buyerId);
  axios
    .post(BASE_URL + "order/buyerCart/add-to-cart-buyer", {
      buyerCart: {
        foodItem: {
          foodType: foodType,
          foodID: foodId,
          sellerID: sellerId,
          price: price,
          quantity: quantity
        },
        buyerID: buyerId
      }
    })
    .then(res => {
      if (res.data.success === true) {
        context.props.navigation.navigate("BuyerCartScreen");
        context.setState({ spinnerMove: false, addedToCart: true });
        dispatch({
          type: ADD_TO_CART_BUYER,
          payload: res.data
        });
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Add Menu To Cart",
            alertIconName: "check-circle",
            alertColor: ALERT_SUCCESS_COLOR
          }
        });

        console.log(res.data);
        console.log("Add Menu To Cart response from action...success");
      }

      if (res.data.success === false) {
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Add Menu To Cart",
            alertIconName: "exclamation-triangle",
            alertColor: ALERT_ERROR_COLOR
          }
        });

        console.log(res.data);
        console.log("Add Menu To Cart response from action...failure");
        context.setState({
          spinnerMove: false
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};
export const incrimentCartProduct = (cartId, productId) => dispatch => {
  const state = {
    type: INCRIMENT_PRODUCT_CART,
    payload: { cartId: cartId, productId: productId }
  };
  dispatch(state);
};

export const decrimentCartProduct = (cartId, productId) => dispatch => {
  console.log(cartId);
  console.log(productId);
  const state = {
    type: DECRIMEMT_PRODUCT_CART,
    payload: { cartIdd: cartId, productIdd: productId }
  };
  dispatch(state);
};
export const deleteCompleteToCart = (buyerCartId, context) => dispatch => {
  context.setState({ spinnerMove: true });
  axios
    .post(BASE_URL + "order/buyerCart/remove-complete-buyerCart", {
      buyerCartID: buyerCartId
    })
    .then(res => {
      if (res.data.success === true) {
        context.setState({ spinnerMove: false });
        dispatch({
          type: DELETE_COMPLETE_BUYER_CART,
          payload: { buyerCartID: buyerCartId }
        });
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Cart Deleted",
            alertIconName: "check-circle",
            alertColor: ALERT_SUCCESS_COLOR
          }
        });

        console.log(res.data);
        console.log("Delete from Cart response from action...success");
      }

      if (res.data.success === false) {
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Delete from Cart",
            alertIconName: "exclamation-triangle",
            alertColor: ALERT_ERROR_COLOR
          }
        });

        console.log(res.data);
        console.log("Delete from Cart response from action...failure");
        context.setState({
          spinnerMove: false
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};
