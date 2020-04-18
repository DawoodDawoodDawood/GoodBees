import React, { Component } from "react";

import { View, StatusBar, FlatList } from "react-native";
import CustomHeader from "../../components/customComponents/customHeader";
import {
  WHITE_COLOR,
  Button_BG_COLOR,
  SCREEN_BG_COLOR
} from "../../../theme/color";
import { connect } from "react-redux";
import PartnerListComponent from "../../components/partnerListComponent";
import AddPatner from "../../components/addPatner";
import {
  showAllPatnerList,
  sellerRequestPatner,
  searchAssociatedPartner,
  connectedPatner
} from "../../store/actions/associatePatnersActions/associatedPatnerAction";
import CustomButton from "../../components/customComponents/customButton";
import CustomSearchBar from "../../components/customComponents/customSearchBar";
class AssociatedPatners extends Component {
  state = {
    limt: 30,
    offset: 1,
    selectOption: false,
    isSearchStart: false,
    isPhoneNumber: false,
    phoneNumber: "",
    name: ""
  };
  componentDidMount() {
    // this.props.showAllPatnerList(this.state.limt, this.state.offset, this);
    this.props.connectedPatner(this.props.sellerId, this);
    this.props.searchAssociatedPartner(this.props.sellerId, "", "", true, this);
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader
          headerText={"Patner List"}
          showHeaderButton1={this.state.isSearchStart ? true : false}
          buttonText1={"Change"}
          onPressRightButton1={() => this.setState({ isSearchStart: false })}
          buttonText={this.state.selectOption ? "Cancle" : "Search"}
          showHeaderButton
          onPressMenu={() => this.props.navigation.toggleDrawer()}
          onPressRightButton={() => {
            this.setState({ selectOption: !this.state.selectOption });
            if (this.state.selectOption === true) {
              this.setState({ isSearchStart: false });
            }
          }}
        />
        <StatusBar backgroundColor={Button_BG_COLOR} barStyle="light-content" />
        {this.state.selectOption ? (
          this.state.isSearchStart ? (
            <View style={{ flex: 1 }}>
              {this.state.isPhoneNumber ? (
                <CustomSearchBar
                  backgroundColor={"white"}
                  value={this.state.phoneNumber}
                  onChangeText={text => {
                    this.props.searchAssociatedPartner(
                      this.props.sellerId,
                      "",
                      text,
                      false,
                      this
                    );
                    this.setState({ phoneNumber: text });
                  }}
                  placeholderText={"Search By Phone Number"}
                />
              ) : (
                <CustomSearchBar
                  value={this.state.name}
                  onChangeText={text => {
                    this.props.searchAssociatedPartner(
                      this.props.sellerId,
                      text,
                      "",
                      true,
                      this
                    );
                    this.setState({ name: text });
                  }}
                  backgroundColor={"white"}
                  placeholderText={"Search By Name"}
                />
              )}
              <View style={{ height: 10 }} />
              <FlatList
                data={this.props.searchList}
                renderItem={({ item }) => <AddPatner item={item} />}
                keyExtractor={item => item.id}
              />
            </View>
          ) : (
            <View style={{ flex: 1, justifyContent: "center" }}>
              <CustomButton
                onPress={() =>
                  this.setState({ isPhoneNumber: false, isSearchStart: true })
                }
                backgroundColor={SCREEN_BG_COLOR}
                text={"Search By Name"}
              />
              <View style={{ height: 20 }} />
              <CustomButton
                onPress={() =>
                  this.setState({ isPhoneNumber: true, isSearchStart: true })
                }
                backgroundColor={SCREEN_BG_COLOR}
                text={"Search By Phone Number"}
              />
            </View>
          )
        ) : (
          <FlatList
            data={this.props.connectedPatnerList}
            renderItem={({ item }) => (
              <PartnerListComponent item={item.partner} />
            )}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  sellerId: state.LoadUserReducer.userData._id,

  showPatnerListtoSeller:
    state.AssociatedPatnerReducerSellerSide.showPatnerList,
  connectedPatnerList:
    state.AssociatedPatnerReducerSellerSide.connectedPatnerWithSeller,
  searchList: state.AssociatedPatnerReducerSellerSide.searchedPatner
});

export default connect(
  mapStateToProps,
  {
    showAllPatnerList,
    sellerRequestPatner,
    connectedPatner,
    searchAssociatedPartner
  }
)(AssociatedPatners);
