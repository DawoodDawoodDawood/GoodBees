import {
  SHOW_ALL_MEALS_TO_BUYER,
  SHOW_BREAKFAST_MEALS_TO_BUYER,
  SHOW_LUNCH_MEALS_TO_BUYER,
  SHOW_DINNER_MEALS_TO_BUYER,
  SHOW_SPECIFIC_SELLER_MEALS_TO_BUYER,
  SHOW_SPECIFIC_SELLER_MENUS_TO_BUYER,
} from '../../actions/types';

const state = {
  buyerAllMeals: [],
  buyerAllBreakFastMeals: [],
  buyerAllLunchMeals: [],
  buyerAllDinnerMeals: [],
  specificSellerMealsforBuyer: [],
  specificSellerMenusforBuyer: [],
};

function ShowMealMenuReducer(mState = {...state}, action) {
  switch (action.type) {
    case SHOW_ALL_MEALS_TO_BUYER:
      mState.buyerAllMeals = [];
      action.payload.forEach(element => {
        mState.buyerAllMeals.push(element);
      });
      return clone(mState);

    case SHOW_BREAKFAST_MEALS_TO_BUYER:
      mState.buyerAllBreakFastMeals = [];
      action.payload.forEach(element => {
        mState.buyerAllBreakFastMeals.push(element);
      });
      return clone(mState);

    case SHOW_LUNCH_MEALS_TO_BUYER:
      mState.buyerAllLunchMeals = [];
      action.payload.forEach(element => {
        mState.buyerAllLunchMeals.push(element);
      });
      return clone(mState);

    case SHOW_DINNER_MEALS_TO_BUYER:
      mState.buyerAllDinnerMeals = [];
      action.payload.forEach(element => {
        mState.buyerAllDinnerMeals.push(element);
      });
      return clone(mState);

    case SHOW_SPECIFIC_SELLER_MEALS_TO_BUYER:
      mState.specificSellerMealsforBuyer = [];
      action.payload.forEach(element => {
        mState.specificSellerMealsforBuyer.push(element);
      });
      console.log(mState.specificSellerMealsforBuyer);
      console.log('show specific seller meals to buyer response from reducer');
      return clone(mState);

    case SHOW_SPECIFIC_SELLER_MENUS_TO_BUYER:
      mState.specificSellerMenusforBuyer = [];
      action.payload.forEach(element => {
        mState.specificSellerMenusforBuyer.push(element);
      });
      console.log(mState.specificSellerMenusforBuyer);
      console.log('show specific seller menus to buyer response from reducer');
      return clone(mState);

    default:
      return clone(mState);
  }
}

const clone = obj => {
  return JSON.parse(JSON.stringify(obj));
};

export default ShowMealMenuReducer;
