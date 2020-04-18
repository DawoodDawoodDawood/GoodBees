import React, { Component } from "react";
import { StyleSheet, View, Text, StatusBar, Image, Alert } from "react-native";
import {
  SCREEN_BG_COLOR,
  WHITE_COLOR,
  Button_BG_COLOR
} from "../../../../theme/color";
import { Spinner } from "native-base";
import CustomTextBox from "../../../components/customComponents/customTextbox";
import CustomButton from "../../../components/customComponents/customButton";
import { LARGE, SMALL, EXTRA_SMALL } from "../../../../theme/font";
import AuthValidations from "../../../../appStore/systemValidation/authValidations";
import { connect } from "react-redux";
import { sendEmailForResetPassword } from "../../../store/actions/authActions/authActions";
class ForgetPasswordScreen extends Component {
  state = {
    email: "",
    isEmailValid: true,
    spinnerMove: false,
    emailValidate: false
  };

  //Email Validation
  Email_Validation(text) {
    const emailValid = new AuthValidations().emailValidation(text);
    if (emailValid === true) {
      this.setState({ isEmailValid: true });
      this.setState({ email: text });
    } else {
      this.setState({ isEmailValid: false });
      this.setState({ email: text });
    }
  }

  render() {
    if (this.state.emailValidate) {
      this.props.navigation.navigate("PartnerCodeVerificationScreen");
    }
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={Button_BG_COLOR} barStyle="light-content" />
        <View>
          <Image
            resizeMode={"stretch"}
            source={require("../../../../images/GoodBessLogo.png")}
            style={{ height: 100, width: 200, alignSelf: "center" }}
          />
        </View>
        <View style={styles.pageTitleViewStyle}>
          <Text style={styles.pageTitleTextStyle}>Forget Password</Text>
        </View>
        <View style={styles.smallTextStyle}>
          <Text
            style={{
              fontSize: SMALL,
              color: WHITE_COLOR
            }}
          >
            Enter your email for recover your account
          </Text>
        </View>
        <View style={{ height: 10 }} />
        <CustomTextBox
          placeholder="Email Address"
          keyboardType="email-address"
          onChangeText={text => this.Email_Validation(text)}
        />
        <View style={styles.errorTextViewStyle}>
          {this.state.isEmailValid ? (
            <View />
          ) : (
            <Text style={styles.errorTextStyle}>
              Please enter correct email
            </Text>
          )}
        </View>

        <View style={{ height: 30 }} />
        {this.state.spinnerMove ? (
          <Spinner color={"white"} />
        ) : (
          <CustomButton
            text="Reset Password"
            onPress={() => {
              if (!this.state.email == "") {
                this.props.sendEmailForResetPassword(this.state.email, this);
              } else {
                Alert.alert("Email is required");
              }
            }}
          />
        )}
      </View>
    );
  }
}

export default connect(
  null,
  { sendEmailForResetPassword }
)(ForgetPasswordScreen);

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
  errorTextViewStyle: {
    height: 12,
    justifyContent: "center"
  },
  errorTextStyle: {
    paddingLeft: "12%",
    color: "red",
    fontSize: EXTRA_SMALL
  }
});
