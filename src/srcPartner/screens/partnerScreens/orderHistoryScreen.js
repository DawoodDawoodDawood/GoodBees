import React, { Component } from "react";
import { StyleSheet, ScrollView, StatusBar } from "react-native";
import { Container, Tab, Tabs, TabHeading, Text, Content } from "native-base";
import {
  WHITE_COLOR,
  SCREEN_BG_COLOR,
  Button_BG_COLOR
} from "../../../theme/color";
import CustomHeader from "../../../srcSeller/components/customComponents/customHeader";

import CustomMealComponent from "../../components/customComponents/customMeal";

export default class OrderHistoryScreen extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <CustomHeader
          headerText={"Order History"}
          onPressMenu={() => this.props.navigation.toggleDrawer()}
        />
        <StatusBar backgroundColor={Button_BG_COLOR} barStyle="light-content" />
        <Content>
          <CustomMealComponent
            buttonText={"Breakfast"}
            butttonText={"Paid"}
            showCashOnPick
            showPartner
            lastButtonText={"Cancel"}
          />
          <CustomMealComponent
            buttonText={"Breakfast"}
            butttonText={"Paid"}
            showCashOnPick
            showPartner
            lastButtonText={"Cancel"}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5"
  },
  pageTitleViewStyle: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: WHITE_COLOR
  }
});
