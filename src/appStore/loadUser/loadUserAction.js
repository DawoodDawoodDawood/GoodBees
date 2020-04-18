import { LOAD_USER, RESET_REDUCER } from "./type";

export const loadUserAction = data => dispatch => {
  const state = {
    type: LOAD_USER,
    payload: data
  };
  dispatch(state);
};

export const resetReducer = () => dispatch => {
  console.log("chal ja");
  dispatch({
    type: RESET_REDUCER
  });
};
