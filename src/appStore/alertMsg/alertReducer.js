import { ALERT_MSG } from "./type";

const state = {
  successResponse: false,
  responseData: {},
  alertTitle: "",
  alertColor: "",
  alertIconName: ""
};

function AlertReducer(mState = { ...state }, action) {
  switch (action.type) {
    case ALERT_MSG:
      mState.successResponse = action.payload.success;
      mState.responseData = action.payload.data;
      mState.alertTitle = action.payload.alert;
      mState.alertColor = action.payload.alertColor;
      mState.alertIconName = action.payload.alertIconName;

      return clone(mState);

    default:
      return clone(mState);
  }
}

const clone = obj => {
  return JSON.parse(JSON.stringify(obj));
};

export default AlertReducer;
