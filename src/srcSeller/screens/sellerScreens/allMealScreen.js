import React, { Component } from "react";
import { StyleSheet, ScrollView, StatusBar, Image } from "react-native";
import { Container, Tab, Tabs, TabHeading, Text, Spinner } from "native-base";
import { WHITE_COLOR, Button_BG_COLOR } from "../../../theme/color";
import CustomHeader from "../../components/customComponents/customHeader";
import BLD_MealComponent from "../../components/BLD_MealComponent";
import { connect } from "react-redux";
import {
  showAllMeals,
  showAllBreakfast,
  showAllLunch,
  showAllDinner,
  deleteMeal
} from "../../store/actions/mealAction/mealAction";

class AllMealScreen extends Component {
  state = {
    spinnerMove: false,
    allMealsLoaded: false,
    allBreakfastLoaded: false,
    allLunchLoaded: false,
    allDinnerLoaded: false,
    spinnerMovee: false,
    noLunchAvailable: false,
    noDinnerAvailable: false,
    noBreakFastAvailable: false,
    noMealAvaible: false
  };

  componentDidMount() {
    console.log("seller id mota mota kr ka");
    console.log(this.props.sellerId);
    this.props.showAllMeals(this.props.sellerId, this);
    this.props.showAllBreakfast(this.props.sellerId, this);
    this.props.showAllLunch(this.props.sellerId, this);
    this.props.showAllDinner(this.props.sellerId, this);
  }

  render() {
    return (
      <Container style={styles.container}>
        <StatusBar backgroundColor={Button_BG_COLOR} barStyle="light-content" />
        <CustomHeader
          headerText={"Meal List"}
          buttonText={"Add Meal"}
          showHeaderButton
          onPressMenu={() => this.props.navigation.toggleDrawer()}
          onPressRightButton={() =>
            this.props.navigation.navigate("SellerAddMealScreen", {
              completeMealData: ""
            })
          }
        />
        <Tabs tabBarUnderlineStyle={{ backgroundColor: Button_BG_COLOR }}>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: WHITE_COLOR }}>
                <Text style={{ color: Button_BG_COLOR, fontSize: 13 }}>
                  All
                </Text>
              </TabHeading>
            }
          >
            {this.state.spinnerMove ? (
              <Spinner color={Button_BG_COLOR} />
            ) : (
              // this.state.noMealAvaible ? (
              //   <Image
              //     style={{ flex: 1, width: "100%", height: "100%" }}
              //     source={require("../../../images/noMealAvailable.jpg")}
              //   />
              // ) :
              <ScrollView>
                {this.props.allMealsDetail.map((meals, index) => (
                  <BLD_MealComponent
                    key={index}
                    allMeals={meals}
                    onDeatil={() =>
                      this.props.navigation.navigate("SellerAddMealScreen", {
                        completeMeal: JSON.stringify(meals)
                      })
                    }
                    showCashOnPick
                  />
                ))}
              </ScrollView>
            )}
          </Tab>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: WHITE_COLOR }}>
                <Text style={{ color: Button_BG_COLOR, fontSize: 13 }}>
                  Brekkie
                </Text>
              </TabHeading>
            }
          >
            {this.state.spinnerMove ? (
              <Spinner color={Button_BG_COLOR} />
            ) : (
              //  this.state.noBreakFastAvailable ? (
              //   <Image
              //     style={{ flex: 1, width: "100%", height: "100%" }}
              //     source={require("../../../images/noMealAvailable.jpg")}
              //   />
              // ) :
              <ScrollView>
                {this.props.allBreakfastDetail.map((meals, index) => (
                  <BLD_MealComponent
                    key={index}
                    allMeals={meals}
                    onPress={() => this.props.deleteMeal(meals._id, this)}
                    onDeatil={() =>
                      this.props.navigation.navigate("SellerAddMealScreen", {
                        completeMeal: JSON.stringify(meals)
                      })
                    }
                    showCashOnPick
                  />
                ))}
              </ScrollView>
            )}
          </Tab>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: WHITE_COLOR }}>
                <Text style={{ color: Button_BG_COLOR, fontSize: 13 }}>
                  Lunch
                </Text>
              </TabHeading>
            }
          >
            {this.state.spinnerMove ? (
              <Spinner color={Button_BG_COLOR} />
            ) : (
              // this.state.noLunchAvailable ? (
              //   <Image
              //     style={{ flex: 1, width: "100%", height: "100%" }}
              //     source={require("../../../images/noMealAvailable.jpg")}
              //   />
              // ) :
              <ScrollView>
                {this.props.allLunchDetail.map((meals, index) => (
                  <BLD_MealComponent
                    key={index}
                    allMeals={meals}
                    onPress={() => this.props.deleteMeal(meals._id, this)}
                    onDeatil={() =>
                      this.props.navigation.navigate("SellerAddMealScreen", {
                        completeMeal: JSON.stringify(meals)
                      })
                    }
                    showCashOnPick
                  />
                ))}
              </ScrollView>
            )}
          </Tab>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: WHITE_COLOR }}>
                <Text style={{ color: Button_BG_COLOR, fontSize: 13 }}>
                  Dinner
                </Text>
              </TabHeading>
            }
          >
            {this.state.spinnerMove ? (
              <Spinner color={Button_BG_COLOR} />
            ) : (
              <ScrollView>
                {this.props.allDinnerDetail.map((meals, index) => (
                  <BLD_MealComponent
                    key={index}
                    allMeals={meals}
                    onPress={() => this.props.deleteMeal(meals._id, this)}
                    onDeatil={() =>
                      this.props.navigation.navigate("SellerAddMealScreen", {
                        completeMeal: JSON.stringify(meals)
                      })
                    }
                    showCashOnPick
                  />
                ))}
              </ScrollView>
            )}
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  sellerId: state.LoadUserReducer.userData._id,
  allMealsDetail: state.SellerMealReducer.SellerAllMeals,
  allBreakfastDetail: state.SellerMealReducer.SellerAllBreakfast,
  allLunchDetail: state.SellerMealReducer.SellerAllLunch,
  allDinnerDetail: state.SellerMealReducer.SellerAllDinner
});

export default connect(
  mapStateToProps,
  {
    showAllMeals,
    showAllBreakfast,
    showAllLunch,
    showAllDinner,
    deleteMeal
  }
)(AllMealScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  pageTitleViewStyle: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: WHITE_COLOR
  }
});
