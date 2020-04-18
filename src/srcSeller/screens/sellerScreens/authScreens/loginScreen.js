import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
  ImageBackground
} from "react-native";
import {
  SCREEN_BG_COLOR,
  WHITE_COLOR,
  STATUS_BAR,
  Button_BG_COLOR
} from "../../../../theme/color";
import CustomTextBox from "../../../components/customComponents/customTextbox";
import CustomButton from "../../../components/customComponents/customButton";
import { LARGE, SMALL, EXTRA_SMALL } from "../../../../theme/font";
import AuthValidations from "../../../../appStore/systemValidation/authValidations";
import { sellerLogin } from "../../../store/actions/authActions/authActions";
import { loadUserAction } from "../../../../appStore/loadUser/loadUserAction";
import {
  showAllMeals,
  showAllBreakfast,
  showAllLunch,
  showAllDinner
} from "../../../store/actions/mealAction/mealAction";
import MyAuthClass from "../../../../businessLogic/MyAuth/MyAuth";
import { connect } from "react-redux";
import { Spinner } from "native-base";
import { NavigationActions, StackActions } from "react-navigation";

class LoginScreen extends Component {
  state = {
    email: "",
    password: "",
    isEmailValid: true,
    isPasswordValid: true,
    securePasswordEntry1: true,
    spinnerMove: false,
    loginSuccess: false,
    sellerType: ""
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
    if (this.state.loginSuccess) {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "SellerAppDrawer" })]
      });
      this.props.navigation.dispatch(resetAction);
    }
    return (
      <ImageBackground
        source={require("../../../../images/loginScreeBackground.jpeg")}
        style={styles.container}
      >
        <StatusBar backgroundColor={STATUS_BAR} barStyle="light-content" />
        <View>
          <Image
            resizeMode={"stretch"}
            source={require("../../../../images/GoodBessLogo.png")}
            style={{ height: 100, width: 200, alignSelf: "center" }}
          />
        </View>
        <View style={styles.pageTitleViewStyle}>
          <Text style={styles.pageTitleTextStyle}>Signin</Text>
        </View>
        <View
          style={{
            backgroundColor: STATUS_BAR,
            width: "90%",
            opacity: 0.8,

            alignSelf: "center",
            borderRadius: 10,
            elevation: 10
          }}
        >
          <View style={{ height: 30 }}></View>
          <CustomTextBox
            iconColor={Button_BG_COLOR}
            placeholderTextColor={"black"}
            backgroundColor={"white"}
            borderColor={"white"}
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
            color="black"
            iconColor={Button_BG_COLOR}
            placeholderTextColor={"black"}
            backgroundColor={"white"}
            borderColor={"white"}
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

          <View style={styles.forgetViewStyle}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("SellerForgetPasswordScreen")
              }
            >
              <Text style={styles.forgetTextStyle}>Forget Password?</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 20 }} />
          {this.state.spinnerMove ? (
            <Spinner color={"white"} />
          ) : (
            <CustomButton
              text="Login"
              onPress={() => {
                if (!this.state.email == "" && !this.state.password == "") {
                  this.props.sellerLogin(
                    new MyAuthClass().setLogin(
                      this.state.email,
                      this.state.password
                    ),
                    this
                  );
                } else {
                  Alert.alert("Fields are empty or invalid");
                }
              }}
            />
          )}

          <View style={styles.textMainViewStyle}>
            <View style={styles.leftTextViewStyle}>
              <Text style={{ color: WHITE_COLOR, fontSize: SMALL }}>
                Don't have an account?
              </Text>
            </View>
            <TouchableOpacity
              style={styles.rightTextViewStyle}
              onPress={() =>
                this.props.navigation.navigate("SellerSignUpScreen")
              }
            >
              <Text style={{ color: WHITE_COLOR, fontSize: SMALL }}>
                Create Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  loginMsg: state.SellerAuthReducer.SellerLoginData.msg
});

export default connect(mapStateToProps, {
  sellerLogin,
  showAllMeals,
  showAllBreakfast,
  showAllLunch,
  showAllDinner,
  loadUserAction
})(LoginScreen);

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
  forgetViewStyle: {
    height: 30,
    width: "80%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  forgetTextStyle: { color: WHITE_COLOR, fontSize: SMALL },
  textMainViewStyle: {
    height: 40,
    width: "70%",
    alignSelf: "center",
    flexDirection: "row"
  },
  leftTextViewStyle: {
    flex: 1.1,
    justifyContent: "center",
    alignItems: "center"
  },
  rightTextViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start"
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
