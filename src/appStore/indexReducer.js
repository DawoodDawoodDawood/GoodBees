import { combineReducers } from "redux";

//Common Reducers
import AlertMsgReducer from "../appStore/alertMsg/alertReducer";
import LoadUserReducer from "../appStore/loadUser/loadUserReducer";

//Seller Reducers
import SellerAuthReducer from "../srcSeller/store/reducers/authReducer/authReducer";
import SellerAddMenuReducer from "../srcSeller/store/reducers/menuReducer/menuReducer";
import SellerMealReducer from "../srcSeller/store/reducers/mealReducer/mealReducer";
import SellerOrderReducer from "../srcSeller/store/reducers/orderReducer/orderReducer";
import AssociatedPatnerReducerSellerSide from "../srcSeller/store/reducers/associatedPatnerReducer/associatedPatnerReducer";
//Buyer Reducers
import BuyerAuthReducer from "../srcBuyer/store/reducers/authReducer/authReducer";
import BuyerMealMenuReducer from "../srcBuyer/store/reducers/meal_menuReducer/meal_menuReducer";
import BuyerCartReducer from "../srcBuyer/store/reducers/cartReducer/cartReducer";
import BuyerOrderReducer from "../srcBuyer/store/reducers/orderReducer/orderReducer";
import BuyerSearchMealAndSeller from "../srcBuyer/store/reducers/SearchMealAndSeller/SearchMealAndSeller";
import BuyerBroadCastReducer from "../srcBuyer/store/reducers/BroadCastReducer/broadCastReducer";
//Patner Reducer
import PartnerAuthReducer from "../srcPartner/store/reducers/authReducer/authReducer";
import ShowAllSellerAndFoodReducer from "../srcPartner/store/reducers/productReducers/showAllSellerAndFoodReducer";
import BroadCastFromPatnerToBuyer from "../srcPartner/store/reducers/BroadcastReducer/BroadcastToBuyerReducer";
import SellerConnectionReducer from "../srcPartner/store/reducers/sellerConnectionReducer/sellerConnectionReducer";

const rootReducer = combineReducers({
  //Common Reducers
  AlertMsgReducer,
  LoadUserReducer,

  //Seller Reducers
  SellerAuthReducer,
  SellerAddMenuReducer,
  SellerMealReducer,
  SellerOrderReducer,
  AssociatedPatnerReducerSellerSide,
  //Buyer Reducers
  BuyerAuthReducer,
  BuyerMealMenuReducer,
  BuyerCartReducer,
  BuyerOrderReducer,
  BuyerSearchMealAndSeller,
  BuyerBroadCastReducer,
  //Patner Reducer
  PartnerAuthReducer,
  ShowAllSellerAndFoodReducer,
  BroadCastFromPatnerToBuyer,
  SellerConnectionReducer
});
export default rootReducer;
