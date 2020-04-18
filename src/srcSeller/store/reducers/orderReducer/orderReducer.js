import {
  SHOW_BOOKED_ORDERS_OF_BUYER,
  SHOW_BOOKED_ORDERS_OF_PARTNER,
  SHOW_DELIVERED_ORDERS_OF_BUYER,
  SHOW_DELIVERED_ORDERS_OF_PARTNER,
  ORDER_DELIVERED,
} from "../../actions/types";

const state = {
  BookedOrdersOfBuyer: [],
  BookedOrdersOfPartner: [],
  DeliveredOrersOfBuyer: [],
  DeliveredOrersOfPartner: [],
};

function OrderReducer(mState = { ...state }, action) {
  switch (action.type) {
    case SHOW_BOOKED_ORDERS_OF_BUYER:
      mState.BookedOrdersOfBuyer = [];
      action.payload.forEach((element) => {
        mState.BookedOrdersOfBuyer.push(element);
      });
      console.log(mState.BookedOrdersOfBuyer);
      console.log(
        "buyer all booked order response from reducer after assigning"
      );
      return clone(mState);

    case SHOW_BOOKED_ORDERS_OF_PARTNER:
      mState.BookedOrdersOfPartner = [];
      action.payload.forEach((element) => {
        mState.BookedOrdersOfPartner.push(element);
      });
      console.log(mState.BookedOrdersOfPartner);

    // case ORDER_DELIVERED:

    //   return clone(mState);

    case SHOW_DELIVERED_ORDERS_OF_BUYER:
      mState.DeliveredOrersOfBuyer = [];
      action.payload.forEach((element) => {
        mState.DeliveredOrersOfBuyer.push(element);
      });

      return clone(mState);

    case SHOW_DELIVERED_ORDERS_OF_PARTNER:
      mState.DeliveredOrersOfPartner = [];
      action.payload.forEach((element) => {
        mState.DeliveredOrersOfPartner.push(element);
      });

      return clone(mState);

    default:
      return clone(mState);
  }
}

const clone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export default OrderReducer;
