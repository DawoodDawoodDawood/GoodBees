import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { IMG_URL } from "../../appStore/BASE_URL";
import { connect } from "react-redux";
import { sellerRequestPatner } from "../store/actions/associatePatnersActions/associatedPatnerAction";
import { Spinner } from "native-base";
import { Button_BG_COLOR } from "../../theme/color";
class AddPatner extends Component {
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
              style={{ height: 60, width: 60, borderRadius: 200 }}
              source={{ uri: IMG_URL + this.props.item.partnerImgURL[0] }}
              resizeMode={"stretch"}
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
              >
                {this.state.spinnerMove ? (
                  <Spinner color={Button_BG_COLOR} />
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.sellerRequestPatner(
                        this.props.sellerId,
                        this.props.item._id,
                        this
                      )
                    }
                    style={{
                      height: 40,
                      width: "80%",
                      borderRadius: 5,
                      backgroundColor: Button_BG_COLOR,
                      justifyContent: "center",
                      alignItems: "center",
                      elevation: 2
                    }}
                  >
                    <Text style={{ fontSize: 11, color: "white" }}>
                      Send Request
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
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
)(AddPatner);
