import {
  SHOW_ALL_MEALS_TO_BUYER,
  SHOW_BREAKFAST_MEALS_TO_BUYER,
  SHOW_LUNCH_MEALS_TO_BUYER,
  SHOW_DINNER_MEALS_TO_BUYER,
  SHOW_SPECIFIC_SELLER_MEALS_TO_BUYER,
  SHOW_SPECIFIC_SELLER_MENUS_TO_BUYER
} from "../types";
import { BASE_URL } from "../../../../appStore/BASE_URL";
import axios from "axios";

//Show Meals and Menus to Buyer

export const showAllMealsToBuyer = () => dispatch => {
  axios
    .post(BASE_URL + "meal/manage/show-all-meals-which-active-on-spcific-time")
    .then(res => {
      console.warn(res.data);
      dispatch({
        type: SHOW_ALL_MEALS_TO_BUYER,
        payload: res.data.meals
      });
      console.log(res.data);
      console.log("show all meals to buyer");
    })
    .catch(err => {
      console.log(err);
    });
};

export const showAllBreakFastMealsToBuyer = () => dispatch => {
  axios
    .post(
      BASE_URL + "meal/manage/show-all-breakfast-which-active-on-spcific-time"
    )
    .then(res => {
      dispatch({
        type: SHOW_BREAKFAST_MEALS_TO_BUYER,
        payload: res.data.meals
      });
      // console.log(res.data);
      // console.log('show all breakfasts of buyer');
    })
    .catch(err => {
      console.log(err);
    });
};
export const showAllLunchMealsToBuyer = () => dispatch => {
  axios
    .post(
      BASE_URL + "meal/manage/show-all-lunch-of-which-active-on-spcific-time"
    )
    .then(res => {
      dispatch({
        type: SHOW_LUNCH_MEALS_TO_BUYER,
        payload: res.data.meals
      });
      // console.log(res.data);
      // console.log('show all lunch of buyer');
    })
    .catch(err => {
      console.log(err);
    });
};
export const showAllDinnerMealsToBuyer = () => dispatch => {
  axios
    .post(
      BASE_URL + "meal/manage/show-all-dinner-of-which-active-on-spcific-time"
    )
    .then(res => {
      dispatch({
        type: SHOW_DINNER_MEALS_TO_BUYER,
        payload: res.data.meals
      });
      // console.log(res.data);
      // console.log('show all dinner of buyer');
    })
    .catch(err => {
      console.log(err);
    });
};

export const showSpecificSellerMealsToBuyer = sellerId => dispatch => {
  console.log(sellerId);
  axios
    .post(
      BASE_URL +
        "meal/manage/show-all-meals-of-specific-seller-active-on-spcific-time",
      { sellerID: sellerId }
    )
    .then(res => {
      console.log(res.data);
      dispatch({
        type: SHOW_SPECIFIC_SELLER_MEALS_TO_BUYER,
        payload: res.data.meals
      });
      // console.log(res.data);
      // console.log('show specific seller meals to buyer response from action');
    })
    .catch(err => {
      console.log(err);
    });
};

export const showSpecificSellerMenusToBuyer = sellerId => dispatch => {
  axios
    .post(BASE_URL + "menu/manage/show-menu-of-specific-seller", {
      sellerID: sellerId
    })
    .then(res => {
      dispatch({
        type: SHOW_SPECIFIC_SELLER_MENUS_TO_BUYER,
        payload: res.data.foundMenu
      });
      // console.log(res.data);
      // console.log('show specific seller menus to buyer response from action');
    })
    .catch(err => {
      console.log(err);
    });
};
