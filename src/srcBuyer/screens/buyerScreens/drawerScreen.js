import React, { Component } from "react";
import { StyleSheet, View, Image, StatusBar } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Container, Text, Content } from "native-base";
import { LARGE } from "../../../theme/font";
import DrawerComponent from "../../../srcSeller/components/drawerBar";
import { SCREEN_BG_COLOR, Button_BG_COLOR } from "../../../theme/color";
import { LOGIN_ASYNC_STORAGE } from "../../../appStore/asyncStorage/loginAsyncStorage";
import { StackActions, NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { IMG_URL } from "../../../appStore/BASE_URL";
import {
  resetReducer,
  loadUserAction
} from "../../../appStore/loadUser/loadUserAction";
class DrawerScreen extends Component {
  render() {
    return (
      <Container
        style={{
          backgroundColor: Button_BG_COLOR
        }}
      >
        <StatusBar backgroundColor={Button_BG_COLOR} barStyle="light-content" />
        <View style={styles.upperMainViewStyle}>
          <View style={{ height: 20 }} />
          <Image
            resizeMode={"stretch"}
            style={{
              height: "60%",
              width: "40%",
              borderRadius: 10,
              overflow: "hidden"
            }}
            source={
              this.props.buyer
                ? this.props.buyer.buyerImgURL
                  ? { uri: IMG_URL + this.props.buyer.buyerImgURL[0] }
                  : require("../../../images/editP.png")
                : require("../../../images/editP.png")
            }
          />

          <Text
            style={{
              fontSize: LARGE,
              color: "white",
              paddingTop: 2
            }}
          >
            {this.props.buyer.buyerName}
          </Text>
        </View>
        <View
          style={{ height: 1, width: "100%", backgroundColor: Button_BG_COLOR }}
        />
        <Content>
          <DrawerComponent
            imageIcon={require("../../../images/home.png")}
            text="Home"
            iconName="home"
            onPressDrawerBar={() =>
              this.props.navigation.navigate("BuyerAllMealListScreen")
            }
          />
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: Button_BG_COLOR
            }}
          />
          {/* <DrawerComponent
            text="Search Meals"
            iconName="search"
            onPressDrawerBar={() =>
              this.props.navigation.navigate('BuyerSearchMealScreen')
            }
          />
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: Button_BG_COLOR,
            }}
          /> */}
          <DrawerComponent
            imageIcon={require("../../../images/searchIcon.png")}
            text="Search Sellers"
            iconName="user"
            onPressDrawerBar={() =>
              this.props.navigation.navigate("Buyer_NearestSellerList")
            }
          />
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: Button_BG_COLOR
            }}
          />
          <DrawerComponent
            imageIcon={require("../../../images/drawerIcon/foodIcon.png")}
            text="Interested Meals"
            iconName="star"
            onPressDrawerBar={() =>
              this.props.navigation.navigate("BuyerInterestTrayScreen")
            }
          />
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: Button_BG_COLOR
            }}
          />

          <DrawerComponent
            imageIcon={require("../../../images/notificationIcon.png")}
            text="Confirmation Tray"
            iconName="bell"
            onPressDrawerBar={() =>
              this.props.navigation.navigate("BuyerNotificationTrayScreen")
            }
          />
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: Button_BG_COLOR
            }}
          />
          <DrawerComponent
            imageIcon={require("../../../images/orderHistory.png")}
            text=" Order History"
            iconName="history"
            onPressDrawerBar={() =>
              this.props.navigation.navigate("BuyerOrderHistoryScreen")
            }
          />
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: Button_BG_COLOR
            }}
          />
          <DrawerComponent
            imageIcon={require("../../../images/drawerIcon/orderIcon.png")}
            text="Ordered Meals"
            iconName="cutlery"
            onPressDrawerBar={() =>
              this.props.navigation.navigate("BuyerOrderedMealScreen")
            }
          />
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: Button_BG_COLOR
            }}
          />

          <DrawerComponent
            imageIcon={require("../../../images/cartIcon.png")}
            text="Cart"
            iconName="shopping-cart"
            onPressDrawerBar={() =>
              this.props.navigation.navigate("BuyerCartScreen")
            }
          />
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: Button_BG_COLOR
            }}
          />
          <DrawerComponent
            imageIcon={require("../../../images/drawerIcon/profileIcon.png")}
            text="Profile"
            iconName="user"
            onPressDrawerBar={() =>
              this.props.navigation.navigate("BuyerEditInfoScreen")
            }
          />
        </Content>
        <DrawerComponent
          text=" Logout"
          iconName="sign-out"
          onPressDrawerBar={() =>
            AsyncStorage.removeItem(LOGIN_ASYNC_STORAGE).then(user => {
              const resetAction = StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: "BuyerAuthScreens" })
                ]
              });
              this.props.navigation.dispatch(resetAction);
            })
          }
        />
        <View style={{ height: 50 }} />
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  buyer: state.LoadUserReducer.userData
});
export default connect(
  mapStateToProps,
  { resetReducer, loadUserAction }
)(DrawerScreen);
const styles = StyleSheet.create({
  upperMainViewStyle: {
    height: 130,
    width: "90%",
    alignSelf: "center",
    alignItems: "center"
  },
  viewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start"
  }
});
