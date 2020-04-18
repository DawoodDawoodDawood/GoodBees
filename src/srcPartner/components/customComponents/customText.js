import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { WHITE_COLOR } from "../../../theme/color";
import { MEDIUM } from "../../../theme/font";

export default class CustomText extends Component {
  render() {
    return (
      <React.Fragment>
        <View
          style={[
            styles.textViewStyle,
            {
              height: this.props.textPlaceHeight
                ? this.props.textPlaceHeight
                : 35,
            },
          ]}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Text style={{ color: "black", fontSize: MEDIUM }}>
              {this.props.titleText}
            </Text>
          </View>
          <View
            style={{
              flex: 2,
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Text style={{ color: "grey", fontSize: MEDIUM }}>
              {this.props.description}
            </Text>
          </View>
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE_COLOR,
  },
  textViewStyle: {
    width: "85%",
    alignSelf: "center",
    flexDirection: "row",
  },
});
