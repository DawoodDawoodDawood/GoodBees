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
              style={{ height: 50, width: 50, borderRadius: 20 }}
              source={{ uri: IMG_URL + this.props.item.sellerImgURL[0] }}
            />
          </View>
          <View style={{ flex: 3, justifyContent: "center" }}>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <Text>{this.props.item.sellerName}</Text>
            </View>
            {this.state.spinnerMove ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-start",
                  flexDirection: "row"
                }}
              >
                <Spinner style={{ color: Button_BG_COLOR }} />
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-start",
                  flexDirection: "row"
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    paddingBottom: 5
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      this.props.acceptRejectRequest(
                        this.props.data._id,
                        "ACCEPT",
                        this
                      )
                    }
                    style={{
                      height: 30,
                      width: "80%",
                      borderRadius: 5,
                      backgroundColor: "#3c8dbc",
                      justifyContent: "center",
                      alignItems: "center",
                      elevation: 2
                    }}
                  >
                    <Text style={{ fontSize: 11, color: "white" }}>Accept</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    paddingBottom: 5
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      this.props.acceptRejectRequest(
                        this.props.data._id,
                        "REJECT",
                        this
                      )
                    }
                    style={{
                      height: 30,
                      width: "80%",
                      borderRadius: 5,
                      backgroundColor: "#dc3c45",
                      justifyContent: "center",
                      alignItems: "center",
                      elevation: 2
                    }}
                  >
                    <Text style={{ fontSize: 11, color: "white" }}>Reject</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
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
