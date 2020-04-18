import React, { Component } from "react";
import { StyleSheet, View, Text, Image, StatusBar, Alert } from "react-native";
import { SCREEN_BG_COLOR, WHITE_COLOR } from "../../../../theme/color";
import CustomTextBox from "../../../components/customComponents/customTextbox";
import CustomButton from "../../../components/customComponents/customButton";
import { LARGE, SMALL, EXTRA_SMALL } from "../../../../theme/font";
import { Spinner } from "native-base";
import AuthValidations from "../../../../appStore/systemValidation/authValidations";
import { setNewPassword } from "../../../store/actions/authActions/authActions";
import { connect } from "react-redux";

class RecoverPasswordScreen extends Component {
  state = {
    password: "",
    isPasswordValid: true,
    securePasswordEntry1: true,
    spinnerMove: false,
    setNewPassword: false
  };

  //Password Validation
  Password_Validation(text) {
    const passwordValid = new AuthValidations().passwordValidation(text);
    if (passwordValid === true) {
      this.setState({ isPasswordValid: true });
      this.setState({ password: text });
    } else {
      this.setState({ isPasswordValid: false });
      this.setState({ password: text });
    }
  }

  toggleEye1 = () => {
    this.setState({ securePasswordEntry1: !this.state.securePasswordEntry1 });
  };

  render() {
    if (this.state.setNewPassword) {
      this.props.navigation.navigate("PartnerLoginScreen");
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
          <Text style={styles.pageTitleTextStyle}>Recover Password</Text>
        </View>
        <View style={styles.smallTextStyle}>
          <Text
            style={{
              fontSize: SMALL,
              color: WHITE_COLOR
            }}
          >
            Set your new Password
          </Text>
        </View>

        <View style={{ height: 10 }} />
        <CustomTextBox
          placeholder="New Password"
          showEye1
          secureTextEntry={this.state.securePasswordEntry1}
          eyeIcon1={this.state.securePasswordEntry1 ? "eye-off" : "eye"}
          onEyePress1={this.toggleEye1}
          onChangeText={text => this.Password_Validation(text)}
        />
        <View style={styles.errorTextViewStyle}>
          {this.state.isPasswordValid ? (
            <Text />
          ) : (
            <Text
              style={{
                paddingLeft: "12%",
                color: "red",
                fontSize: EXTRA_SMALL
              }}
            >
              Password should be 8 character long
            </Text>
          )}
        </View>

        <View style={{ height: 30 }} />
        {this.state.spinnerMove ? (
          <Spinner color={WHITE_COLOR} />
        ) : (
          <CustomButton
            text="Continue"
            onPress={() => {
              if (!this.state.password == "") {
                this.props.setNewPassword(
                  this.props.partnerEmail,
                  this.state.password,
                  this
                );
              } else {
                Alert.alert("Password is required");
              }
            }}
          />
        )}
      </View>
    );
  }
}
const mapStateToProps = state => ({
  partnerEmail: state.PartnerAuthReducer.partnerEmailForResetPassword
});

export default connect(
  mapStateToProps,
  { setNewPassword }
)(RecoverPasswordScreen);

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
