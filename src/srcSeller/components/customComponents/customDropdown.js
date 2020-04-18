import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Icon, Picker, Item } from "native-base";
import { Button_BG_COLOR, BORDER_COLOR } from "../../../theme/color";
import { MEDIUM, LARGE, SMALL } from "../../../theme/font";

export default class CustomDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0
    };
  }
  onValueChange(value) {
    this.setState({
      selected: value
    });
  }
  render() {
    return (
      <React.Fragment>
        <View style={{ height: 15 }} />
        <Item
          disabled={this.props.disabled ? this.props.disabled : false}
          regular
          style={{
            alignSelf: "center",
            borderColor: BORDER_COLOR,
            borderRadius: 5,
            height: this.props.Inputheight ? this.props.Inputheight : 45,
            backgroundColor: this.props.backgroundColor
              ? this.props.backgroundColor
              : "transparent",
            flexDirection: "row",
            width: this.props.width ? this.props.width : "85%",
            justifyContent: "center",
            alignSelf: "center",
            borderWidth: 1
          }}
        >
          {this.props.iconName ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Icon
                name={this.props.iconName ? this.props.iconName : ""}
                type="FontAwesome"
                style={{ fontSize: LARGE, marginRight: 10 }}
              />
            </View>
          ) : (
            false
          )}
          <View
            style={{
              flex: 3,
              justifyContent: "center",
              alignItems: "center",
              marginLeft: this.props.marginLeft ? this.props.marginLeft : 0
            }}
          >
            <Text
              style={{
                alignSelf: "flex-start",
                fontSize: SMALL,
                color: this.props.placeholderColor
                  ? this.props.placeholderColor
                  : "grey",
                paddingLeft: 9,
                color: "#027000",
                fontWeight: "bold"
              }}
            >
              {this.props.title ? this.props.title : ""}
            </Text>
          </View>
          <View style={{ flex: 3 }}>
            {this.props.pickerArray ? (
              <Picker
                note
                mode="dropdown"
                iosHeader={
                  this.props.pickerheader ? this.props.pickerheader : "Select"
                }
                iosIcon={<Icon name="arrow-down" />}
                style={{ color: "#027000" }}
                selectedValue={this.props.value}
                onValueChange={
                  this.props.onValueChange
                    ? this.props.onValueChange
                    : text => false
                }
              >
                {this.props.pickerArray.map(data => (
                  <Picker.Item
                    key={data.key}
                    label={data.value}
                    value={data.key}
                  />
                ))}
              </Picker>
            ) : (
              <Picker
                mode="dropdown"
                iosHeader="Select your SIM"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                selectedValue={this.state.selected}
                onValueChange={this.onValueChange.bind(this)}
              >
                <Picker.Item label="x" value={0} />
                <Picker.Item label="y" value={1} />
                <Picker.Item label="z" value={2} />
              </Picker>
            )}
          </View>
        </Item>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});
