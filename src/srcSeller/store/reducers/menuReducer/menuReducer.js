import {
  ADD_MENU,
  SHOW_MENU,
  DELETE_MENU,
  UPDATE_MENU
} from "../../actions/types";

const state = { SavedMenu: [], AddedMenuList: [] };

function MenuReducer(mState = { ...state }, action) {
  switch (action.type) {
    case ADD_MENU:
      mState.AddedMenuList.push(action.payload.savedMenu);

      return clone(mState);

    case SHOW_MENU:
      mState.AddedMenuList = [];
      action.payload.forEach(element => {
        mState.AddedMenuList.push(element);
      });

      return clone(mState);

    case DELETE_MENU:
      let filterAddedMenuList = mState.AddedMenuList.filter(
        list => list._id != action.payload._id
      );
      mState.AddedMenuList = filterAddedMenuList;
      return clone(mState);

    case UPDATE_MENU:
      mState.AddedMenuList.forEach((list, index) => {
        if (list._id === action.payload._id) {
          mState.AddedMenuList[index] = action.payload;
        }
      });
      return clone(mState);

    default:
      return clone(mState);
  }
}

const clone = obj => {
  return JSON.parse(JSON.stringify(obj));
};

export default MenuReducer;
