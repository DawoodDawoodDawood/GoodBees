import React, { Component } from "react";
import { View, StatusBar, Text, StyleSheet, Alert } from "react-native";
import { Container, Content, Spinner } from "native-base";
import { Button_BG_COLOR } from "../../../../theme/color";
import ImagePicker from "react-native-image-crop-picker";
import CustomProfileView from "../../../components/customComponents/customProfileView";
import CustomTextarea from "../../../components/customComponents/customTextarea";
import CustomButton from "../../../components/customComponents/customButton";
import { connect } from "react-redux";
import { signupProfile } from "../../../store/actions/authActions/authActions";
import MyAuth from "../../../businessLogic/MyAuth";
import { LARGE, EXTRA_SMALL, SMALL } from "../../../../theme/font";
import {
  SCREEN_BG_COLOR,
  WHITE_COLOR,
  Textbox_BG_COLOR
} from "../../../../theme/color";
import Geolocation from "@react-native-community/geolocation";
import CustomTextBox from "../../../components/customComponents/customTextbox";
class PartnerProfileScreen extends Component {
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
    address: "",
    longitude: "",
    latitude: "",
    showImage: false,
    spinnerMove: false,
    signupSuccess: false,
    postalCode: "",
    isPostalCode: true
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
      this.props.navigation.navigate("PartnerLoginScreen");
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
            width={"85%"}
            backgroundColor={"white"}
            maxLength={6}
            value={this.state.postalCode}
            placeholder="Postal Code"
            keyboardType="default"
            onChangeText={text => {
              this.setState({ postalCode: text });
              if (text === "" || text.length < 6) {
                this.setState({ isPostalCode: false });
              } else {
                this.setState({ isPostalCode: true });
              }
            }}
          />
          <View style={styles.errorTextViewStyle}>
            {this.state.isPostalCode ? (
              <View />
            ) : (
              <Text style={styles.errorTextStyle}>Enter Valid Postal Code</Text>
            )}
          </View>
          <View style={{ height: 10 }} />
          <CustomTextarea
            title={"Enter Address"}
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
                  this.state.address &&
                  this.state.longitude &&
                  this.state.latitude &&
                  this.state.postalCode
                ) {
                  this.props.signupProfile(
                    new MyAuth().setSignupProfile(
                      this.props.partnerSignup.partnerName,
                      this.props.partnerSignup.email,
                      this.props.partnerSignup.password,
                      this.props.partnerSignup.phone,
                      this.state.postalCode,
                      this.state.address,
                      {
                        longitude: this.state.longitude,
                        latitude: this.state.latitude
                      }
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
  partnerSignup: state.PartnerAuthReducer.partnerSignupCredentials
});

export default connect(
  mapStateToProps,
  { signupProfile }
)(PartnerProfileScreen);

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
