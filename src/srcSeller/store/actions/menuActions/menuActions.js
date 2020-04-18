import { ADD_MENU, SHOW_MENU, UPDATE_MENU, DELETE_MENU } from "../types";
import { ALERT_MSG } from "../../../../appStore/alertMsg/type";
import { BASE_URL } from "../../../../appStore/BASE_URL";
import axios from "axios";
import {
  ALERT_SUCCESS_COLOR,
  ALERT_ERROR_COLOR
} from "../../../../theme/color";

export const addMenu = (data, image, context) => dispatch => {
  context.setState({ spinnerMove: true });
  let stringifyData = JSON.stringify(data);
  let formData = new FormData();
  formData.append("data", stringifyData);
  formData.append("menuImages", image);
  console.log(formData);
  axios
    .post(BASE_URL + "menu/manage/add-menu-with-image", formData)
    .then(res => {
      console.log(res.data);
      if (res.data.success === true) {
        context.setState({ spinnerMove: false, menuAdded: true });
        dispatch({
          type: ADD_MENU,
          payload: res.data
        });
        context.setState({ menuAdded: true });
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Add Menu",
            alertIconName: "check-circle",
            alertColor: ALERT_SUCCESS_COLOR
          }
        });
        console.log(res.data);
        // console.log('response of add menu from sucess');
      }

      if (res.data.success === false) {
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Add Menu",
            alertIconName: "exclamation-triangle",
            alertColor: ALERT_ERROR_COLOR
          }
        });
        context.setState({
          spinnerMove: false
        });
        // console.log(res.data);
        // console.log('response of add menu from failure');
      }
    })
    .catch(err => {
      console.log(err);
    });
};

export const showMenu = (sellerId, context) => dispatch => {
  context.setState({ spinnerMove: true });
  axios
    .post(BASE_URL + "menu/manage/show-menu-of-specific-seller", {
      sellerID: sellerId
    })
    .then(res => {
      if (res.data.success === true) {
        context.setState({ spinnerMove: false, menuLoaded: true });
        dispatch({
          type: SHOW_MENU,
          payload: res.data.foundMenu
        });
        // dispatch({
        //   type: ALERT_MSG,
        //   payload: {
        //     data: res.data,
        //     success: true,
        //     alert: "Show Menu",
        //     alertIconName: "check-circle",
        //     alertColor: ALERT_SUCCESS_COLOR
        //   }
        // });
        // console.log(res.data);
        // console.log('response of show menu from sucess');
      }

      if (res.data.success === false) {
        // dispatch({
        //   type: ALERT_MSG,
        //   payload: {
        //     data: res.data,
        //     success: true,
        //     alert: "Show Menu",
        //     alertIconName: "exclamation-triangle",
        //     alertColor: ALERT_ERROR_COLOR
        //   }
        // });
        context.setState({
          spinnerMove: false
        });
        // console.log(res.data);
        // console.log('response of show menu from failure');
      }
    })
    .catch(err => {
      console.log(err.data);
    });
};

export const deleteMenu = (menuId, context) => dispatch => {
  context.setState({ spinnerMove: true });
  axios
    .post(BASE_URL + "menu/manage/delete-menu", {
      menuID: menuId
    })
    .then(res => {
      if (res.data.success === true) {
        context.setState({ spinnerMove: false, menuDeleted: true });
        dispatch({
          type: DELETE_MENU,
          payload: res.data.Deletedmenu
        });
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Delete Menu",
            alertIconName: "check-circle",
            alertColor: ALERT_SUCCESS_COLOR
          }
        });
        // console.log(res.data);
        // console.log('response of delete menu from sucess');
      }

      if (res.data.success === false) {
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Delete Menu",
            alertIconName: "exclamation-triangle",
            alertColor: ALERT_ERROR_COLOR
          }
        });
        context.setState({
          spinnerMove: false
        });
        // console.log(res.data);
        // console.log('response of delete menu from failure');
      }
    })
    .catch(err => {
      console.log(err.data);
    });
};

export const updateMenu = (data, image, context) => dispatch => {
  context.setState({ spinnerMove: true });
  let stringifyData = JSON.stringify(data);
  let formData = new FormData();
  formData.append("data", stringifyData);
  formData.append("menuImages", image);
  console.log(formData);
  axios
    .post(BASE_URL + "menu/manage/update-menu-with-image", formData)
    .then(res => {
      if (res.data.success === true) {
        context.setState({ spinnerMove: false, menuUpdated: true });
        dispatch({
          type: UPDATE_MENU,
          payload: res.data.savedMenu
        });
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Update Menu",
            alertIconName: "check-circle",
            alertColor: ALERT_SUCCESS_COLOR
          }
        });
        context.setState({ menuUpdated: true });
        // console.log(res.data);
        // console.log('response of update menu from sucess');
      }

      if (res.data.success === false) {
        dispatch({
          type: ALERT_MSG,
          payload: {
            data: res.data,
            success: true,
            alert: "Update Menu",
            alertIconName: "exclamation-triangle",
            alertColor: ALERT_ERROR_COLOR
          }
        });
        context.setState({
          spinnerMove: false
        });
        // console.log(res.data);
        // console.log('response of update menu from failure');
      }
    })
    .catch(err => {
      console.log(err.data);
    });
};
