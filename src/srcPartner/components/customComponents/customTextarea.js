import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Textarea, Input, Item, Icon } from "native-base";
import {
  BORDER_COLOR,
  SCREEN_BG_COLOR,
  Button_BG_COLOR,
} from "../../../theme/color";

export default class CustomTextarea extends Component {
  render() {
    return (
      <React.Fragment>
        <View style={{ height: 15 }} />
        <View>
          <Item
            regular
            style={[
              styles.textareaStyle,
              { backgroundColor: this.props.backgroundColor },
            ]}
          >
            <Textarea
              style={{ color: Button_BG_COLOR }}
              value={this.props.value}
              rowSpan={this.props.rowSpan}
              placeholder={this.props.title}
              onChangeText={this.props.onChangeText}
            />
          </Item>
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  textareaStyle: {
    width: "85%",
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "center",
    marginTop: 5,
  },
});
