import { SHOW_ALL_SELLER_TO_PATNER } from "../types";
import { ALERT_MSG } from "../../../../appStore/alertMsg/type";

import { BASE_URL } from "../../../../appStore/BASE_URL";
import axios from "axios";

//PartnerAuth
export const showSellerToPatner = (partnerID, latitude, longitude, context) => (
  dispatch
) => {
  console.log(partnerID, latitude, longitude);
  context.setState({ spinnerMove: true });

  axios
    .post(BASE_URL + "partner/auth/get-nearest-sellers-from-any-location", {
      partnerID: partnerID,
      location: { latitude: latitude, longitude: longitude },
    })
    .then((res) => {
      console.log(res.data);
      if (res.data.success === true) {
        context.setState({ spinnerMove: false });
        dispatch({
          type: SHOW_ALL_SELLER_TO_PATNER,
          payload: res.data.nearestSellers,
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
