import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { WHITE_COLOR, SCREEN_BG_COLOR } from "../../../theme/color";
import { LARGE, MEDIUM } from "../../../theme/font";
import CustomButton from "../../components/customComponents/customButton";
import CustomTextBox from "../../components/customComponents/customTextbox";
// import {connect} from 'react-redux';
// import {alertMsgAction} from '../appStore/alertMsg/alertAction';
class VoucherCodePopup extends Component {
  // componentDidMount() {
  //   setTimeout(() => this.props.alertMsgAction(), 5000);
  // }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={SCREEN_BG_COLOR} barStyle="light-content" />
        <View style={styles.mainViewStyle}>
          <View style={styles.flexStyle}>
            <Text>Enter Meal Quantity</Text>
          </View>
          <View style={[styles.flexStyle, { flex: 2 }]}>
            <CustomTextBox
              width={"90%"}
              keyboardType={"number-pad"}
              value={this.props.vouchereCode}
              onChangeText={this.props.onChangeText}
              backgroundColor={"white"}
              placeholder={"Enter Number Of Meal"}
            />
          </View>
          <View
            style={{ flex: 2, justifyContent: "center", alignItems: "center" }}
          >
            <CustomButton
              onPress={this.props.onVoucherCodeEnter}
              width="90%"
              text={"Done"}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default VoucherCodePopup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  buttonStyle: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  flexStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  mainViewStyle: {
    height: 200,
    width: "80%",
    borderRadius: 10,
    backgroundColor: WHITE_COLOR,
    elevation: 1
  }
});
