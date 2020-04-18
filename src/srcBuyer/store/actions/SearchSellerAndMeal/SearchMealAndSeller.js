import { SEARCH_SELLER } from "../types";
import { BASE_URL } from "../../../../appStore/BASE_URL";
import axios from "axios";

//Show Meals and Menus to Buyer

export const searchNearestSeller = (buyerID, longitude, latitude, context) => (
  dispatch
) => {
  console.log(buyerID, longitude, latitude);
  axios
    .post(
      BASE_URL + "seller/auth/get-nearest-sellers-from-any-location",

      {
        buyerID: buyerID,
        location: {
          latitude: latitude,
          longitude: longitude,
        },
      }
    )
    .then((res) => {
      console.log(res.data);
      context.setState({ array: res.data.nearestSellers });
      dispatch({
        type: SEARCH_SELLER,
        payload: res.data.nearestSellers,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
