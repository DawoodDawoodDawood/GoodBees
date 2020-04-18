import React, { Component } from "react";
import { Header, Button, Left, Right, Body, Icon, Text } from "native-base";
import { TouchableOpacity, View } from "react-native";
import {
  SCREEN_BG_COLOR,
  WHITE_COLOR,
  Button_BG_COLOR,
} from "../../../theme/color";

export default class CustomHeader extends Component {
  render() {
    return (
      <Header
        style={{ backgroundColor: Button_BG_COLOR, justifyContent: "center" }}
      >
        <Left>
          <Button transparent onPress={this.props.onPressMenu}>
            <Icon name="menu" style={{ color: "white" }} />
          </Button>
        </Left>
        <Body style={{ color: WHITE_COLOR }}>
          <Text style={{ color: WHITE_COLOR }}>{this.props.headerText}</Text>
        </Body>

        <Right>
          {this.props.showHeaderButton ? (
            <TouchableOpacity
              onPress={this.props.onPressRightButton}
              style={{
                height: 35,
                borderColor: Button_BG_COLOR,
                borderWidth: 1,
                width: "60%",
                elevation: 10,
                backgroundColor: Button_BG_COLOR,
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,
              }}
            >
              <Text style={{ color: WHITE_COLOR, fontSize: 13 }}>
                {this.props.buttonText}
              </Text>
            </TouchableOpacity>
          ) : (
            false
          )}
          <View style={{ width: 20 }} />
          {this.props.showHeaderButton1 ? (
            <TouchableOpacity
              onPress={this.props.onPressRightButton1}
              style={{
                height: 35,
                borderColor: Button_BG_COLOR,
                borderWidth: 1,
                width: "60%",
                elevation: 10,
                backgroundColor: Button_BG_COLOR,
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,
              }}
            >
              <Text style={{ color: WHITE_COLOR, fontSize: 13 }}>
                {this.props.buttonText1}
              </Text>
            </TouchableOpacity>
          ) : (
            false
          )}
        </Right>
      </Header>
    );
  }
}
