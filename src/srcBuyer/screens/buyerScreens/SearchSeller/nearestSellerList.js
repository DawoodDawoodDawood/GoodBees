import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  StatusBar,
  FlatList,
} from "react-native";
import {
  Container,
  Tab,
  Tabs,
  TabHeading,
  Spinner,
  Icon,
  Text,
} from "native-base";
import {
  WHITE_COLOR,
  SCREEN_BG_COLOR,
  Button_BG_COLOR,
  SCREEN_COLOR_DARKER,
} from "../../../../theme/color";
import CustomHeader from "../../../components/customComponents/customHeader";
import CustomPartnerInfoComponent from "../../../../srcPartner/components/customComponents/customPartnerInfo";
import CustomSearchBar from "../../../components/customComponents/customSearchBar";
import CustomButton from "../../../components/customComponents/customButton";
import SearchInput, { createFilter } from "react-native-search-filter";
import { connect } from "react-redux";
import Geolocation from "@react-native-community/geolocation";
import { searchNearestSeller } from "../../../store/actions/SearchSellerAndMeal/SearchMealAndSeller";
class SearchSellerByLocationScreen extends Component {
  state = { filter: false, spinnerMove: false };
  componentDidMount() {
    {
      Geolocation.getCurrentPosition((info) => {
        this.props.searchNearestSeller(
          this.props.buyerId,
          info.coords.longitude,
          info.coords.latitude,
          this
        );
      });
    }
  }
  state = { searchMeal: "", searchArray: [], isSearching: false };
  toggleFilter = () => {
    this.setState({ filter: !this.state.filter });
  };
  onSearch = (text) => {
    const filteredEmails = this.props.nearestSellerData.filter(
      createFilter(text, ["sellerName"])
    );
    console.log(filteredEmails);
    this.setState({ searchMeal: text });
    if (text === "") {
      this.setState({ isSearching: false });
    } else {
      this.setState({ isSearching: true });
    }
    this.setState({ searchArray: filteredEmails });
  };
  render() {
    console.log(this.props.nearestSellerData);
    return (
      <Container style={styles.container}>
        <CustomHeader
          showHeaderButton
          onPressIcon={() =>
            this.props.navigation.navigate("Buyer_SearchSellerScreen")
          }
          imageIcon={require("../../../../images/onMark.png")}
          headerText={"Seller List"}
          onPressMenu={() => this.props.navigation.toggleDrawer()}
        />
        <StatusBar backgroundColor={Button_BG_COLOR} barStyle="light-content" />
        <CustomSearchBar
          placeholderText={"Search Seller By Name"}
          value={this.state.searchMeal}
          onChangeText={(text) => this.onSearch(text)}
        />
        {this.state.spinnerMove ? (
          <Spinner />
        ) : this.state.isSearching === true ? (
          this.state.searchArray.map((item) => (
            <CustomPartnerInfoComponent
              seller={item}
              buttonText={"View Meals"}
              onPressViewMeals={() =>
                this.props.navigation.navigate("PartnerAddToCartScreen", {
                  SellerID: item._id,
                })
              }
            />
          ))
        ) : (
          this.props.nearestSellerData.map((item) => (
            <CustomPartnerInfoComponent
              seller={item}
              buttonText={"View Meals"}
              onPressViewMeals={() =>
                this.props.navigation.navigate(
                  "BuyerSideSpecificSellerMealsMenusScreen",
                  {
                    SellerID: item._id,
                  }
                )
              }
            />
          ))
        )}
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  buyerId: state.LoadUserReducer.userData._id,
  nearestSellerData: state.BuyerSearchMealAndSeller.nearestSeller,
});

export default connect(
  mapStateToProps,
  { searchNearestSeller }
)(SearchSellerByLocationScreen);

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
  searchBarStyle: {
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 50,
  },
  filterView: {
    height: 35,
    backgroundColor: "white",
    flexDirection: "row",
    alignSelf: "center",
    width: "90%",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: SCREEN_BG_COLOR,
    borderRadius: 10,
  },
});
