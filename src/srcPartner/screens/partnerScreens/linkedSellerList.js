import React, { Component } from "react";

import { View, StatusBar, FlatList } from "react-native";
import CustomHeader from "../../../srcBuyer/components/customComponents/customHeader";
import {
  WHITE_COLOR,
  Button_BG_COLOR,
  SCREEN_BG_COLOR
} from "../../../theme/color";
import { connect } from "react-redux";
import { Spinner } from "native-base";
import LinkedSellerComponent from "../../components/linkedSellerComponent";
import { allAcceptedSeller } from "../../store/actions/sellecrConnectionActions/sellerConnectionActions";
// import CustomButton from "../../components/customComponents/customButton";
// import CustomSearchBar from "../../components/customComponents/customSearchBar";
class AssociatedPatners extends Component {
  state = { spinnerMove: false, noData: false };
  componentDidMount() {
    this.props.allAcceptedSeller(this.props.patnerID._id, this);
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader
          headerText={"Connected Seller"}
          onPressMenu={() => this.props.navigation.toggleDrawer()}
        />
        <StatusBar backgroundColor={Button_BG_COLOR} barStyle="light-content" />
        {this.state.spinnerMove ? (
          <Spinner color={Button_BG_COLOR} />
        ) : (
          <FlatList
            data={this.props.sellerRequestsData}
            renderItem={({ item }) => (
              <LinkedSellerComponent data={item} item={item.seller} />
            )}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  patnerID: state.LoadUserReducer.userData,
  sellerRequestsData: state.SellerConnectionReducer.acceptedSellerList
});

export default connect(
  mapStateToProps,
  { allAcceptedSeller }
)(AssociatedPatners);
