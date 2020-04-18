import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Item, Icon, Input } from "native-base";
import { SCREEN_BG_COLOR, Button_BG_COLOR } from "../../../theme/color";
import { SMALL } from "../../../theme/font";
export default class CustomSearchBar extends Component {
  render() {
    return (
      <React.Fragment>
        <View style={{ height: 10 }} />
        <Item
          style={[
            styles.searchBarStyle,
            {
              width: this.props.searchBarWidth
                ? this.props.searchBarWidth
                : "90%",
              height: this.props.searchBarHeight
                ? this.props.searchBarHeight
                : 45,

              backgroundColor: this.props.backgroundColor
                ? this.props.backgroundColor
                : "#e0e0e0",
              borderColor: this.props.borderColor
                ? this.props.borderColor
                : "#e0e0e0",
            },
          ]}
        >
          <Icon
            name="ios-search"
            style={{ marginLeft: 15, color: Button_BG_COLOR }}
          />
          <Input
            placeholder={
              this.props.placeholderText
                ? this.props.placeholderText
                : "Search Meal"
            }
            value={this.props.value}
            onChangeText={this.props.onChangeText}
            placeholderTextColor={Button_BG_COLOR}
            style={{ fontSize: SMALL }}
          />
        </Item>
        <View style={{ height: 5 }} />
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  searchBarStyle: {
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 50,
  },
});
