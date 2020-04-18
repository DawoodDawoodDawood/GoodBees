import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Alert,
  AsyncStorage
} from "react-native";
import firebase, { Notification } from "react-native-firebase";

export default class FirebaseToken extends Component {
  componentDidMount() {
    firebase
      .messaging()
      .getToken()
      .then(fcToken => {
        this.setState({ fcToken });
        console.log(`fcToken: `);
        console.log(fcToken);
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
  }
  componentWillUnmount() {
    this.removeNotificationDisplayedListener();
    this.removeNotificationListener();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text>To get started, edit App.js</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
