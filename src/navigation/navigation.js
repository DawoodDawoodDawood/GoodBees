import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";

// Common Screens
import SplashScreen from "./splashScreen";
import MainScreen from "./mainScreen";

// Seller Screens
//Seller Auth Screens
import SellerLoginScreen from "../srcSeller/screens/sellerScreens/authScreens/loginScreen";
import SellerSignUpScreen from "../srcSeller/screens/sellerScreens/authScreens/registerScreen";
import SellerProfileScreen from "../srcSeller/screens/sellerScreens/authScreens/sellerProfileScreen";
import SellerForgetPasswordScreen from "../srcSeller/screens/sellerScreens/authScreens/forgetPasswordScreen";
import SellerCodeVerificationScreen from "../srcSeller/screens/sellerScreens/authScreens/codeVerificationScreen";
import SellerRecoverPasswordScreen from "../srcSeller/screens/sellerScreens/authScreens/recoverPasswordScreen";

//Seller Other Screens
import SellerEditInfoScreen from "../srcSeller/screens/sellerScreens/editInfoScreen";
import SellerDrawerScreen from "../srcSeller/screens/sellerScreens/drawerScreen";
import SellerAllMealScreen from "../srcSeller/screens/sellerScreens/allMealScreen";
import SellerMenuListScreen from "../srcSeller/screens/sellerScreens/menuListScreen";
import SellerAddMenuScreen from "../srcSeller/screens/sellerScreens/addMenuScreen";
import SellerAddMealScreen from "../srcSeller/screens/sellerScreens/addMealScreen";
import SellerOrderFromBuyerScreen from "../srcSeller/screens/sellerScreens/orderFromBuyerScreen";
import SellerOrderFromPatnerScreen from "../srcSeller/screens/sellerScreens/orderFromPatnerScreen";
import OrderDeailScreenSeller from "../srcSeller/screens/sellerScreens/ordeDetailScreen";
import AssociatedPatnerList from "../srcSeller/screens/sellerScreens/associatedPatnerList";
// Buyer Screens
//Buyer Auth Screens
import BuyerLoginScreen from "../srcBuyer/screens/buyerScreens/authScreens/loginScreen";
import BuyerSignUpScreen from "../srcBuyer/screens/buyerScreens/authScreens/registerScreen";
import BuyerProfileScreen from "../srcBuyer/screens/buyerScreens/authScreens/buyerProfileScreen";
import BuyerForgetPasswordScreen from "../srcBuyer/screens/buyerScreens/authScreens/forgetPasswordScreen";
import BuyerCodeVerificationScreen from "../srcBuyer/screens/buyerScreens/authScreens/codeVerificationScreen";
import BuyerRecoverPasswordScreen from "../srcBuyer/screens/buyerScreens/authScreens/recoverPasswordScreen";
//Buyer Cart Screens
import BuyerFirstCartScreen from "../srcBuyer/screens/buyerScreens/cartScreens/stepOne";

import BuyerCartScreen from "../srcBuyer/screens/buyerScreens/cartScreens/BuyerCartScreen";
import BuyerCartSummaryScreen from "../srcBuyer/screens/buyerScreens/cartScreens/BuyerCartSummaryScreen";
//Buyer Search Location Screens
import BuyerSearchMealScreen from "../srcBuyer/screens/buyerScreens/SearchMeal/BuyerSearchMealScreen";
import BuyerAllMealListScreen from "../srcBuyer/screens/buyerScreens/SearchMeal/BuyerAllMealListScreen";
//Buyer Other Screens
import BuyerOrderPlacementScreen from "../srcBuyer/screens/buyerScreens/orderPlacementScreen";
import Buyer_SearchSellerScreen from "../srcBuyer/screens/buyerScreens/SearchSeller/searchSellerScreen";
import Buyer_NearestSellerList from "../srcBuyer/screens/buyerScreens/SearchSeller/nearestSellerList";
import BuyerSideSpecificSellerMealsMenusScreen from "../srcBuyer/screens/buyerScreens/SearchSeller/specificSellerMealsMenus";
import BuyerConfirmOrderScreen from "../srcBuyer/screens/buyerScreens/confirmOrderScreen";
import BuyerOrderedMealScreen from "../srcBuyer/screens/buyerScreens/orderedMealScreen";
import BuyerOrderHistoryScreen from "../srcBuyer/screens/buyerScreens/orderHistoryScreen";
import BuyerShowInterestScreen from "../srcBuyer/screens/buyerScreens/showInterestScreen";
import BuyerInterestTrayScreen from "../srcBuyer/screens/buyerScreens/interestTrayScreen";
import BuyerNotificationTrayScreen from "../srcBuyer/screens/buyerScreens/notificationTrayScreen";
import BuyerEditInfoScreen from "../srcBuyer/screens/buyerScreens/editInfoScreen";
import BuyerDrawerScreen from "../srcBuyer/screens/buyerScreens/drawerScreen";

