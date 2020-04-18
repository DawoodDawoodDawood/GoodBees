import { BUYER_ORDER_HISTORY, BOOKED_ORDER_BUYER } from "../../actions/types";

const state = {
  orderHistory: [],
  orderedMeal: []
};

function OrderReducer(mState = { ...state }, action) {
  switch (action.type) {
    case BUYER_ORDER_HISTORY:
      mState.orderHistory = [];
      if (action.payload.allDeliveredOrderOfBuyer.length > 0) {
        action.payload.allDeliveredOrderOfBuyer.forEach(element => {
          mState.orderHistory.push(element);
        });
      } else {
        mState.orderHistory = [];
      }

      return clone(mState);
    case BOOKED_ORDER_BUYER:
      console.log(action.payload.allBookedOrderOfBuyer);
      mState.orderedMeal = [];
      if (action.payload.allBookedOrderOfBuyer.length > 0) {
        action.payload.allBookedOrderOfBuyer.forEach(element => {
          mState.orderedMeal.push(element);
        });
      } else {
        mState.orderedMeal = [];
      }

      return clone(mState);
    default:
      return clone(mState);
  }
}

const clone = obj => {
  return JSON.parse(JSON.stringify(obj));
};

export default OrderReducer;
