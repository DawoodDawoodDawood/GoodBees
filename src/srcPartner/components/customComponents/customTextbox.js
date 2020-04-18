import React, { Component } from "react";
import { View } from "react-native";
import { Input, Item, Icon } from "native-base";
import {
  BORDER_COLOR,
  Textbox_BG_COLOR,
  WHITE_COLOR,
} from "../../../theme/color";
import { SMALL } from "../../../theme/font";

export default class CustomTextBox extends Component {
  render() {
    return (
      <React.Fragment>
        <View style={{ height: 10 }} />
        <Item
          regular
          style={{
            height: 45,
            width: this.props.width ? this.props.width : "80%",
            alignSelf: "center",
            borderRadius: 5,
            borderColor: BORDER_COLOR,
            backgroundColor: this.props.backgroundColor
              ? this.props.backgroundColor
              : Textbox_BG_COLOR,
          }}
        >
          <Input
            maxLength={this.props.maxLength ? this.props.maxLength : 2000}
            placeholderTextColor={"#027000"}
            style={{
              fontSize: SMALL,
              color: "black",
              fontWeight: "500",
              color: "#027000",
            }}
            value={this.props.value}
            placeholder={this.props.placeholder}
            keyboardType={this.props.keyboardType}
            onChangeText={this.props.onChangeText}
            secureTextEntry={this.props.secureTextEntry}
          />
          {this.props.showEye1 ? (
            <Icon
              style={{ color: WHITE_COLOR }}
              name={this.props.eyeIcon1}
              onPress={this.props.onEyePress1}
            />
          ) : (
            false
          )}
          {this.props.showEye2 ? (
            <Icon
              style={{ color: WHITE_COLOR }}
              name={this.props.eyeIcon2}
              onPress={this.props.onEyePress2}
            />
          ) : (
            false
          )}
        </Item>
      </React.Fragment>
    );
  }
}