// Partner Screens
//Partner Auth Screens
import PartnerLoginScreen from "../srcPartner/screens/partnerScreens/authScreens/loginScreen";
import PartnerSignUpScreen from "../srcPartner/screens/partnerScreens/authScreens/registerScreen";
import PartnerProfileScreen from "../srcPartner/screens/partnerScreens/authScreens/partnerProfileScreen";
import PartnerForgetPasswordScreen from "../srcPartner/screens/partnerScreens/authScreens/forgetPasswordScreen";
import PartnerCodeVerificationScreen from "../srcPartner/screens/partnerScreens/authScreens/codeVerificationScreen";
import PartnerRecoverPasswordScreen from "../srcPartner/screens/partnerScreens/authScreens/recoverPasswordScreen";
//Partner Checkout Screens
import PartnerCheckoutFirstScreen from "../srcPartner/screens/partnerScreens/checkoutScreens/firstScreen";
import PartnerCheckoutSecondScreen from "../srcPartner/screens/partnerScreens/checkoutScreens/secondScreen";
import PartnerCheckoutSummaryScreen from "../srcPartner/screens/partnerScreens/checkoutScreens/summaryScreen";
//Partner Other Screens
import PartnerAddToCartScreen from "../srcPartner/screens/partnerScreens/specificSellersMealAndMenu";
import PartnerDrawerScreen from "../srcPartner/screens/partnerScreens/drawerScreen";
import PartnerEditInfoScreen from "../srcPartner/screens/partnerScreens/editInfoScreen";
import PartnerHoldAndExpressedScreen from "../srcPartner/screens/partnerScreens/holdAndExpressedSreen";
import PartnerHoldAndWaitingScreen from "../srcPartner/screens/partnerScreens/holdAndWaitingScreen";
import PartnerHoldOrderScreen from "../srcPartner/screens/partnerScreens/holdOrderScreen";
import PartnerOrderHistoryScreen from "../srcPartner/screens/partnerScreens/orderHistoryScreen";
import PartnerOrderTrackingScreen from "../srcPartner/screens/partnerScreens/orderTrackingScreen";
import PartnerSearchSellerByLocationScreen from "../srcPartner/screens/partnerScreens/searchSellerByLocationScreen";
import FriendRequestList from "../srcPartner/screens/partnerScreens/friendRequestList";
import LinkedSeller from "../srcPartner/screens/partnerScreens/linkedSellerList";
const SellerOrganizationStackNavigator = createStackNavigator(
  {
    SellerAddMenuScreen: { screen: SellerAddMenuScreen },
    SellerOrderFromBuyerScreen: { screen: SellerOrderFromBuyerScreen },
    SellerOrderFromPatnerScreen: { screen: SellerOrderFromPatnerScreen },
    OrderDeailScreenSeller: { screen: OrderDeailScreenSeller },
    SellerEditInfoScreen: { screen: SellerEditInfoScreen },
    SellerMenuListScreen: { screen: SellerMenuListScreen },
  },
  {
    initialRouteName: "SellerMenuListScreen",
    headerMode: "none",
  }
);

//Seller Drawer Screens
const SellerOrganizationAppDrawer = createDrawerNavigator(
  {
    SellerMenuListScreen: { screen: SellerMenuListScreen },

    SellerOrderFromBuyerScreen: { screen: SellerOrderFromBuyerScreen },
    SellerOrderFromPatnerScreen: { screen: SellerOrderFromPatnerScreen },
    SellerEditInfoScreen: { screen: SellerEditInfoScreen },
    SellerLoginScreen: { screen: SellerLoginScreen },
  },
  {
    contentComponent: SellerDrawerScreen,
    initialRouteName: "SellerMenuListScreen",
    headerMode: "none",
  }
);
//Seller Stack Screens
const SellerStackNavigator = createStackNavigator(
  {
    SellerAddMealScreen: { screen: SellerAddMealScreen },
    SellerAddMenuScreen: { screen: SellerAddMenuScreen },
    SellerOrderFromBuyerScreen: { screen: SellerOrderFromBuyerScreen },
    SellerOrderFromPatnerScreen: { screen: SellerOrderFromPatnerScreen },
    OrderDeailScreenSeller: { screen: OrderDeailScreenSeller },
    SellerEditInfoScreen: { screen: SellerEditInfoScreen },
    SellerMenuListScreen: { screen: SellerMenuListScreen },
    SellerAllMealScreen: { screen: SellerAllMealScreen },
    AssociatedPatnerList: { screen: AssociatedPatnerList },
  },
  {
    initialRouteName: "SellerAllMealScreen",
    headerMode: "none",
  }
);

