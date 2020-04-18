import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  StatusBar,
  FlatList
} from "react-native";
import {
  Container,
  Tab,
  Tabs,
  TabHeading,
  Spinner,
  Icon,
  Text
} from "native-base";
import {
  WHITE_COLOR,
  SCREEN_BG_COLOR,
  Button_BG_COLOR,
  SCREEN_COLOR_DARKER
} from "../../../theme/color";
import CustomHeader from "../../../srcSeller/components/customComponents/customHeader";
import CustomPartnerInfoComponent from "../../components/customComponents/customPartnerInfo";
import CustomSearchBar from "../../components/customComponents/customSearchBar";
import CustomButton from "../../components/customComponents/customButton";
import { connect } from "react-redux";
import SearchInput, { createFilter } from "react-native-search-filter";
import { showSellerToPatner } from "../../store/actions/productActions/showSellerAndFoodActions";
import Geolocation from "@react-native-community/geolocation";
class SearchSellerByLocationScreen extends Component {
  state = {
    filter: false,
    spinnerMove: false,
    longitude: "",
    latitude: "",
    searchMeal: "",
    searchArray: [],
    isSearching: false
  };

  componentDidMount() {
    Geolocation.getCurrentPosition(info => {
      this.props.showSellerToPatner(
        this.props.patnerID._id,
        info.coords.latitude,
        info.coords.longitude,
        this
      );
      this.setState({
        longitude: info.coords.longitude,
        latitude: info.coords.latitude
      });
    })
      .then(item => console.log("done"))
      .catch(err =>
        this.props.showSellerToPatner(
          this.props.patnerID._id,
          this.props.patnerID.location.latitude,
          this.props.patnerID.location.longitude,
          this
        )
      );
  }
  onSearch = text => {
    const filteredEmails = this.props.showAllSellerData.filter(
      createFilter(text, ["sellerName"])
    );

    this.setState({ searchMeal: text });
    if (text === "") {
      this.setState({ isSearching: false });
    } else {
      this.setState({ isSearching: true });
    }
    this.setState({ searchArray: filteredEmails });
  };
  toggleFilter = () => {
    this.setState({ filter: !this.state.filter });
  };
  render() {
    return (
      <Container style={styles.container}>
        <CustomHeader
          headerText={"Seller List"}
          onPressMenu={() => this.props.navigation.toggleDrawer()}
        />
        <StatusBar backgroundColor={Button_BG_COLOR} barStyle="light-content" />
        <CustomSearchBar
          placeholderText={"Search Seller By Name"}
          value={this.state.searchMeal}
          onChangeText={text => this.onSearch(text)}
        />
        {this.state.spinnerMove ? (
          <Spinner />
        ) : this.state.isSearching === true ? (
          this.state.searchArray.map(item => (
            <CustomPartnerInfoComponent
              seller={item}
              buttonText={"View Meals"}
              onPressViewMeals={() =>
                this.props.navigation.navigate("PartnerAddToCartScreen", {
                  SellerID: item._id
                })
              }
            />
          ))
        ) : (
          this.props.showAllSellerData.map(item => (
            <CustomPartnerInfoComponent
              seller={item}
              buttonText={"View Meals"}
              onPressViewMeals={() =>
                this.props.navigation.navigate("PartnerAddToCartScreen", {
                  SellerID: item._id
                })
              }
            />
          ))
        )}

        {/* <Tab
            heading={
              <TabHeading style={{ backgroundColor: WHITE_COLOR }}>
                <Text style={{ color: SCREEN_BG_COLOR }}>Search by Loc</Text>
              </TabHeading>
            }
          >
            <View style={{ height: 10 }}></View>
            <TouchableOpacity
              style={styles.filterView}
              onPress={() => this.toggleFilter()}
            >
              <View style={{ flex: 1, paddingLeft: 10 }}>
                <Text
                  style={{
                    fontWeight: "700",
                    color: SCREEN_COLOR_DARKER,
                    fontSize: 13
                  }}
                >
                  Filter
                </Text>
              </View>
              <View
                style={{ flex: 1, alignItems: "flex-end", paddingRight: 10 }}
              >
                <View>
                  <Icon
                    name="filter"
                    type={"FontAwesome"}
                    style={{ marginLeft: 15, color: SCREEN_BG_COLOR }}
                  />
                </View>
              </View>
            </TouchableOpacity>
            <View style={{ height: 10 }}></View>
            {this.state.filter ? (
              <View
                style={{
                  backgroundColor: "white",
                  borderColor: SCREEN_COLOR_DARKER,
                  borderWidth: 1,
                  borderRadius: 10,
                  width: "90%",
                  alignSelf: "center"
                }}
              >
                <CustomSearchBar
                  searchBarWidth={"70%"}
                  searchBarHeight={35}
                  placeholderText={"Search any Location"}
                />
                <CustomSearchBar
                  searchBarWidth={"70%"}
                  searchBarHeight={35}
                  placeholderText={"Search by Name"}
                />
                <View style={{ height: 10 }} />
                <CustomButton
                  width={"30%"}
                  height={30}
                  text="Filter"
                  mainButtonBgColor={SCREEN_BG_COLOR}
                />
                <View style={{ height: 10 }}></View>
              </View>
            ) : (
              false
            )}
            <ScrollView>
              <CustomPartnerInfoComponent
                buttonText={"View Meals"}
                onPressViewMeals={() =>
                  this.props.navigation.navigate("PartnerAddToCartScreen")
                }
              />
            </ScrollView>
          </Tab> */}
        {/* </Tabs> */}
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  patnerID: state.LoadUserReducer.userData,
  showAllSellerData: state.ShowAllSellerAndFoodReducer.showAllSeller
});

export default connect(
  mapStateToProps,
  { showSellerToPatner }
)(SearchSellerByLocationScreen);

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
  },
  searchBarStyle: {
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 50
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
    borderRadius: 10
  }
});
