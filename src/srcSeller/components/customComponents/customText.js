import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Icon } from "native-base";
import { WHITE_COLOR, SCREEN_BG_COLOR } from "../../../theme/color";
import { SMALL, MEDIUM } from "../../../theme/font";

export default class CustomText extends Component {
  render() {
    return (
      <React.Fragment>
        <View style={{ height: 10 }} />
        <View
          style={[
            styles.textViewStyle,
            {
              height: this.props.textPlaceHeight
                ? this.props.textPlaceHeight
                : 50
            }
          ]}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "flex-start"
            }}
          >
            <Text style={{ color: "black", fontSize: MEDIUM }}>
              {this.props.Title + ":"}
            </Text>
            {/* <Icon
              name={this.props.iconName}
              type="FontAwesome"
              style={{
                height: this.props.iconHeight ? this.props.iconHeight : 28,
                width: this.props.iconWidth ? this.props.iconWidth : 28,
                color: SCREEN_BG_COLOR,
              }}
            /> */}
          </View>
          <View
            style={{
              flex: 2,
              justifyContent: "center",
              alignItems: "flex-start"
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
    backgroundColor: WHITE_COLOR
  },
  textViewStyle: {
    width: "85%",
    alignSelf: "center",
    flexDirection: "row"
  }
});
