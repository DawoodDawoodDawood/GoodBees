import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Item, Icon, Input } from "native-base";
import { SCREEN_BG_COLOR } from "../../../theme/color";
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
                : "#f5f5f5",
              borderColor: this.props.borderColor
                ? this.props.borderColor
                : "#f5f5f5"
            }
          ]}
        >
          <Icon
            name="ios-search"
            style={{ marginLeft: 15, color: SCREEN_BG_COLOR }}
          />
          <Input
            placeholder={
              this.props.placeholderText
                ? this.props.placeholderText
                : "Search Categories"
            }
            value={this.props.value}
            onChangeText={this.props.onChangeText}
            placeholderTextColor={SCREEN_BG_COLOR}
            style={{ fontSize: SMALL }}
          />
        </Item>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  searchBarStyle: {
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 50
  }
});
