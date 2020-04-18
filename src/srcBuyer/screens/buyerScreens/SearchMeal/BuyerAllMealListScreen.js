import React, { Component } from "react";
import { StyleSheet, ScrollView, StatusBar, Spinner } from "react-native";
import { Container, Tab, Tabs, TabHeading, Text } from "native-base";
import { WHITE_COLOR, Button_BG_COLOR } from "../../../../theme/color";
import CustomHeader from "../../../components/customComponents/customHeader";
import BLD_MealComponent from "../../../components/BLD_MealComponent";
import CustomSearchBar from "../../../components/customComponents/customSearchBar";
import { connect } from "react-redux";
import {
  showAllMealsToBuyer,
  showAllBreakFastMealsToBuyer,
  showAllLunchMealsToBuyer,
  showAllDinnerMealsToBuyer
} from "../../../store/actions/meal_menuActions/meal_menuActions";
import SearchInput, { createFilter } from "react-native-search-filter";

class SearchLocationThirdScreen extends Component {
  state = { searchMeal: "", searchArray: [], isSearching: false };
  componentDidMount() {
    this.props.showAllMealsToBuyer();
    this.props.showAllBreakFastMealsToBuyer();
    this.props.showAllLunchMealsToBuyer();
    this.props.showAllDinnerMealsToBuyer();
  }
  onSearch = text => {
    const filteredEmails = this.props.allMealsForBuyer.filter(
      createFilter(text, ["mealName"])
    );
    console.log(filteredEmails);
    this.setState({ searchMeal: text });
    if (text === "") {
      this.setState({ isSearching: false });
    } else {
      this.setState({ isSearching: true });
    }
    this.setState({ searchArray: filteredEmails });
    // this.props.allMealsForBuyer.forEach(item => {
    //   let array = [];

    //   if (item.mealName.toLowerCase().startsWith(text.toLowerCase()) === text) {
    //     console.log(text);
    //     array.push(item);
    //   }

    // });
  };
  render() {
    return (
      <Container style={styles.container}>
        <CustomHeader
          // showHeaderButton
          onPressIcon={() =>
            this.props.navigation.navigate("BuyerSearchMealScreen")
          }
          imageIcon={require("../../../../images/onMark.png")}
          headerText={"All Meals"}
          onPressMenu={() => this.props.navigation.toggleDrawer()}
        />
        <StatusBar backgroundColor={Button_BG_COLOR} barStyle="light-content" />
        <Tabs tabBarUnderlineStyle={{ backgroundColor: Button_BG_COLOR }}>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: WHITE_COLOR }}>
                <Text style={{ color: Button_BG_COLOR }}>All</Text>
              </TabHeading>
            }
          >
            <CustomSearchBar
              value={this.state.searchMeal}
              onChangeText={text => this.onSearch(text)}
            />
            <ScrollView>
              {this.state.isSearching === true
                ? this.state.searchArray.map((allMeals, index) => (
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
                  ))
                : this.props.allMealsForBuyer.map((allMeals, index) => (
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
                <Text style={{ color: Button_BG_COLOR }}>Brekkie</Text>
              </TabHeading>
            }
          >
            <ScrollView>
              {this.props.allBreakfastsForBuyer.map((allMeals, index) => (
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
                <Text style={{ color: Button_BG_COLOR }}>Lunch</Text>
              </TabHeading>
            }
          >
            <ScrollView>
              {this.props.allLunchForBuyer.map((allMeals, index) => (
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
                <Text style={{ color: Button_BG_COLOR }}>Dinner</Text>
              </TabHeading>
            }
          >
            <ScrollView>
              {this.props.allDinnerForBuyer.map((allMeals, index) => (
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
        </Tabs>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  allMealsForBuyer: state.BuyerMealMenuReducer.buyerAllMeals,
  allBreakfastsForBuyer: state.BuyerMealMenuReducer.buyerAllBreakFastMeals,
  allLunchForBuyer: state.BuyerMealMenuReducer.buyerAllLunchMeals,
  allDinnerForBuyer: state.BuyerMealMenuReducer.buyerAllDinnerMeals
});

export default connect(
  mapStateToProps,
  {
    showAllMealsToBuyer,
    showAllBreakFastMealsToBuyer,
    showAllLunchMealsToBuyer,
    showAllDinnerMealsToBuyer
  }
)(SearchLocationThirdScreen);

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
