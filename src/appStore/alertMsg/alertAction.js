import { ALERT_MSG } from "./type";

export const alertMsgAction = () => dispatch => {
  const state = {
    type: ALERT_MSG,
    payload: { data: "", success: false }
  };
  dispatch(state);
};

export const alertMsgActionForComponents = data => dispatch => {
  const state = {
    type: ALERT_MSG,
    payload: data
  };
  dispatch(state);
};
