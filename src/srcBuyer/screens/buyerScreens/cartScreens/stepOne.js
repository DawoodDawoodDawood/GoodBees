import React, { Component } from "react";
import { StyleSheet, ScrollView, StatusBar } from "react-native";
import { Container, Tab, Tabs, TabHeading, Text } from "native-base";
import {
  WHITE_COLOR,
  SCREEN_BG_COLOR,
  Button_BG_COLOR
} from "../../../../theme/color";
import CustomHeader from "../../../components/customComponents/customHeader";
import BLD_MealComponent from "../../../components/BLD_MealComponent";
import MenuComponent from "../../../components/customComponents/menuComponent";

export default class StepOneScreen extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <StatusBar backgroundColor={Button_BG_COLOR} barStyle="light-content" />
        <CustomHeader showBackButton />
        <Tabs tabBarUnderlineStyle={{ backgroundColor: SCREEN_BG_COLOR }}>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: WHITE_COLOR }}>
                <Text style={{ color: SCREEN_BG_COLOR }}>All Meals</Text>
              </TabHeading>
            }
          >
            <ScrollView>
              <BLD_MealComponent
                buttonText="Breakfast"
                timeIconText="Date and Time"
                phoneNumber="0306xxxxxxx"
                secondButton
                secondButtonText="Add to Cart"
                emptyDate
              />
              <BLD_MealComponent
                buttonText="Breakfast"
                timeIconText="Date and Time"
                phoneNumber="0306xxxxxxx"
                secondButton
                secondButtonText="Add to Cart"
                emptyDate
              />
              <BLD_MealComponent
                buttonText="Breakfast"
                timeIconText="Date and Time"
                phoneNumber="0306xxxxxxx"
                secondButton
                secondButtonText="Add to Cart"
                emptyDate
              />
            </ScrollView>
          </Tab>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: WHITE_COLOR }}>
                <Text style={{ color: SCREEN_BG_COLOR }}>Menu</Text>
              </TabHeading>
            }
          >
            <ScrollView>
              <MenuComponent addToCartButton />
              <MenuComponent addToCartButton />
              <MenuComponent addToCartButton />
            </ScrollView>
          </Tab>
        </Tabs>
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
