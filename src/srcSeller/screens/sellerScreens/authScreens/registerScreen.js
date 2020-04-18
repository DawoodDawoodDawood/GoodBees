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
  Textbox_BG_COLOR,
  ALERT_ERROR_COLOR
} from "../../../../theme/color";
import { alertMsgActionForComponents } from "../../../../appStore/alertMsg/alertAction";
import CustomTextBox from "../../../components/customComponents/customTextbox";
import CustomButton from "../../../components/customComponents/customButton";
import { LARGE, EXTRA_SMALL, SMALL } from "../../../../theme/font";
import AuthValidations from "../../../../appStore/systemValidation/authValidations";
import CustomDropdown from "../../../components/customComponents/customDropdown";
import { connect } from "react-redux";
import {
  phoneVerificationForSignup,
  codeMatchingForSignup,
  signupCredential,
  sellerTypeList
} from "../../../store/actions/authActions/authActions";
import MyAuth from "../../../../businessLogic/MyAuth/MyAuth";
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
    codeValidate: false,
    sellerType: "",
    sellerTypeArray: [],
    sellerTypeId: ""
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
  componentDidMount() {
    this.props.sellerTypeList(this);
  }
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
          <View style={{ height: 30 }} />

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
          <CustomDropdown
            width={"80%"}
            onValueChange={text =>
              this.state.sellerTypeArray.forEach(item => {
                if (item.selerTypesName === text) {
                  this.setState({ sellerTypeId: item._id, sellerType: text });
                }
              })
            }
            value={this.state.sellerType}
            pickerArray={this.props.sellerTypeLis}
            backgroundColor={Textbox_BG_COLOR}
            title="Select Bussiness Type"
          />
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
                      if (
                        !this.state.phone == "" &&
                        this.state.phone.length >= 11 &&
                        this.state.isPhoneValid == true
                      ) {
                        this.props.phoneVerificationForSignup(
                          this.state.phone,
                          this
                        );
                        // this.toggleField();
                      } else {
                        this.props.alertMsgActionForComponents({
                          data: {
                            msg: "Phone Number Required/Invalid"
                          },
                          success: true,
                          alert: "Phone Number",
                          alertIconName: "check-circle",
                          alertColor: ALERT_ERROR_COLOR
                        });
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

          {this.props.verifyPhone && !this.state.codeValidate ? (
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

          {this.props.verifyPhone && !this.state.codeValidate ? (
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
                      this.props.alertMsgActionForComponents({
                        data: {
                          msg: "Code is Required/Invalid"
                        },
                        success: true,
                        alert: "Phone Verify",
                        alertIconName: "check-circle",
                        alertColor: ALERT_ERROR_COLOR
                      });
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
                          this.state.sellerTypeId,
                          this.state.name,
                          this.state.email,
                          this.state.password,
                          this.state.phone
                        )
                      );
                      this.props.navigation.navigate("SellerProfileScreen", {
                        sellerType: this.state.sellerType
                      });
                    } else {
                      this.props.alertMsgActionForComponents({
                        data: {
                          msg: "Something is missing or Password does,nt match"
                        },
                        success: true,
                        alert: "Signup",
                        alertIconName: "check-circle",
                        alertColor: ALERT_ERROR_COLOR
                      });
                      // Alert.alert(
                      //   "Some fields are empty/invalid or both passwords does not match"
                      // );
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
                backgroundColor={Textbox_BG_COLOR}
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
              onPress={() =>
                this.props.navigation.navigate("SellerLoginScreen")
              }
            >
              <Text style={{ color: WHITE_COLOR, fontSize: SMALL }}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  sellerTypeLis: state.SellerAuthReducer.sellerTypeListData,
  verifyPhone: state.SellerAuthReducer.phoneVerify
});

export default connect(
  mapStateToProps,
  {
    phoneVerificationForSignup,
    codeMatchingForSignup,
    alertMsgActionForComponents,
    signupCredential,
    sellerTypeList
  }
)(RegisterScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: SCREEN_BG_COLOR
  },
  pageTitleViewStyle: {
    flex: 1,
    flexDirection: "row",
    flex: 1,
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
