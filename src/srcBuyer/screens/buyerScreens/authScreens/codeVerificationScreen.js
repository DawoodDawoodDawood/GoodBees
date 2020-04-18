import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  TextInput,
  Alert
} from "react-native";
import {
  SCREEN_BG_COLOR,
  WHITE_COLOR,
  Textbox_BG_COLOR
} from "../../../../theme/color";
import CustomButton from "../../../components/customComponents/customButton";
import { LARGE, SMALL } from "../../../../theme/font";
import { connect } from "react-redux";
import { codeVerificationForResetPassword } from "../../../store/actions/authActions/authActions";
import { Spinner } from "native-base";

class CodeVerificationScreen extends Component {
  state = {
    inputBoxOne: "",
    inputBoxTwo: "",
    inputBoxThree: "",
    inputBoxFour: "",
    inputBoxFive: "",
    inputBoxSix: "",
    isFirstInputEntryValid: true,
    isSecondInputEntryValid: true,
    isThirdInputEntryValid: true,
    isFourthInputEntryValid: true,
    isFifthInputEntryValid: true,
    isSixthInputEntryValid: true,
    codeValidate: false,
    spinnerMove: false
  };

  render() {
    if (this.state.codeValidate) {
      this.props.navigation.navigate("BuyerRecoverPasswordScreen");
    }
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={SCREEN_BG_COLOR} barStyle="light-content" />
        <View>
          <Image
            resizeMode={"stretch"}
            source={require("../../../../images/GoodBessLogo.png")}
            style={{ height: 100, width: 200, alignSelf: "center" }}
          />
        </View>
        <View style={styles.pageTitleViewStyle}>
          <Text style={styles.pageTitleTextStyle}>Code Verification</Text>
        </View>
        <View style={styles.smallTextStyle}>
          <Text
            style={{
              fontSize: SMALL,
              color: WHITE_COLOR
            }}
          >
            Enter code to verify email
          </Text>
        </View>
        <View style={{ height: 15 }} />
        <View style={styles.mainViewStyle}>
          <View style={styles.inputfieldsViewStyle}>
            <TextInput
              ref={input => {
                this.firstTextInput = input;
              }}
              onChangeText={text => {
                this.secondTextInput.focus();
                this.secondTextInput.setNativeProps({
                  style: [
                    styles.textInputsStyle,
                    { backgroundColor: Textbox_BG_COLOR }
                  ]
                });
                this.setState({ inputBoxOne: text });
              }}
              onFocus={() => {
                this.firstTextInput.setNativeProps({
                  style: [
                    styles.textInputsStyle,
                    { backgroundColor: Textbox_BG_COLOR }
                  ]
                });
              }}
              fontSize={20}
              maxLength={1}
              keyboardType={"numeric"}
              style={styles.textInputsStyle}
            />
          </View>
          <View style={{ width: 8 }} />
          <View style={styles.inputfieldsViewStyle}>
            <TextInput
              ref={input => {
                this.secondTextInput = input;
              }}
              onChangeText={text => {
                this.thirdTextInput.focus();
                this.thirdTextInput.setNativeProps({
                  style: [
                    styles.textInputsStyle,
                    { backgroundColor: Textbox_BG_COLOR }
                  ]
                });
                this.setState({ inputBoxTwo: text });
              }}
              fontSize={20}
              maxLength={1}
              keyboardType={"numeric"}
              style={styles.textInputsStyle}
            />
          </View>
          <View style={{ width: 8 }} />
          <View style={styles.inputfieldsViewStyle}>
            <TextInput
              ref={input => {
                this.thirdTextInput = input;
              }}
              onChangeText={text => {
                this.fourthTextInput.focus();
                this.fourthTextInput.setNativeProps({
                  style: [
                    styles.textInputsStyle,
                    { backgroundColor: Textbox_BG_COLOR }
                  ]
                });
                this.setState({ inputBoxThree: text });
              }}
              fontSize={20}
              maxLength={1}
              keyboardType={"numeric"}
              style={styles.textInputsStyle}
            />
          </View>
          <View style={{ width: 10 }} />
          <View style={styles.inputfieldsViewStyle}>
            <TextInput
              fontSize={20}
              ref={input => {
                this.fourthTextInput = input;
              }}
              onChangeText={text => {
                this.fifthTextInput.focus();
                this.fifthTextInput.setNativeProps({
                  style: [
                    styles.textInputsStyle,
                    { backgroundColor: Textbox_BG_COLOR }
                  ]
                });
                this.setState({ inputBoxFour: text });
              }}
              maxLength={1}
              keyboardType={"numeric"}
              style={styles.textInputsStyle}
            />
          </View>
          <View style={{ width: 8 }} />
          <View style={styles.inputfieldsViewStyle}>
            <TextInput
              fontSize={20}
              ref={input => {
                this.fifthTextInput = input;
              }}
              onChangeText={text => {
                this.sixthTextInput.focus();
                this.sixthTextInput.setNativeProps({
                  style: [
                    styles.textInputsStyle,
                    { backgroundColor: Textbox_BG_COLOR }
                  ]
                });
                this.setState({ inputBoxFive: text });
              }}
              maxLength={1}
              keyboardType={"numeric"}
              style={styles.textInputsStyle}
            />
          </View>

          <View style={{ width: 8 }} />
          <View style={styles.inputfieldsViewStyle}>
            <TextInput
              fontSize={20}
              ref={input => {
                this.sixthTextInput = input;
              }}
              onChangeText={text => this.setState({ inputBoxSix: text })}
              maxLength={1}
              keyboardType={"numeric"}
              style={styles.textInputsStyle}
            />
          </View>
        </View>

        <View style={{ height: 30 }} />
        {this.state.spinnerMove ? (
          <Spinner color={WHITE_COLOR} />
        ) : (
          <CustomButton
            text="Continue"
            onPress={() => {
              if (
                !this.state.inputBoxOne == "" &&
                !this.state.inputBoxTwo == "" &&
                !this.state.inputBoxThree == "" &&
                !this.state.inputBoxFour == "" &&
                !this.state.inputBoxFive == "" &&
                !this.state.inputBoxSix == ""
              ) {
                this.props.codeVerificationForResetPassword(
                  this.props.buyerEmail,
                  this.state.inputBoxOne +
                    this.state.inputBoxTwo +
                    this.state.inputBoxThree +
                    this.state.inputBoxFour +
                    this.state.inputBoxFive +
                    this.state.inputBoxSix,
                  this
                );
              } else {
                Alert.alert("Enter Complete Code");
              }
            }}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  buyerEmail: state.BuyerAuthReducer.buyerEmailForResetPassword
});

export default connect(
  mapStateToProps,
  { codeVerificationForResetPassword }
)(CodeVerificationScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: SCREEN_BG_COLOR
  },
  pageTitleViewStyle: {
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  pageTitleTextStyle: {
    fontSize: LARGE,
    fontWeight: "bold",
    color: WHITE_COLOR
  },
  smallTextStyle: {
    width: "90%",
    height: 20,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  mainViewStyle: {
    flexDirection: "row",
    width: "90%",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center"
  },
  inputfieldsViewStyle: {
    height: 50,
    width: 50,
    backgroundColor: Textbox_BG_COLOR,
    elevation: 1,
    borderRadius: 5
  },
  textInputsStyle: {
    width: "100%",
    height: "100%",
    fontFamily: "mont",
    color: "white",
    textAlign: "center",
    borderRadius: 5
  }
});
