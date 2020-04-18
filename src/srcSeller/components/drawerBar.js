import React, { Component } from "react";
import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import { Text, Icon } from "native-base";

import { SCREEN_BG_COLOR, Button_BG_COLOR } from "../../theme/color";

export default class DrawerComponent extends Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.mainViewStyle}
        onPress={this.props.onPressDrawerBar}
      >
        <View style={styles.iconStyle1}>
          {this.props.imageIcon ? (
            <Image
              source={this.props.imageIcon}
              resizeMode={"stretch"}
              style={{
                width: this.props.width ? this.props.width : 25,
                height: this.props.height ? this.props.height : 20
              }}
            />
          ) : (
            <Icon
              style={{ color: "white", fontSize: 22 }}
              name={this.props.iconName ? this.props.iconName : ""}
              type="FontAwesome"
            />
          )}
        </View>

        <View style={styles.textViewStyle}>
          <Text style={{ color: "white" }}>{this.props.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  upperMainViewStyle: {
    height: 150,
    width: "90%",
    alignSelf: "center",
    flexDirection: "row"
  },
  viewStyle: {
    flex: 1,
    backgroundColor: "pink",
    justifyContent: "center",
    alignItems: "flex-start"
  },
  mainViewStyle: {
    height: 60,
    width: "90%",
    alignSelf: "center",
    flexDirection: "row"
  },
  iconStyle1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start"
  },

  textViewStyle: {
    flex: 5,
    justifyContent: "center",
    alignItems: "flex-start"
  }
});
