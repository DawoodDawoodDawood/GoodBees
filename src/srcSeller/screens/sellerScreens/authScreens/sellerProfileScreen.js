import React, { Component } from "react";
import { StyleSheet, View, StatusBar, Alert } from "react-native";
import { Container, Content, Spinner } from "native-base";
import {
  SCREEN_BG_COLOR,
  WHITE_COLOR,
  Button_BG_COLOR
} from "../../../../theme/color";
import CustomTextBox from "../../../components/customComponents/customTextbox";
import ImagePicker from "react-native-image-crop-picker";
import CustomProfileView from "../../../components/customComponents/customProfileView";
import CustomCheckbox from "../../../components/customComponents/customCheckbox";
import CustomTextarea from "../../../components/customComponents/customTextarea";
import CustomButton from "../../../components/customComponents/customButton";
import { connect } from "react-redux";
import { signupProfile } from "../../../store/actions/authActions/authActions";
import MyAuth from "../../../../businessLogic/MyAuth/MyAuth";

import Geolocation from "@react-native-community/geolocation";
class SellerProfileScreen extends Component {
  componentDidMount() {
    const data = this.props.navigation.getParam("sellerType", "");
    this.setState({ sellerType: data });
    if (data === "ORGANIZATION") {
      this.setState({ breakfast: true });
    }
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
    sellerType: "",
    lunch: false,
    dinner: false,
    halal: false,
    notHalal: false,
    address: "",
    longitude: 0,
    latitude: 0,
    showImage: false,
    spinnerMove: false,
    signupSuccess: false,
    delivery: false,
    selfPickUp: false,
    postalCode: ""
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
    if (this.state.signupSuccess === true) {
      this.props.navigation.navigate("SellerLoginScreen");
    }

    return (
      <Container>
        <StatusBar backgroundColor={Button_BG_COLOR} barStyle="light-content" />
        <Content>
          <CustomProfileView
            showCumulative
            buttonText={"Upload Picture"}
            showButton
            marginTop={35}
            showImage={this.state.showImage}
            image={this.state.image}
            SelectImage={this.SelectImage}
            onBackButtonPress={() => this.props.navigation.goBack()}
          />

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
          <CustomCheckbox
            text="Service Type"
            firstText="SelfPickUp"
            secondText="Delivery"
            onPress1={() =>
              this.setState({ selfPickUp: !this.state.selfPickUp })
            }
            check1={this.state.selfPickUp}
            onPress2={() => this.setState({ delivery: !this.state.delivery })}
            check2={this.state.delivery}
          />
          <CustomTextarea
            title={"Enter Address"}
            onChangeText={text => this.setState({ address: text })}
          />
          <CustomTextBox
            maxLength={6}
            placeholder="Postal Code"
            keyboardType="number-pad"
            onChangeText={text => this.setState({ postalCode: text })}
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
                  this.state.postalCode &&
                  (this.state.veg == true || this.state.nonVeg == true) &&
                  (this.state.breakfast == true ||
                    this.state.lunch == true ||
                    this.state.dinner == true) &&
                  (this.state.halal == true || this.state.notHalal == true) &&
                  !this.state.address == "" &&
                  !this.state.longitude == "" &&
                  !this.state.latitude == "" &&
                  (this.state.delivery == true || this.state.selfPickUp == true)
                ) {
                  this.props.signupProfile(
                    new MyAuth().setSignupProfile(
                      this.props.sellerSignup.sellerTypeID,
                      this.props.sellerSignup.sellerName,
                      this.props.sellerSignup.email,
                      this.props.sellerSignup.password,
                      this.props.sellerSignup.phone,
                      this.state.postalCode,
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
                      this.state.address,
                      {
                        longitude: this.state.longitude,
                        latitude: this.state.latitude
                      },
                      this.state.delivery,
                      this.state.selfPickUp
                    ),
                    this.state.image,
                    this
                  );
                } else {
                  Alert.alert("Some data is missing while signup the seller");
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
  sellerSignup: state.SellerAuthReducer.signupCredentials
});

export default connect(
  mapStateToProps,
  { signupProfile }
)(SellerProfileScreen);

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
  buttonTextStyle: { height: 35, alignSelf: "center", borderRadius: 3 }
});
