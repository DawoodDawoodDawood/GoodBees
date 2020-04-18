import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Text, Button } from "native-base";
import { MEDIUM, EXTRA_SMALL } from "../../../theme/font";
import {
  Button_BG_COLOR,
  WHITE_COLOR,
  SCREEN_BG_COLOR,
  SCREEN_COLOR_DARKER,
  STATUS_BAR
} from "../../../theme/color";
import { IMG_URL } from "../../../appStore/BASE_URL";
export default class CutomPartnerInfoComponent extends Component {
  render() {
    return (
      <React.Fragment>
        <View style={{ height: 10 }} />
        <View style={styles.mainViewStyle}>
          <View style={{ flex: 3, flexDirection: "row" }}>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-start",

                alignItems: "center"
              }}
            >
              <Image
                resizeMode={"stretch"}
                source={{ uri: IMG_URL + this.props.seller.sellerImgURL[0] }}
                style={{
                  height: "90%",
                  width: "95%",
                  borderRadius: 10
                }}
              />
            </View>
            <View
              style={{
                flex: 2
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "flex-start"
                }}
              >
                <View
                  style={{
                    width: 30,
                    justifyContent: "center",
                    alignItems: "flex-start"
                  }}
                >
                  <Image
                    resizeMode={"stretch"}
                    source={require("../../../images/shop.png")}
                    style={{
                      height: this.props.iconHeight
                        ? this.props.iconHeight
                        : 18,
                      width: this.props.iconWidth ? this.props.iconWidth : 20
                    }}
                  />
                </View>
                <View
                  style={{
                    flex: 3,

                    justifyContent: "flex-start",
                    alignItems: "flex-start"
                  }}
                >
                  <Text style={{ color: "grey", fontSize: MEDIUM }}>
                    {this.props.seller.sellerName}
                    {/* Muhammad Dawood Saddique Server */}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "flex-start"
                }}
              >
                <View
                  style={{
                    width: 30
                  }}
                >
                  <Image
                    resizeMode={"stretch"}
                    source={require("../../../images/phone.png")}
                    style={{
                      height: this.props.iconHeight
                        ? this.props.iconHeight
                        : 18,
                      width: this.props.iconWidth ? this.props.iconWidth : 18
                    }}
                  />
                </View>
                <View
                  style={{
                    flex: 3,
                    justifyContent: "center",
                    alignItems: "flex-start"
                  }}
                >
                  <Text style={{ color: "grey", fontSize: MEDIUM }}>
                    {this.props.seller.phone}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,

                  flexDirection: "row"
                }}
              >
                <View
                  style={{
                    width: 30,

                    justifyContent: "flex-start",
                    alignItems: "center"
                  }}
                >
                  <Image
                    resizeMode={"stretch"}
                    source={require("../../../images/location.png")}
                    style={{
                      height: this.props.iconHeight
                        ? this.props.iconHeight
                        : 20,
                      width: this.props.iconWidth ? this.props.iconWidth : 15
                    }}
                  />
                </View>
                <View
                  style={{
                    flex: 5,
                    justifyContent: "flex-start",
                    alignItems: "flex-start"
                  }}
                >
                  <Text style={{ color: "grey", fontSize: MEDIUM }}>
                    {this.props.seller.address}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 1.5,
                justifyContent: "flex-start",
                alignItems: "center",
                paddingTop: 8
              }}
            >
              <Button
                onPress={this.props.onPressViewMeals}
                style={{
                  height: 25,
                  alignSelf: "center",
                  backgroundColor: this.props.buttonBgColor
                    ? this.props.buttonBgColor
                    : Button_BG_COLOR,
                  width: 100,
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={{
                    color: WHITE_COLOR,
                    fontSize: EXTRA_SMALL
                  }}
                >
                  {this.props.buttonText}
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  mainViewStyle: {
    minHeight: 100,
    paddingTop: 5,
    width: "90%",
    borderRadius: 5,
    elevation: 2,
    backgroundColor: "white",

    alignSelf: "center"
  },
  textViewStyle: {
    width: "85%",
    alignSelf: "center",
    flexDirection: "row"
  }
});