//Seller Drawer Screens
const SellerAppDrawer = createDrawerNavigator(
  {
    SellerAllMealScreen: { screen: SellerStackNavigator },
    SellerMenuListScreen: { screen: SellerMenuListScreen },

    SellerOrderFromBuyerScreen: { screen: SellerOrderFromBuyerScreen },
    SellerOrderFromPatnerScreen: { screen: SellerOrderFromPatnerScreen },
    SellerEditInfoScreen: { screen: SellerEditInfoScreen },
    SellerLoginScreen: { screen: SellerLoginScreen },
    AssociatedPatnerList: { screen: AssociatedPatnerList },
  },
  {
    contentComponent: SellerDrawerScreen,
    initialRouteName: "SellerAllMealScreen",
    headerMode: "none",
  }
);

//Seller Switch Screens
const SellerAuthSwitchNavigator = createStackNavigator(
  {
    SellerLoginScreen: { screen: SellerLoginScreen },
    SellerSignUpScreen: { screen: SellerSignUpScreen },
    SellerProfileScreen: { screen: SellerProfileScreen },
    SellerForgetPasswordScreen: { screen: SellerForgetPasswordScreen },
    SellerCodeVerificationScreen: { screen: SellerCodeVerificationScreen },
    SellerRecoverPasswordScreen: { screen: SellerRecoverPasswordScreen },
  },
  {
    initialRouteName: "SellerLoginScreen",
    headerMode: "none",
  }
);

//Buyer Stack Screens
const BuyerStackNavigator = createStackNavigator(
  {
    BuyerFirstCartScreen: { screen: BuyerFirstCartScreen },
    BuyerInterestTrayScreen: { screen: BuyerInterestTrayScreen },
    BuyerCartSummaryScreen: { screen: BuyerCartSummaryScreen },
    Buyer_NearestSellerList: { screen: Buyer_NearestSellerList },
    BuyerCartScreen: { screen: BuyerCartScreen },
    BuyerAllMealListScreen: { screen: BuyerAllMealListScreen },
    BuyerSideSpecificSellerMealsMenusScreen: {
      screen: BuyerSideSpecificSellerMealsMenusScreen,
    },
    OrderDeailScreenSeller: { screen: OrderDeailScreenSeller },
    BuyerOrderPlacementScreen: { screen: BuyerOrderPlacementScreen },
    BuyerSearchMealScreen: { screen: BuyerSearchMealScreen },
    Buyer_SearchSellerScreen: { screen: Buyer_SearchSellerScreen },
  },
  {
    initialRouteName: "BuyerAllMealListScreen",
    headerMode: "none",
  }
);

//Buyer Drawer Screens
const BuyerAppDrawer = createDrawerNavigator(
  {
    BuyerAllMealListScreen: { screen: BuyerStackNavigator },
    BuyerOrderHistoryScreen: { screen: BuyerOrderHistoryScreen },
    BuyerNotificationTrayScreen: { screen: BuyerNotificationTrayScreen },
    Buyer_NearestSellerList: { screen: Buyer_NearestSellerList },
    BuyerCartScreen: { screen: BuyerCartScreen },
    BuyerEditInfoScreen: { screen: BuyerEditInfoScreen },
    BuyerOrderedMealScreen: { screen: BuyerOrderedMealScreen },
    Buyer_SearchSellerScreen: { screen: Buyer_SearchSellerScreen },
  },
  {
    contentComponent: BuyerDrawerScreen,
    initialRouteName: "BuyerAllMealListScreen",
    headerMode: "none",
  }
);

