import {
  LOAD_USER,
  RESET_REDUCER,
  SELLER_BUYER_FCTOKEN,
  PATNER_FCTOKEN
} from "./type";
import axios from "axios";
import { BASE_URL } from "../BASE_URL";
export const SellerBuyerFCToken = data => dispatch => {
  axios
    .post(BASE_URL + "token/manage/update-fcToken", {
      token: data
    })
    .then(res => {
      console.log(res.data);
      if (res.data.success === true) {
        console.log(res.data.result);
        dispatch({
          type: SELLER_BUYER_FCTOKEN,
          payload: res.data
        });
      }
      if (res.data.success === false) {
      }
    })
    .catch(err => {
      console.log(err);
    });
};

export const PatnerFCToken = data => dispatch => {
  axios
    .post(BASE_URL + "token/manage/update-fcToken-partner", {
      token: data
    })
    .then(res => {
      if (res.data.success === true) {
        dispatch({
          type: PATNER_FCTOKEN,
          payload: res.data
        });
      }
      if (res.data.success === false) {
      }
    })
    .catch(err => {
      console.log(err.data);
    });
};
