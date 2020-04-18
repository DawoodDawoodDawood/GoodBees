import React, { Component } from "react";
import {
  Header,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Title
} from "native-base";
import { View } from "react-native";
import {
  SCREEN_BG_COLOR,
  WHITE_COLOR,
  Button_BG_COLOR,
  SCREEN_COLOR_DARKER
} from "../../../theme/color";
import { TouchableOpacity, Image } from "react-native";

export default class CustomHeader extends Component {
  render() {
    return (
      <Header style={{ backgroundColor: Button_BG_COLOR }}>
        <Left>
          {this.props.showBackButton ? (
            <Button iconLeft transparent onPress={this.props.onPressBack}>
              <Icon name="arrow-back" style={{ color: "white" }} />
              <Text style={{ color: WHITE_COLOR }}>Back</Text>
            </Button>
          ) : (
            <Button transparent onPress={this.props.onPressMenu}>
              <Icon name="menu" style={{ color: "white" }} />
            </Button>
          )}
        </Left>
        <Body>
          <Title style={{ color: "white" }}>{this.props.headerText}</Title>
        </Body>

        <Right>
          {this.props.showHeaderButton2 ? (
            <TouchableOpacity
              onPress={this.props.onPressIcon2}
              style={{
                height: 35,
                width: 35,
                borderRadius: 80,
                justifyContent: "center",
                alignItems: "center",
                // borderColor: Button_BG_COLOR,
                // borderWidth: 3,
                backgroundColor: SCREEN_COLOR_DARKER
              }}
            >
              <Icon
                name={"repeat"}
                style={{ color: "white", fontSize: 20 }}
                type={"FontAwesome"}
              />
            </TouchableOpacity>
          ) : (
            false
          )}
          <View style={{ width: 5 }} />
          {this.props.showHeaderButton ? (
            <TouchableOpacity
              onPress={this.props.onPressIcon}
              style={{
                height: 35,
                width: 35,
                borderRadius: 80,
                justifyContent: "center",
                alignItems: "center",
                // borderColor: Button_BG_COLOR,
                // borderWidth: 3,
                backgroundColor: SCREEN_COLOR_DARKER
              }}
            >
              <Image
                resizeMode={"stretch"}
                style={{ width: 15, height: 15 }}
                source={this.props.imageIcon}
              />
            </TouchableOpacity>
          ) : (
            false
          )}
        </Right>
      </Header>
    );
  }
}
