import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { IMG_URL } from "../../appStore/BASE_URL";

class patnerListComponent extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <View style={{ height: 10 }} />
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
              style={{
                height: 60,
                width: 60,
                borderRadius: 220,
                overflow: "hidden"
              }}
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
              <View style={{ flex: 1 }}>
                <Text>{this.props.item.phone}</Text>
              </View>

              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                  paddingBottom: 5
                }}
              >
                {/* <TouchableOpacity
                  style={{
                    height: 30,
                    width: "80%",
                    backgroundColor: "#ebebeb",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text style={{ fontSize: 11 }}>Remove Patner</Text>
                </TouchableOpacity> */}
              </View>
            </View>
          </View>
        </View>
        <View style={{ height: 10 }} />
      </React.Fragment>
    );
  }
}

export default patnerListComponent;
