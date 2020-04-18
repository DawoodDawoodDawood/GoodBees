import {
  ADD_MEAL,
  UPDATE_MEAL,
  DELETE_MEAL,
  SHOW_ALL_MEALS,
  SHOW_ALL_BREAKFAST,
  SHOW_ALL_LUNCH,
  SHOW_ALL_DINNER
} from "../../actions/types";
import { RESET_REDUCER } from "../../../../appStore/loadUser/type";
const state = {
  SellerSavedMeals: {},
  SellerAllMeals: [],
  SellerAllBreakfast: [],
  SellerAllLunch: [],
  SellerAllDinner: []
};

function MealReducer(mState = { ...state }, action) {
  switch (action.type) {
    case ADD_MEAL:
      if (action.payload.savedMeal.mealType === "DINNER") {
        mState.SellerAllDinner.push(action.payload.savedMeal);
      }
      if (action.payload.savedMeal.mealType === "LUNCH") {
        mState.SellerAllLunch.push(action.payload.savedMeal);
      }
      if (action.payload.savedMeal.mealType === "BREAKFAST") {
        mState.SellerAllBreakfast.push(action.payload.savedMeal);
      }

      mState.SellerAllMeals.push(action.payload.savedMeal);
      return clone(mState);
    case UPDATE_MEAL:
      mState.SellerAllMeals.forEach((list, index) => {
        if (action.payload.ID === list._id) {
          mState.SellerAllMeals[index] = action.payload.response.savedMeal;
        }
      });
      mState.SellerAllBreakfast.forEach((list, index) => {
        if (action.payload.ID === list._id) {
          mState.SellerAllBreakfast[index] = action.payload.response.savedMeal;
        }
      });
      mState.SellerAllLunch.forEach((list, index) => {
        if (action.payload.ID === list._id) {
          mState.SellerAllLunch[index] = action.payload.response.savedMeal;
        }
      });
      mState.SellerAllDinner.forEach((list, index) => {
        if (action.payload.ID === list._id) {
          mState.SellerAllDinner[index] = action.payload.response.savedMeal;
        }
      });
      return clone(mState);

    case DELETE_MEAL:
      let filterAllMealList = mState.SellerAllMeals.filter(
        list => list._id != action.payload._id
      );
      mState.SellerAllMeals = [];

      filterAllMealList.forEach(element => mState.SellerAllMeals.push(element));
      let filterAllMealList1 = mState.SellerAllBreakfast.filter(
        list => list._id != action.payload._id
      );
      mState.SellerAllBreakfast = [];
      filterAllMealList1.forEach(element =>
        mState.SellerAllBreakfast.push(element)
      );

      let filterAllMealList2 = mState.SellerAllLunch.filter(
        list => list._id != action.payload._id
      );
      mState.SellerAllLunch = [];
      filterAllMealList2.forEach(element =>
        mState.SellerAllLunch.push(element)
      );

      let filterAllMealList3 = mState.SellerAllDinner.filter(
        list => list._id != action.payload._id
      );
      mState.SellerAllDinner = [];
      filterAllMealList3.forEach(element =>
        mState.SellerAllDinner.push(element)
      );
      return clone(mState);

    case SHOW_ALL_MEALS:
      mState.SellerAllMeals = [];

      action.payload.forEach(element => {
        mState.SellerAllMeals.push(element);
      });

      return clone(mState);

    case SHOW_ALL_BREAKFAST:
      mState.SellerAllBreakfast = [];

      action.payload.forEach(element => {
        mState.SellerAllBreakfast.push(element);
      });
      return clone(mState);

    case SHOW_ALL_LUNCH:
      mState.SellerAllLunch = [];
      action.payload.forEach(element => {
        mState.SellerAllLunch.push(element);
      });
      return clone(mState);

    case SHOW_ALL_DINNER:
      mState.SellerAllDinner = [];
      action.payload.forEach(element => {
        mState.SellerAllDinner.push(element);
      });
      return clone(mState);
    case RESET_REDUCER:
      mState = {
        SellerSavedMeals: {},
        SellerAllMeals: [],
        SellerAllBreakfast: [],
        SellerAllLunch: [],
        SellerAllDinner: []
      };
      return clone(mState);
    default:
      return clone(mState);
  }
}

const clone = obj => {
  return JSON.parse(JSON.stringify(obj));
};

export default MealReducer;
