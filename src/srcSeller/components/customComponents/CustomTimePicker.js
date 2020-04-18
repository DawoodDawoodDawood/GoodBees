import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import TimePicker from "react-native-24h-timepicker";
import { Item, Icon, Input, Button, Text } from "native-base";

import { LARGE, MEDIUM } from "../../../theme/font";
import { BORDER_COLOR, Button_BG_COLOR } from "../../../theme/color";
class CustomTimePicker extends Component {
  constructor() {
    super();
    this.state = {
      time: ""
    };
  }

  onConfirm(hour, minute) {
    this.setState({ time: `${hour}:${minute}` });
    this.TimePicker.close();
  }

  render() {
    return (
      <Item
        regular
        style={{
          width: "85%",
          alignSelf: "center",
          borderColor: BORDER_COLOR,
          borderRadius: 5,
          height: this.props.Inputheight ? this.props.Inputheight : 45
        }}
      >
        <View>
          {this.props.showIcon ? (
            <Icon
              name={this.props.iconName ? this.props.iconName : "home"}
              type="FontAwesome"
              style={{
                color: this.props.iconColor
                  ? this.props.iconColor
                  : BORDER_COLOR,
                alignSelf: "flex-start",
                marginRight: 10,
                fontSize: LARGE
              }}
            />
          ) : (
            false
          )}
        </View>

        <Input
          keyboardType={this.props.keyboardType ? this.props.keyboardType : ""}
          disabled={this.props.disabled ? this.props.disabled : false}
          secureTextEntry={
            this.props.secureTextEntry ? this.props.secureTextEntry : false
          }
          onChangeText={
            this.props.onChangeText ? this.props.onChangeText : text => false
          }
          placeholder={
            this.props.placeholder ? this.props.placeholder : "Select Time"
          }
          placeholderColor="black"
          defaultValue={this.props.defaultValue ? this.props.defaultValue : ""}
          value={this.props.value}
          style={{ fontSize: MEDIUM, color: Button_BG_COLOR }}
          placeholderTextColor="#979797"
        />

        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent"
          }}
          onPress={this.props.onPress}
        >
          <Text
            style={{
              color: "black",
              alignSelf: "center",
              marginRight: 40,

              fontSize: 16
            }}
          >
            Select
          </Text>
        </TouchableOpacity>

        <TimePicker
          selectedHour="23"
          ref={this.props.timeRef}
          onCancel={this.props.onCancle}
          onConfirm={
            this.props.onConfirm ? this.props.onConfirm : text => false
          }
        />
      </Item>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 100
  },
  text: {
    fontSize: 20,
    marginTop: 10
  },
  button: {
    backgroundColor: "#4EB151",
    paddingVertical: 11,
    paddingHorizontal: 17,
    borderRadius: 3,
    marginVertical: 50
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600"
  }
});

export default CustomTimePicker;
