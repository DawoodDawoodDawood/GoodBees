import React, { Component } from "react";
import { StyleSheet, Text, View, StatusBar, Alert } from "react-native";
import { Container, Content, Spinner } from "native-base";
import {
  SCREEN_BG_COLOR,
  WHITE_COLOR,
  Button_BG_COLOR,
  Textbox_BG_COLOR
} from "../../../../theme/color";
import ImagePicker from "react-native-image-crop-picker";
import CustomProfileView from "../../../components/customComponents/customProfileView";
import CustomCheckbox from "../../../components/customComponents/customCheckbox";
import CustomTextarea from "../../../components/customComponents/customTextarea";
import CustomButton from "../../../components/customComponents/customButton";
import { connect } from "react-redux";
import { signupProfile } from "../../../store/actions/authActions/authActions";
import MyAuth from "../../../businessLogic/MyAuth/MyAuth";
import Geolocation from "@react-native-community/geolocation";
import CustomTextBox from "../../../components/customComponents/customTextbox";
class BuyerProfileScreen extends Component {
  componentDidMount() {
    Geolocation.getCurrentPosition(info =>
      this.setState({
        longitude: info.coords.longitude,
        latitude: info.coords.latitude
      })
    );
  }

  state = {
    image: null,
    veg: false,
    nonVeg: false,
    breakfast: false,
    lunch: false,
    dinner: false,
    halal: false,
    notHalal: false,
    alergicDetail: "",
    address: "",
    longitude: "",
    latitude: "",
    showImage: false,
    spinnerMove: false,
    signupSuccess: false,
    age: "",
    postalcode: "",
    ageValidate: true,
    postalCodeValidate: true
  };

  SelectImage = () => {
    this.setState({ showImage: false });
    ImagePicker.openPicker({
      width: 200,
      height: 100
    }).then(image => {
      console.log(image);
      let imgSource = {
        uri: image.path,
        type: image.mime,
        name: image.path.replace(/^.*[\\\/]/, "")
      };
      this.setState({ image: imgSource, showImage: true });
    });
  };

  render() {
    if (this.state.signupSuccess) {
      this.props.navigation.navigate("BuyerLoginScreen");
    }
    return (
      <Container>
        <StatusBar backgroundColor={Button_BG_COLOR} barStyle="light-content" />
        <Content>
          <CustomProfileView
            buttonText={"Upload Picture"}
            showButton
            marginTop={35}
            showImage={this.state.showImage}
            image={this.state.image}
            SelectImage={this.SelectImage}
          />
          <View style={{ height: 10 }} />

          <CustomTextBox
            placeholder="Age"
            keyboardType="number-pad"
            backgroundColor={"#EBF8EB"}
            maxLength={2}
            value={this.state.age}
            onChangeText={text => {
              this.setState({ age: text });

              if (text === "") {
                this.setState({ ageValidate: false });
              } else {
                this.setState({ ageValidate: true });
              }
            }}
          />
          <View style={{ height: 10 }} />
          <View style={styles.errorTextViewStyle}>
            {this.state.ageValidate ? (
              <View />
            ) : (
              <Text style={styles.errorTextStyle}>Enter your age</Text>
            )}
          </View>
          <View style={{ height: 10 }} />

          <CustomTextBox
            placeholder="Postal Code"
            backgroundColor={"white"}
            keyboardType="number-pad"
            maxLength={6}
            onChangeText={text => {
              this.setState({ postalcode: text });

              if (text === "") {
                this.setState({ postalcode: false });
              }
            }}
          />
          <View style={{ height: 10 }} />
          <View style={styles.errorTextViewStyle}>
            {this.state.postalCodeValidate ? (
              <View />
            ) : (
              <Text style={styles.errorTextStyle}>Enter Postal Code</Text>
            )}
          </View>
          <View style={{ height: 10 }} />
          <CustomCheckbox
            onPress1={() => this.setState({ veg: !this.state.veg })}
            check1={this.state.veg}
            onPress2={() => this.setState({ nonVeg: !this.state.nonVeg })}
            check2={this.state.nonVeg}
            text="Food Type"
            firstText="Veg"
            secondText="Non-Veg"
          />
          <CustomCheckbox
            text="Food For"
            showThird
            firstText="Breakfast"
            secondText="Lunch"
            thirdText="Dinner"
            onPress1={() => this.setState({ breakfast: !this.state.breakfast })}
            check1={this.state.breakfast}
            onPress2={() => this.setState({ lunch: !this.state.lunch })}
            check2={this.state.lunch}
            onPress3={() => this.setState({ dinner: !this.state.dinner })}
            check3={this.state.dinner}
          />
          <CustomCheckbox
            text="Food Category"
            firstText="Halal"
            secondText="Not-Halal"
            onPress1={() => this.setState({ halal: !this.state.halal })}
            check1={this.state.halal}
            onPress2={() => this.setState({ notHalal: !this.state.notHalal })}
            check2={this.state.notHalal}
          />
          <CustomTextarea
            title={"Alergic Deatails"}
            backgroundColor={"#EBF8EB"}
            onChangeText={text => this.setState({ alergicDetail: text })}
          />
          <CustomTextarea
            title={"Enter Address"}
            rowSpan={4}
            backgroundColor={"#EBF8EB"}
            onChangeText={text => this.setState({ address: text })}
          />

          <View style={{ height: 40 }} />
          {this.state.spinnerMove ? (
            <Spinner color={Button_BG_COLOR} />
          ) : (
            <CustomButton
              text={"SignUp"}
              width="85%"
              onPress={() => {
                if (
                  this.state.image &&
                  (this.state.veg == true || this.state.nonVeg == true) &&
                  (this.state.breakfast == true ||
                    this.state.lunch == true ||
                    this.state.dinner == true) &&
                  (this.state.halal == true || this.state.notHalal == true) &&
                  this.state.alergicDetail &&
                  !this.state.address == "" &&
                  !this.state.longitude == "" &&
                  !this.state.latitude == ""
                ) {
                  this.props.signupProfile(
                    new MyAuth().setSignupProfile(
                      this.props.buyerSignup.buyerName,
                      this.props.buyerSignup.email,
                      this.props.buyerSignup.password,
                      this.props.buyerSignup.phone,
                      this.state.postalcode,
                      {
                        veg: this.state.veg,
                        nonVeg: this.state.nonVeg
                      },
                      {
                        breakFast: this.state.breakfast,
                        lunch: this.state.lunch,
                        dinner: this.state.dinner
                      },
                      {
                        halal: this.state.halal,
                        notHalal: this.state.notHalal
                      },
                      this.state.alergicDetail,
                      this.state.address,
                      this.state.age,
                      {
                        longitude: this.state.longitude,
                        latitude: this.state.latitude
                      }
                    ),
                    this.state.image,
                    this
                  );
                } else {
                  Alert.alert("Some data is missing while signup the buyer");
                }
              }}
            />
          )}

          <View style={{ height: 10 }} />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  buyerSignup: state.BuyerAuthReducer.buyerSignupCredentials
});

export default connect(
  mapStateToProps,
  { signupProfile }
)(BuyerProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE_COLOR
  },
  imageViewStyle: {
    height: 120,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: SCREEN_BG_COLOR
  },
  logoStyle: {
    height: 100,
    width: 100,
    borderRadius: 100,
    zIndex: 999,
    alignSelf: "center",
    marginTop: 120
  },
  buttonViewStyle: {
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonTextStyle: { height: 35, alignSelf: "center", borderRadius: 3 },

  pageTitleViewStyle: {
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  pageTitleTextStyle: {
    fontSize: 18,
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
    fontSize: 14
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