//Buyer Switch Screens
const BuyerAuthSwitchNavigator = createStackNavigator(
  {
    BuyerLoginScreen: { screen: BuyerLoginScreen },
    BuyerSignUpScreen: { screen: BuyerSignUpScreen },
    BuyerProfileScreen: { screen: BuyerProfileScreen },
    BuyerForgetPasswordScreen: { screen: BuyerForgetPasswordScreen },
    BuyerCodeVerificationScreen: { screen: BuyerCodeVerificationScreen },
    BuyerRecoverPasswordScreen: { screen: BuyerRecoverPasswordScreen },
  },
  {
    initialRouteName: "BuyerLoginScreen",
    headerMode: "none",
  }
);
//Partner Stack Screens
const PartnerStackNavigator = createStackNavigator(
  {
    PartnerSearchSellerByLocationScreen: {
      screen: PartnerSearchSellerByLocationScreen,
    },
    PartnerCheckoutFirstScreen: { screen: PartnerCheckoutFirstScreen },
    PartnerCheckoutSecondScreen: { screen: PartnerCheckoutSecondScreen },
    PartnerCheckoutSummaryScreen: { screen: PartnerCheckoutSummaryScreen },
    PartnerAddToCartScreen: { screen: PartnerAddToCartScreen },
    PartnerEditInfoScreen: { screen: PartnerEditInfoScreen },
    PartnerHoldAndExpressedScreen: { screen: PartnerHoldAndExpressedScreen },
    PartnerHoldAndWaitingScreen: { screen: PartnerHoldAndWaitingScreen },
    PartnerHoldOrderScreen: { screen: PartnerHoldOrderScreen },
    PartnerOrderHistoryScreen: { screen: PartnerOrderHistoryScreen },
    PartnerOrderTrackingScreen: { screen: PartnerOrderTrackingScreen },
    FriendRequestList: { screen: FriendRequestList },
    LinkedSeller: { screen: LinkedSeller },
  },
  {
    initialRouteName: "PartnerSearchSellerByLocationScreen",
    headerMode: "none",
  }
);

//Partner Drawer Screens
const PartnerAppDrawer = createDrawerNavigator(
  {
    PartnerSearchSellerByLocationScreen: {
      screen: PartnerStackNavigator,
    },
    PartnerCheckoutFirstScreen: { screen: PartnerCheckoutFirstScreen },
    PartnerHoldAndExpressedScreen: { screen: PartnerHoldAndExpressedScreen },
    PartnerHoldAndWaitingScreen: { screen: PartnerHoldAndWaitingScreen },
    PartnerOrderHistoryScreen: { screen: PartnerOrderHistoryScreen },
    FriendRequestList: { screen: FriendRequestList },
    LinkedSeller: { screen: LinkedSeller },
  },
  {
    initialRouteName: "PartnerSearchSellerByLocationScreen",
    contentComponent: PartnerDrawerScreen,
    headerMode: "none",
  }
);

//Partner Switch Screens
const PartnerAuthSwitchNavigator = createStackNavigator(
  {
    PartnerLoginScreen: { screen: PartnerLoginScreen },
    PartnerSignUpScreen: { screen: PartnerSignUpScreen },
    PartnerProfileScreen: { screen: PartnerProfileScreen },
    PartnerForgetPasswordScreen: { screen: PartnerForgetPasswordScreen },
    PartnerCodeVerificationScreen: { screen: PartnerCodeVerificationScreen },
    PartnerRecoverPasswordScreen: { screen: PartnerRecoverPasswordScreen },
  },
  {
    initialRouteName: "PartnerLoginScreen",
    headerMode: "none",
  }
);
const AppStartNavigator = createSwitchNavigator(
  {
    SplashScreen: { screen: SplashScreen },
    MainScreen: { screen: MainScreen },
  },
  {
    initialRouteName: "SplashScreen",
    headerMode: "none",
  }
);
const AppNavigator = createStackNavigator(
  {
    AppStartNavigator: { screen: AppStartNavigator },
    SellerAuthScreens: { screen: SellerAuthSwitchNavigator },
    SellerAppDrawer: { screen: SellerAppDrawer },
    SellerOrganizationAppDrawer: { screen: SellerOrganizationAppDrawer },
    SellerOrganizationStackNavigator: {
      screen: SellerOrganizationStackNavigator,
    },
    BuyerAuthScreens: { screen: BuyerAuthSwitchNavigator },
    BuyerAppDrawer: { screen: BuyerAppDrawer },
    PartnerAuthScreens: { screen: PartnerAuthSwitchNavigator },
    PartnerAppDrawer: { screen: PartnerAppDrawer },
  },
  {
    initialRouteName: "AppStartNavigator",
    headerMode: "none",
  }
);

const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;
