import React, { Component } from "react";
import { StyleSheet, View, Image, StatusBar } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Container, Text, Content } from "native-base";
import { LARGE, SMALL } from "../../../theme/font";
import DrawerComponent from "../../components/drawerBar";
import { SCREEN_BG_COLOR, Button_BG_COLOR } from "../../../theme/color";
import { LOGIN_ASYNC_STORAGE } from "../../../appStore/asyncStorage/loginAsyncStorage";
import { StackActions, NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { IMG_URL } from "../../../appStore/BASE_URL";
import {
  resetReducer,
  loadUserAction,
} from "../../../appStore/loadUser/loadUserAction";
class DrawerScreen extends Component {
  // static navigationOptions = () => {
  //   return {
  //     header: null,
  //   };
  // };

  render() {
    return (
      <Container style={{ backgroundColor: Button_BG_COLOR }}>
        <StatusBar backgroundColor={Button_BG_COLOR} barStyle="light-content" />
        <View style={styles.upperMainViewStyle}>
          <View style={{ height: 20 }} />
          <Image
            resizeMode={"stretch"}
            style={{
              height: "60%",
              width: "40%",
              borderRadius: 10,
              overflow: "hidden",
            }}
            source={
              this.props.sellerId
                ? this.props.sellerId.sellerImgURL
                  ? { uri: IMG_URL + this.props.sellerId.sellerImgURL[0] }
                  : require("../../../images/editP.png")
                : require("../../../images/editP.png")
            }
          />

          <Text
            style={{
              fontSize: LARGE,
              color: "white",
              paddingTop: 2,
            }}
          >
            {this.props.sellerId.sellerName}
          </Text>
        </View>
        {/* <View
          style={{ height: 1, width: "100%", backgroundColor: Button_BG_COLOR }}
        /> */}
        <Content>
          <DrawerComponent
            imageIcon={require("../../../images/drawerIcon/foodIcon.png")}
            onPressDrawerBar={() => {
              this.props.navigation.navigate("SellerAllMealScreen");
            }}
            text="Meals"
            iconName="cutlery"
          />

          {/* <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: Button_BG_COLOR
            }}
          /> */}
          {this.props.sellerId.sellerType.selerTypesName === "ORGANIZATION" ? (
            false
          ) : (
            <DrawerComponent
              imageIcon={require("../../../images/drawerIcon/foodIcon.png")}
              onPressDrawerBar={() =>
                this.props.navigation.navigate("SellerMenuListScreen")
              }
              text="Menu"
              iconName="caret-square-o-down"
            />
          )}
          {/* <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: Button_BG_COLOR
            }}
          /> */}

          <DrawerComponent
            width={25}
            height={25}
            imageIcon={require("../../../images/drawerIcon/orderIcon.png")}
            onPressDrawerBar={() =>
              this.props.navigation.navigate("SellerOrderFromBuyerScreen")
            }
            text=" All Order To Buyers"
            iconName="list-ol"
          />

          <DrawerComponent
            width={25}
            height={25}
            imageIcon={require("../../../images/drawerIcon/orderIcon.png")}
            onPressDrawerBar={() =>
              this.props.navigation.navigate("SellerOrderFromPatnerScreen")
            }
            text="All Order To Patners"
            iconName="list-ol"
          />
          {/* <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: Button_BG_COLOR
            }}
          /> */}

          <DrawerComponent
            imageIcon={require("../../../images/drawerIcon/profileIcon.png")}
            onPressDrawerBar={() =>
              this.props.navigation.navigate("SellerEditInfoScreen")
            }
            text="Profile"
            iconName="user"
          />
          {/* <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: Button_BG_COLOR
            }}
          /> */}
          {this.props.sellerId.sellerType.selerTypesName === "ORGANIZATION" ? (
            <View>
              <DrawerComponent
                imageIcon={require("../../../images/friendIcon.png")}
                onPressDrawerBar={() =>
                  this.props.navigation.navigate("AssociatedPatnerList")
                }
                text="Associated Patners"
                iconName="user"
              />
              {/* <View
                style={{
                  height: 1,
                  width: "100%",
                  backgroundColor: Button_BG_COLOR
                }}
              /> */}
            </View>
          ) : (
            false
          )}
        </Content>
        <DrawerComponent
          text=" Logout"
          iconName="sign-out"
          onPressDrawerBar={() =>
            AsyncStorage.removeItem(LOGIN_ASYNC_STORAGE).then((user) => {
              console.log("loggin out ...");
              this.props.resetReducer();

              const resetAction = StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({
                    routeName: "SellerAuthScreens",
                  }),
                ],
              });
              this.props.navigation.dispatch(resetAction);
            })
          }
        />
        <View style={{ height: 70 }} />
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  sellerId: state.LoadUserReducer.userData,
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
    alignItems: "center",
  },
  viewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
});
