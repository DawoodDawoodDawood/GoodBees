import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  StatusBar
} from "react-native";
import { STATUS_BAR, Button_BG_COLOR } from "../theme/color";
import { LOGIN_ASYNC_STORAGE } from "../appStore/asyncStorage/loginAsyncStorage";
import AsyncStorage from "@react-native-community/async-storage";
import { connect } from "react-redux";
import { loadUserAction } from "../appStore/loadUser/loadUserAction";
import { checkActivateDeActiveBroadCast } from "../srcPartner/store/actions/BroadCastActions/broadCastActions";
import {
  SellerBuyerFCToken,
  PatnerFCToken
} from "../appStore/FCToken/FCTokenAction";

import PushNotification from "react-native-push-notification";
import firebase, { Notification } from "react-native-firebase";
import { StackActions, NavigationActions } from "react-navigation";
class SplashScreen extends Component {
  state = { TOKEN: "", fcToken: "" };

  componentDidMount() {
    firebase
      .messaging()
      .getToken()
      .then(fcToken => {
        this.setState({ fcToken });
        // console.log(`fcToken: `);
        console.log(fcToken);
        this.setState({ TOKEN: fcToken });
      })
      .catch(err => {
        console.log(err);
      });
    firebase
      .messaging()
      .hasPermission()
      .then(permision => {
        if (permision) {
          console.log("permission granted");
        } else {
          firebase
            .messaging()
            .requestPermission()
            .then(reqPermission => {
              if (reqPermission) {
                console.log("permission granted");
              } else {
                console.log("permission Req failed");
              }
            })
            .catch(err => {
              console.log("req Permission catch error");
            });
        }
      })
      .catch(err => {
        console.log("has permission catch error");
      });
    this.removeNotificationDisplayedListener = firebase
      .notifications()
      .onNotificationDisplayed(notification => {
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
        console.log(notification);
        Alert.alert("OnNotificaton Displayed");
      });
    this.removeNotificationListener = firebase
      .notifications()
      .onNotification(notification => {
        // Process your notification as required
        firebase.notifications().displayNotification(notification);
        Alert.alert("OnNotificaton Displayed :)");
        console.log(notification);
      });
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
        console.log("TOKEN:", token);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        console.log("NOTIFICATION:", notification);
        if (notification.type === "SEND_BROADCAST_FROM_PATNER_TO_BUYER") {
          // this.props.navigation.navigate("BuyerInterestTrayScreen");
        }
        // required on iOS only
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      // Android only
      senderID: "192665193308",
      // iOS only
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },
      popInitialNotification: true,
      requestPermissions: true
    });
    AsyncStorage.getItem(LOGIN_ASYNC_STORAGE)
      .then(user => {
        if (user) {
          let userData = JSON.parse(user);

          if (userData.sellerName) {
            this.props.loadUserAction(userData);
            const resetAction = StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: "SellerAppDrawer" })
              ]
            });
            this.props.SellerBuyerFCToken({
              _id: userData._id,
              isSeller: true,
              fcToken: this.state.TOKEN,
              appType: "MOBILE"
            });
            setTimeout(() => this.props.navigation.dispatch(resetAction), 3000);
          }

          if (userData.buyerName) {
            this.props.loadUserAction(userData);
            console.log(userData);
            const resetAction = StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: "BuyerAppDrawer" })
              ]
            });
            this.props.SellerBuyerFCToken({
              _id: userData._id,
              isSeller: false,
              fcToken: this.state.TOKEN,
              appType: "MOBILE"
            });
            setTimeout(() => this.props.navigation.dispatch(resetAction), 3000);
          }
          if (userData.partnerName) {
            this.props.loadUserAction(userData);
            const resetAction = StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: "PartnerAppDrawer" })
              ]
            });
            this.props.PatnerFCToken({
              partnerID: userData._id,
              fcToken: this.state.TOKEN,
              appType: "MOBILE"
            });
            setTimeout(() => this.props.navigation.dispatch(resetAction), 3000);
          }
        } else {
          setTimeout(() => this.props.navigation.navigate("MainScreen"), 3000);
        }
      })
      .catch(exc => {
        setTimeout(() => this.props.navigation.navigate("MainScreen"), 3000);
      });
  }
  componentWillUnmount() {
    this.removeNotificationDisplayedListener();
    this.removeNotificationListener();
  }
  render() {
    return (
      <ImageBackground
        resizeMode={"stretch"}
        source={require("../images/AppBackgroun.jpg")}
        style={styles.container}
      >
        <StatusBar backgroundColor={STATUS_BAR} barStyle="light-content" />
        <Image
          resizeMode="stretch"
          style={{ height: 100, width: 200 }}
          source={require("../images/GoodBessLogo.png")}
        />
      </ImageBackground>
    );
  }
}
export default connect(
  null,
  {
    loadUserAction,
    SellerBuyerFCToken,
    PatnerFCToken,
    checkActivateDeActiveBroadCast
  }
)(SplashScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: SCREEN_BG_COLOR
  }
});
