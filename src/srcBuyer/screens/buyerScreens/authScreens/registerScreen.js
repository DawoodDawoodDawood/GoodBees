import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  ScrollView,
  Alert,
  TouchableOpacity
} from "react-native";
import { Spinner } from "native-base";
import {
  SCREEN_BG_COLOR,
  WHITE_COLOR,
  Button_BG_COLOR,
  Textbox_BG_COLOR
} from "../../../../theme/color";
import CustomTextBox from "../../../components/customComponents/customTextbox";
import CustomButton from "../../../components/customComponents/customButton";
import { LARGE, EXTRA_SMALL, SMALL } from "../../../../theme/font";
import AuthValidations from "../../../../appStore/systemValidation/authValidations";
import { connect } from "react-redux";
import {
  phoneVerificationForSignup,
  codeMatchingForSignup,
  signupCredential
} from "../../../store/actions/authActions/authActions";
import MyAuth from "../../../businessLogic/MyAuth/MyAuth";

class RegisterScreen extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    verificationCode: "",
    password: "",
    confirmPassword: "",
    isNameValid: true,
    isEmailValid: true,
    isPhoneValid: true,
    isVerificationCodeValid: true,
    isPasswordValid: true,
    isConfirmPasswordValid: true,
    securePasswordEntry1: true,
    securePasswordEntry2: true,
    toggleMode: false,
    spinnerMove1: false,
    spinnerMove2: false,
    phoneValidate: false,
    codeValidate: false
  };

  //Name Validation
  Name_Validation(text) {
    const nameValid = new AuthValidations().nameValidation(text);
    if (nameValid === true) {
      this.setState({ isNameValid: true });
      this.setState({ name: text });
    } else {
      this.setState({ isNameValid: false });
      this.setState({ name: text });
    }
  }

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

  //Phone Validation
  Phone_Validation(text) {
    const phoneValid = new AuthValidations().phoneValidation(text);
    if (phoneValid === true) {
      this.setState({ isPhoneValid: true });
      this.setState({ phone: text });
    } else {
      this.setState({ isPhoneValid: false });
      this.setState({ phone: text });
    }
  }

  //Code Validation
  Code_Validation(text) {
    const codeValid = new AuthValidations().codeValidation(text);
    if (codeValid === true) {
      this.setState({ isVerificationCodeValid: true });
      this.setState({ verificationCode: text });
    } else {
      this.setState({ isVerificationCodeValid: false });
      this.setState({ verificationCode: text });
    }
  }

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

  //Confirm Password Validation
  ConfirmPassword_Validation(text) {
    const confirmPasswordValid = new AuthValidations().passwordValidation(text);
    if (confirmPasswordValid === true) {
      this.setState({ isConfirmPasswordValid: true });
      this.setState({ confirmPassword: text });
    } else {
      this.setState({ isConfirmPasswordValid: false });
      this.setState({ confirmPassword: text });
    }
  }

  toggleEye1 = () => {
    this.setState({ securePasswordEntry1: !this.state.securePasswordEntry1 });
  };
  toggleEye2 = () => {
    this.setState({ securePasswordEntry2: !this.state.securePasswordEntry2 });
  };

  toggleField = () => {
    this.setState({ toggleMode: !this.state.toggleMode });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={Button_BG_COLOR} barStyle="light-content" />
        <ScrollView>
          <View style={{ height: 25 }} />
          <View>
            <Image
              resizeMode={"stretch"}
              source={require("../../../../images/GoodBessLogo.png")}
              style={{ height: 100, width: 200, alignSelf: "center" }}
            />
          </View>
          <View style={styles.pageTitleViewStyle}>
            <Text style={styles.pageTitleTextStyle}>SignUp</Text>
          </View>
          <CustomTextBox
            placeholder="Name"
            keyboardType="default"
            onChangeText={text => this.Name_Validation(text)}
          />
          <View style={styles.errorTextViewStyle}>
            {this.state.isNameValid ? (
              <View />
            ) : (
              <Text style={styles.errorTextStyle}>Please enter name</Text>
            )}
          </View>
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
          <CustomTextBox
            placeholder="Phone"
            keyboardType="phone-pad"
            onChangeText={text => this.Phone_Validation(text)}
          />
          <View style={styles.errorTextViewStyle}>
            {this.state.isPhoneValid ? (
              <View />
            ) : (
              <Text style={styles.errorTextStyle}>
                Please enter correct phone number
              </Text>
            )}
          </View>

          {this.state.spinnerMove1 ? (
            <Spinner color={WHITE_COLOR} />
          ) : (
            <React.Fragment>
              {!this.state.phoneValidate ? (
                <React.Fragment>
                  <View style={{ height: 5 }} />
                  <CustomButton
                    width={"40%"}
                    height={35}
                    text="Verify Phone"
                    onPress={() => {
                      this.toggleField();
                      if (
                        !this.state.phone == "" &&
                        this.state.isPhoneValid == true
                      ) {
                        this.props.phoneVerificationForSignup(
                          this.state.phone,
                          this
                        );
                      } else {
                        Alert.alert("Phone Number Required/Invalid");
                      }
                    }}
                  />
                  <View style={{ height: 5 }} />
                </React.Fragment>
              ) : (
                false
              )}
            </React.Fragment>
          )}

          {this.state.toggleMode && !this.state.codeValidate ? (
            <React.Fragment>
              <CustomTextBox
                placeholder="Verification Code"
                keyboardType="number-pad"
                onChangeText={text => this.Code_Validation(text)}
              />
              <View style={styles.errorTextViewStyle}>
                {this.state.isVerificationCodeValid ? (
                  <View />
                ) : (
                  <Text style={styles.errorTextStyle}>
                    Please enter correct code
                  </Text>
                )}
              </View>
            </React.Fragment>
          ) : (
            false
          )}

          {this.state.toggleMode && !this.state.codeValidate ? (
            <React.Fragment>
              <View style={{ height: 5 }} />
              {this.state.spinnerMove2 ? (
                <Spinner color={WHITE_COLOR} />
              ) : (
                <CustomButton
                  width={"40%"}
                  height={35}
                  text="Verify Code"
                  onPress={() => {
                    if (
                      !this.state.verificationCode == "" &&
                      this.state.isVerificationCodeValid == true
                    ) {
                      this.props.codeMatchingForSignup(
                        this.state.phone,
                        this.state.verificationCode,
                        this
                      );
                    } else {
                      Alert.alert("Code is Required/Invalid");
                    }
                  }}
                />
              )}
              <View style={{ height: 5 }} />
            </React.Fragment>
          ) : (
            false
          )}

          <CustomTextBox
            placeholder="Password"
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
                Password should be 8 characcter long
              </Text>
            )}
          </View>

          <CustomTextBox
            placeholder="Confirm Password"
            showEye2
            secureTextEntry={this.state.securePasswordEntry2}
            eyeIcon2={this.state.securePasswordEntry2 ? "eye-off" : "eye"}
            onEyePress2={this.toggleEye2}
            onChangeText={text => this.ConfirmPassword_Validation(text)}
          />
          <View style={styles.errorTextViewStyle}>
            {this.state.isConfirmPasswordValid ? (
              <Text />
            ) : (
              <Text
                style={{
                  paddingLeft: "12%",
                  color: "red",
                  fontSize: EXTRA_SMALL
                }}
              >
                Confirm Password should be 8 characcter long
              </Text>
            )}
          </View>

          {this.state.codeValidate ? (
            <React.Fragment>
              <View style={{ height: 20 }} />
              {this.state.spinnerMove ? (
                <Spinner color={WHITE_COLOR} />
              ) : (
                <CustomButton
                  text="Continue"
                  onPress={() => {
                    if (
                      !this.state.name == "" &&
                      !this.state.email == "" &&
                      !this.state.phone == "" &&
                      !this.state.password == "" &&
                      !this.state.confirmPassword == "" &&
                      this.state.isNameValid == true &&
                      this.state.isEmailValid == true &&
                      this.state.isPhoneValid == true &&
                      this.state.isPasswordValid == true &&
                      this.state.isConfirmPasswordValid == true &&
                      this.state.password == this.state.confirmPassword
                    ) {
                      this.props.signupCredential(
                        new MyAuth().setSignupCredentials(
                          this.state.name,
                          this.state.email,
                          this.state.password,
                          this.state.phone
                        )
                      );
                      this.props.navigation.navigate("BuyerProfileScreen");
                    } else {
                      Alert.alert(
                        "Some fields are empty/invalid or both passwords does not match"
                      );
                    }
                  }}
                />
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <View style={{ height: 20 }} />
              <CustomButton
                text="Continue"
                mainButtonBgColor={Textbox_BG_COLOR}
              />
            </React.Fragment>
          )}

          <View style={styles.textMainViewStyle}>
            <View style={styles.leftTextViewStyle}>
              <Text style={{ color: WHITE_COLOR, fontSize: SMALL }}>
                Already have an account?
              </Text>
            </View>
            <TouchableOpacity
              style={styles.rightTextViewStyle}
              onPress={() => this.props.navigation.navigate("BuyerLoginScreen")}
            >
              <Text style={{ color: WHITE_COLOR, fontSize: SMALL }}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  null,
  {
    phoneVerificationForSignup,
    codeMatchingForSignup,
    signupCredential
  }
)(RegisterScreen);

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
  errorTextViewStyle: {
    height: 10,
    justifyContent: "center"
  },
  errorTextStyle: {
    paddingLeft: "12%",
    color: "red",
    fontSize: EXTRA_SMALL
  },
  textMainViewStyle: {
    height: 40,
    width: "70%",
    marginLeft: "15%",
    alignSelf: "center",
    flexDirection: "row"
  },
  leftTextViewStyle: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center"
  },
  rightTextViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start"
  }
});
