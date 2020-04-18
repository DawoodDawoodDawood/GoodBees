import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Text, Button } from "native-base";
import { MEDIUM, EXTRA_SMALL } from "../../../theme/font";
import {
  Button_BG_COLOR,
  WHITE_COLOR,
  SCREEN_BG_COLOR
} from "../../../theme/color";
export default class CutomPartnerInfoComponent extends Component {
  render() {
    return (
      <React.Fragment>
        <View style={{ height: 10 }} />
        <View style={styles.mainViewStyle}>
          <View style={{ flex: 2, flexDirection: "row" }}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                source={require("../../../images/menu.jpg")}
                style={{
                  height: 55,
                  width: 55,
                  borderRadius: 5
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
                  flexDirection: "row"
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "flex-start"
                  }}
                >
                  <Image
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
                    justifyContent: "center",
                    alignItems: "flex-start"
                  }}
                >
                  <Text style={{ color: "grey", fontSize: MEDIUM }}>
                    farhan akram
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
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "flex-start"
                  }}
                >
                  <Image
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
                    0306xxxxxxx
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 1.5,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Button
                style={{
                  height: 25,
                  alignSelf: "center",
                  backgroundColor: this.props.buttonBgColor
                    ? this.props.buttonBgColor
                    : SCREEN_BG_COLOR,
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
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                source={require("../../../images/location.png")}
                style={{
                  height: this.props.iconHeight ? this.props.iconHeight : 20,
                  width: this.props.iconWidth ? this.props.iconWidth : 15
                }}
              />
            </View>
            <View
              style={{
                flex: 5,
                justifyContent: "center",
                alignItems: "flex-start"
              }}
            >
              <Text style={{ color: "grey", fontSize: MEDIUM }}>
                Gatwala faisalabad punjab pakistan
              </Text>
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
    height: 100,
    width: "90%",
    borderRadius: 5,
    borderColor: "#EAEAEA",
    borderWidth: 1,
    alignSelf: "center"
  },
  textViewStyle: {
    width: "85%",
    alignSelf: "center",
    flexDirection: "row"
  }
});
