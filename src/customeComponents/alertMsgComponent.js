import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { Icon } from "native-base";
import { WHITE_COLOR, SCREEN_BG_COLOR } from "../theme/color";
import { LARGE, MEDIUM } from "../theme/font";
import { connect } from "react-redux";
import { alertMsgAction } from "../appStore/alertMsg/alertAction";
class AlertMsgComponent extends Component {
  componentDidMount() {
    setTimeout(() => this.props.alertMsgAction(), 5000);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={SCREEN_BG_COLOR} barStyle="light-content" />
        <View style={styles.mainViewStyle}>
          <View style={[styles.flexStyle, { flex: 2 }]}>
            <Icon
              name={this.props.AlertIconName}
              type="FontAwesome"
              style={{ fontSize: 50, color: this.props.AlertColor }}
            />
          </View>
          <View style={styles.flexStyle}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {this.props.AlertTitle}
            </Text>
          </View>
          <View
            style={[
              styles.flexStyle,
              {
                justifyContent: "center",
                width: "60%",
                alignSelf: "center",
                flex: 1.5
              }
            ]}
          >
            <Text style={{ fontSize: MEDIUM, textAlign: "center" }}>
              {this.props.AlertMsg}
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.buttonStyle,
              { backgroundColor: this.props.AlertColor }
            ]}
            onPress={() => this.props.alertMsgAction()}
          >
            <Text
              style={{
                fontSize: LARGE,
                fontWeight: "bold",
                color: WHITE_COLOR
              }}
            >
              Dismiss
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default connect(null, { alertMsgAction })(AlertMsgComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  buttonStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  flexStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  mainViewStyle: {
    height: 200,
    width: "80%",
    borderRadius: 5,
    backgroundColor: WHITE_COLOR,
    elevation: 1
  }
});
