import {
  ADD_MEAL,
  UPDATE_MEAL,
  DELETE_MEAL,
  SHOW_ALL_MEALS,
  SHOW_ALL_BREAKFAST,
  SHOW_ALL_LUNCH,
  SHOW_ALL_DINNER,
} from "../types";
import { ALERT_MSG } from "../../../../appStore/alertMsg/type";
import { BASE_URL } from "../../../../appStore/BASE_URL";
import axios from "axios";
import {
  ALERT_SUCCESS_COLOR,
  ALERT_ERROR_COLOR,
} from "../../../../theme/color";

export const updateMeal = (data, image, context) => (dispatch) => {
  console.log(data);
  context.setState({ saveSpin: true });
  let stringifyData = JSON.stringify(data);
  let formData = new FormData();
  formData.append("data", stringifyData);
  formData.append("mealImages", image);
  console.log(formData);
  axios
    .post(BASE_URL + "meal/manage/update-meal-with-image", formData)
    .then((res) => {
      context.setState({ saveSpin: false });

      if (res.data.success === true) {
        dispatch({
          type: UPDATE_MEAL,
          payload: { response: res.data, ID: data._id },
        });
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Update Meal",
            alertIconName: "check-circle",
            alertColor: ALERT_SUCCESS_COLOR,
          },
        });

        context.props.navigation.navigate("SellerAllMealScreen");
        // console.log(res.data);
        // console.log('response of add meal from action...success');
      }

      if (res.data.success === false) {
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Add Meal",
            alertIconName: "exclamation-triangle",
            alertColor: ALERT_ERROR_COLOR,
          },
        });
        context.setState({
          spinnerMove: false,
        });
        // console.log(res.data);
        // console.log('response of add meal from action...failure');
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addMeal = (data, image, context) => (dispatch) => {
  context.setState({ spinnerMove: true });
  let stringifyData = JSON.stringify(data);
  let formData = new FormData();
  formData.append("data", stringifyData);
  formData.append("mealImages", image);
  console.log(formData);
  axios
    .post(BASE_URL + "meal/manage/add-meal-with-image", formData)
    .then((res) => {
      console.log(res.data);
      if (res.data.success === true) {
        context.setState({ spinnerMove: false, mealAdded: true });
        dispatch({
          type: ADD_MEAL,
          payload: res.data,
        });
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Add Meal",
            alertIconName: "check-circle",
            alertColor: ALERT_SUCCESS_COLOR,
          },
        });
      }

      if (res.data.success === false) {
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Add Meal",
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
      console.log(err);
    });
};

export const deleteMeal = (mealId, context) => (dispatch) => {
  context.setState({ spin: true });

  axios
    .post(BASE_URL + "meal/manage/delete-meal", {
      mealID: mealId,
    })
    .then((res) => {
      if (res.data.success === true) {
        context.setState({ spin: false, mealDeleted: true });
        dispatch({
          type: DELETE_MEAL,
          payload: res.data.DeletedMeal,
        });
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Delete Meal",
            alertIconName: "check-circle",
            alertColor: ALERT_SUCCESS_COLOR,
          },
        });
      }

      if (res.data.success === false) {
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Delete Meal",
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

export const showAllMeals = (sellerId, context) => (dispatch) => {
  context.setState({ spinnerMove: true });

  axios
    .post(BASE_URL + "meal/manage/show-meals-of-specific-seller", {
      sellerID: sellerId,
    })
    .then((res) => {
      console.log(res.data);
      if (res.data.success === true) {
        context.setState({ spinnerMove: false, allMealsLoaded: true });
        dispatch({
          type: SHOW_ALL_MEALS,
          payload: res.data.foundMeals,
        });
      }

      if (res.data.success === false) {
        context.setState({
          spinnerMove: false,
          noMealAvaible: true,
        });
        dispatch({
          type: SHOW_ALL_MEALS,
          payload: [],
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const showAllBreakfast = (sellerId, context) => (dispatch) => {
  context.setState({ spinnerMove: true });
  axios
    .post(BASE_URL + "meal/manage/show-all-breakfast-of-specific-seller", {
      sellerID: sellerId,
    })
    .then((res) => {
      if (res.data.success === true) {
        context.setState({ spinnerMove: false, allBreakfastLoaded: true });
        dispatch({
          type: SHOW_ALL_BREAKFAST,
          payload: res.data.foundMeals,
        });
      }

      if (res.data.success === false) {
        context.setState({
          spinnerMove: false,
          noBreakFastAvailable: true,
        });
        dispatch({
          type: SHOW_ALL_BREAKFAST,
          payload: {},
        });
      }
    })
    .catch((err) => {
      console.log(err.data);
    });
};

export const showAllLunch = (sellerId, context) => (dispatch) => {
  context.setState({ spinnerMove: true });
  axios
    .post(BASE_URL + "meal/manage/show-all-lunch-of-specific-seller", {
      sellerID: sellerId,
    })
    .then((res) => {
      if (res.data.success === true) {
        context.setState({ spinnerMove: false, allLunchLoaded: true });
        dispatch({
          type: SHOW_ALL_LUNCH,
          payload: res.data.foundMeals,
        });
      }

      if (res.data.success === false) {
        context.setState({
          spinnerMove: false,
          noLunchAvailable: true,
        });
        dispatch({
          type: SHOW_ALL_LUNCH,
          payload: {},
        });
      }
    })
    .catch((err) => {
      console.log(err.data);
    });
};

export const showAllDinner = (sellerId, context) => (dispatch) => {
  context.setState({ spinnerMove: true });
  axios
    .post(BASE_URL + "meal/manage/show-all-dinner-of-specific-seller", {
      sellerID: sellerId,
    })
    .then((res) => {
      if (res.data.success === true) {
        context.setState({ spinnerMove: false, allDinnerLoaded: true });
        dispatch({
          type: SHOW_ALL_DINNER,
          payload: res.data.foundMeals,
        });
      }

      if (res.data.success === false) {
        context.setState({
          spinnerMove: false,
          noDinnerAvailable: true,
        });
      }
    })
    .catch((err) => {
      console.log(err.data);
    });
};
