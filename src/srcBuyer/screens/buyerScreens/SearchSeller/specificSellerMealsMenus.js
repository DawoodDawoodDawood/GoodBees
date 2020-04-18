import React, { Component } from "react";
import { StyleSheet, ScrollView, StatusBar, Spinner } from "react-native";
import { Container, Tab, Tabs, TabHeading, Text } from "native-base";
import {
  WHITE_COLOR,
  SCREEN_BG_COLOR,
  Button_BG_COLOR,
} from "../../../../theme/color";
import CustomHeader from "../../../components/customComponents/customHeader";
import BLD_MealComponent from "../../../components/BLD_MealComponent";
import MenuComponent from "../../../components/customComponents/menuComponent";
import { connect } from "react-redux";
import { showSpecificSellerMenusToBuyer } from "../../../store/actions/meal_menuActions/meal_menuActions";
import { showAllMeals } from "../../../../srcSeller/store/actions/mealAction/mealAction";
class SpecificSellerMealsMenus extends Component {
  componentDidMount() {
    const data = this.props.navigation.getParam("SellerID", "");
    console.log(data);
    this.props.showAllMeals(data, this);
    this.props.showSpecificSellerMenusToBuyer(data);
  }
  state = { spinnerMove: false };
  render() {
    return (
      <Container style={styles.container}>
        <CustomHeader
          onPressBack={() => this.props.navigation.goBack()}
          showBackButton
          headerText={"Seller Meals and Menus"}
        />
        <StatusBar backgroundColor={Button_BG_COLOR} barStyle="light-content" />
        <Tabs tabBarUnderlineStyle={{ backgroundColor: SCREEN_BG_COLOR }}>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: WHITE_COLOR }}>
                <Text style={{ color: SCREEN_BG_COLOR }}>All Meals</Text>
              </TabHeading>
            }
          >
            <ScrollView>
              {this.props.specificSellerMeals.map((allMeals, index) => (
                <BLD_MealComponent
                  key={index}
                  allMeals={allMeals}
                  phoneNumber={allMeals.contactNumber}
                  secondButton
                  secondButtonText="Add to Cart"
                  emptyDate
                  buttonBgColor={"orange"}
                  navigation={this.props.navigation}
                />
              ))}
            </ScrollView>
          </Tab>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: WHITE_COLOR }}>
                <Text style={{ color: SCREEN_BG_COLOR }}>Menus</Text>
              </TabHeading>
            }
          >
            <ScrollView>
              {this.props.specificSellerMenus.map((menus, index) => (
                <MenuComponent
                  addToCartButton
                  key={index}
                  menus={menus}
                  navigation={this.props.navigation}
                />
              ))}
            </ScrollView>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  specificSellerMeals: state.SellerMealReducer.SellerAllMeals,
  specificSellerMenus: state.BuyerMealMenuReducer.specificSellerMenusforBuyer,
});

export default connect(mapStateToProps, {
  showAllMeals,
  showSpecificSellerMenusToBuyer,
})(SpecificSellerMealsMenus);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  pageTitleViewStyle: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: WHITE_COLOR,
  },
});
