import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  Text,
  StatusBar
} from "react-native";
import { SCREEN_BG_COLOR, Button_BG_COLOR, STATUS_BAR } from "../theme/color";

import { WHITE_COLOR } from "../theme/color";

export default class MainScreen extends Component {
  render() {
    return (
      <ImageBackground
        source={require("../images/doodles.jpg")}
        style={styles.container}
      >
        <StatusBar backgroundColor={Button_BG_COLOR} barStyle="light-content" />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("SellerAuthScreens")}
          style={styles.buttonPress}
        >
          <Image
            style={styles.IconStyle}
            source={require("../images/MainPageLogo/chef.png")}
          />
          <Text style={styles.IconTextStyle}>Seller</Text>
        </TouchableOpacity>
        <View style={{ height: 60 }} />
        <TouchableOpacity
          style={styles.buttonPress}
          onPress={() => this.props.navigation.navigate("BuyerAuthScreens")}
        >
          <Image
            style={[styles.IconStyle, { width: 60, height: 60 }]}
            source={require("../images/buyer.png")}
          />
          <Text style={[styles.IconTextStyle, { paddingTop: 0 }]}>Buyer</Text>
        </TouchableOpacity>

        <View style={{ height: 60 }} />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("PartnerAuthScreens")}
          style={styles.buttonPress}
        >
          <Image
            style={styles.IconStyle}
            source={require("../images/MainPageLogo/courier.png")}
          />
          <Text style={styles.IconTextStyle}>Patner</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  buttonPress: {
    backgroundColor: Button_BG_COLOR,
    width: 100,
    height: 100,
    elevation: 100,
    borderRadius: 100,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  IconStyle: {
    height: 45,
    width: 45
  },
  IconTextStyle: {
    color: WHITE_COLOR,
    paddingTop: 8
  }
});
