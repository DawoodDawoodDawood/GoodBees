import React, { Component } from "react";
import { StyleSheet, View, Image, StatusBar } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Container, Text, Content } from "native-base";
import { LARGE, SMALL } from "../../../theme/font";
import DrawerComponent from "../../../srcSeller/components/drawerBar";
import { SCREEN_BG_COLOR, Button_BG_COLOR } from "../../../theme/color";
import { LOGIN_ASYNC_STORAGE } from "../../../appStore/asyncStorage/loginAsyncStorage";
import { StackActions, NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { IMG_URL } from "../../../appStore/BASE_URL";
import { loadUserAction } from "../../../appStore/loadUser/loadUserAction";
class DrawerScreen extends Component {
  // static navigationOptions = () => {
  //   return {
  //     header: null,
  //   };
  // };

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
              this.props.patnerID
                ? this.props.patnerID.partnerImgURL
                  ? { uri: IMG_URL + this.props.patnerID.partnerImgURL[0] }
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
            {this.props.patnerID.partnerName}
          </Text>
        </View>

        <Content>
          <DrawerComponent
            imageIcon={require("../../../images/drawerIcon/homeIcon.png")}
            text="Home"
            iconName="home"
            onPressDrawerBar={() =>
              this.props.navigation.navigate(
                "PartnerSearchSellerByLocationScreen"
              )
            }
          />

          <DrawerComponent
            text="cart"
            iconName="shopping-cart"
            onPressDrawerBar={() =>
              this.props.navigation.navigate("PartnerCheckoutFirstScreen")
            }
            imageIcon={require("../../../images/cartIcon.png")}
          />

          <DrawerComponent
            text="Hold and Waiting"
            iconName="play-circle"
            onPressDrawerBar={() =>
              this.props.navigation.navigate("PartnerHoldAndWaitingScreen")
            }
            width={25}
            height={25}
            imageIcon={require("../../../images/drawerIcon/orderIcon.png")}
          />

          <DrawerComponent
            width={25}
            height={25}
            imageIcon={require("../../../images/drawerIcon/orderIcon.png")}
            text="Hold and expressed"
            iconName="pause-circle"
            onPressDrawerBar={() =>
              this.props.navigation.navigate("PartnerHoldAndExpressedScreen")
            }
          />

          <DrawerComponent
            imageIcon={require("../../../images/orderHistory.png")}
            text="Order History"
            iconName="history"
            onPressDrawerBar={() =>
              this.props.navigation.navigate("PartnerOrderHistoryScreen")
            }
          />
          <DrawerComponent
            imageIcon={require("../../../images/drawerIcon/profileIcon.png")}
            onPressDrawerBar={() =>
              this.props.navigation.navigate("FriendRequestList")
            }
            text="Request From Seller"
            iconName="user"
          />

          <DrawerComponent
            imageIcon={require("../../../images/friendIcon.png")}
            onPressDrawerBar={() =>
              this.props.navigation.navigate("LinkedSeller")
            }
            text="Linked Sellers"
            iconName="user"
          />

          <DrawerComponent
            imageIcon={require("../../../images/drawerIcon/profileIcon.png")}
            onPressDrawerBar={() =>
              this.props.navigation.navigate("PartnerEditInfoScreen")
            }
            text="Profile"
            iconName="user"
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
                  NavigationActions.navigate({
                    routeName: "PartnerAuthScreens"
                  })
                ]
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
const mapStateToProps = state => ({
  patnerID: state.LoadUserReducer.userData
});
export default connect(
  mapStateToProps,
  { loadUserAction }
)(DrawerScreen);
const styles = StyleSheet.create({
  upperMainViewStyle: {
    height: 130,
    width: "90%",
    alignSelf: "center"
  },
  viewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start"
  }
});
