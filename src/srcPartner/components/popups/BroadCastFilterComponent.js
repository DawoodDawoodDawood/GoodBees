import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import {
  WHITE_COLOR,
  SCREEN_BG_COLOR,
  Button_BG_COLOR,
} from "../../../theme/color";
import { LARGE, MEDIUM } from "../../../theme/font";
import CustomButton from "../../components/customComponents/customButton";
import CustomTextBox from "../../components/customComponents/customTextbox";
import { Spinner } from "native-base";

class BroadCastFilterComponent extends Component {
  state = {};
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={SCREEN_BG_COLOR} barStyle="light-content" />
        <View style={styles.mainViewStyle}>
          <View style={styles.flexStyle}>
            <Text style={{ color: Button_BG_COLOR, fontWeight: "700" }}>
              Filter Broad Cast
            </Text>
          </View>

          <View style={[styles.flexStyle, { flex: 1, flexDirection: "row" }]}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomTextBox
                keyboardType={"number-pad"}
                width={"90%"}
                value={this.props.minVal}
                maxLength={2}
                onChangeText={this.props.onMinValCall}
                backgroundColor={"white"}
                placeholder={"Min Age"}
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomTextBox
                keyboardType={"number-pad"}
                width={"90%"}
                value={this.state.maxVal}
                maxLength={2}
                onChangeText={this.props.onMaxValCall}
                backgroundColor={"white"}
                placeholder={"Max Age"}
              />
            </View>
          </View>
          {/* <View style={[styles.flexStyle, { flex: 2 }]}>
            <CustomTextBox
              width={"90%"}
              value={this.props.buyerContact}
              onChangeText={this.props.onbuyerContactChange}
              backgroundColor={"white"}
              placeholder={"Phone Number"}
            />
          </View>
          <View style={[styles.flexStyle, { flex: 2 }]}>
            <CustomTextBox
              width={"90%"}
              value={this.props.buyerAddress}
              onChangeText={this.props.onbuyerAddressChange}
              backgroundColor={"white"}
              placeholder={"Address"}
            />
          </View> */}
          {this.props.filterSpinner ? (
            <Spinner />
          ) : (
            <React.Fragment>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CustomButton
                  onPress={this.props.onApplyFilterButton}
                  width="90%"
                  text={"Apply Filter and send"}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CustomButton
                  onPress={this.props.onSendWithoutFilter}
                  width="90%"
                  text={"Send Without Filter"}
                />
              </View>
            </React.Fragment>
          )}
        </View>
      </View>
    );
  }
}

export default BroadCastFilterComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  buttonStyle: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  flexStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainViewStyle: {
    height: 300,
    width: "80%",
    borderRadius: 10,
    backgroundColor: WHITE_COLOR,
    elevation: 1,
  },
});
