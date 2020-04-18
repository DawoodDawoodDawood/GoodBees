import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { IMG_URL } from "../../appStore/BASE_URL";
import { connect } from "react-redux";

import { Spinner } from "native-base";
import { Button_BG_COLOR } from "../../theme/color";
import { acceptRejectRequest } from "../store/actions/sellecrConnectionActions/sellerConnectionActions";
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
              source={{ uri: IMG_URL + this.props.item.sellerImgURL[0] }}
              resizeMode={"stretch"}
            />
          </View>
          <View style={{ flex: 3, justifyContent: "center" }}>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <Text>{this.props.item.sellerName}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: "flex-start" }}>
              <Text>{this.props.item.phone}</Text>
            </View>
          </View>
        </View>
        <View style={{ height: 10 }} />
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { acceptRejectRequest }
)(AddPatner);
