import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { IMG_URL } from "../../appStore/BASE_URL";
import { connect } from "react-redux";
import { sellerRequestPatner } from "../store/actions/associatePatnersActions/associatedPatnerAction";

class ConnectedPatnerListComponent extends Component {
  state = { spinnerMove: false };
  render() {
    return (
      <React.Fragment>
        <View
          style={{
            width: "95%",
            height: 90,
            borderRadius: 10,
            elevation: 1,
            backgroundColor: "white",
            alignSelf: "center",
            flexDirection: "row"
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              style={{ height: 50, width: 50, borderRadius: 20 }}
              source={{ uri: IMG_URL + this.props.item.partnerImgURL[0] }}
            />
          </View>
          <View style={{ flex: 3, justifyContent: "center" }}>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <Text>{this.props.item.partnerName}</Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-start",
                flexDirection: "row"
              }}
            >
              <View style={{ flex: 1 }} />

              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                  paddingBottom: 5
                }}
              />
            </View>
          </View>
        </View>
        <View style={{ height: 10 }} />
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  sellerId: state.LoadUserReducer.userData._id,
  addedMenuList: state.SellerAddMenuReducer.AddedMenuList,
  showPatnerListtoSeller: state.AssociatedPatnerReducerSellerSide.showPatnerList
});

export default connect(
  mapStateToProps,
  { sellerRequestPatner }
)(ConnectedPatnerListComponent);
