import React, { Component } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { Text, Button, Container, Content, CheckBox } from "native-base";
import {
  SCREEN_BG_COLOR,
  WHITE_COLOR,
  Button_BG_COLOR,
} from "../../../theme/color";
import CustomProfileView from "../../components/customComponents/customProfileView";
import CustomCheckbox from "../../components/customComponents/customCheckbox";
import CustomTextarea from "../../components/customComponents/customTextarea";
import CustomButton from "../../components/customComponents/customButton";
import CustomTextBox from "../../components/customComponents/customTextbox";
import CustomText from "../../components/customComponents/customText";
import {
  showPatnerProfile,
  updatePatnerProfile,
} from "../../store/actions/authActions/authActions";
import { connect } from "react-redux";
import { loadUserAction } from "../../../appStore/loadUser/loadUserAction";
import MyAuth from "../../businessLogic/MyAuth";
import ImagePicker from "react-native-image-crop-picker";
class EditInfoScreen extends Component {
  state = {
    check: false,
    toggleMode: false,
    _id: "",

    email: "",
    phoneNumber: "",
    address: "",
    partnerImgURL: "",
    postalCode: "",
    partnerPoints: "",
    partnerName: "",
    showImage: false,
    spinnerMove: false,
    longitude: "",
    latitude: "",
    patnerPoints: "",
  };

  toggleButton = () => {
    this.setState({ toggleMode: !this.state.toggleMode });
  };

  toggleCheckBox = () => {
    this.setState({ check: !this.state.check });
  };
  componentDidMount() {
    this.props.showPatnerProfile(this.props.patnerID._id, this);
  }
  SelectImage = () => {
    this.setState({ showImage: false });
    ImagePicker.openPicker({
      width: 200,
      height: 100,
    }).then((image) => {
      let imgSource = {
        uri: image.path,
        type: image.mime,
        name: image.path.replace(/^.*[\\\/]/, ""),
      };
      this.setState({ image: imgSource, showImage: true });
    });
  };
  render() {
    return (
      <Container>
        <StatusBar backgroundColor={Button_BG_COLOR} barStyle="light-content" />
        <Content>
          <CustomProfileView
            showCumulative
            patnerPoints={this.state.patnerPoints}
            onPressBack={() => this.props.navigation.goBack()}
            imageURL={this.state.partnerImgURL}
            showImage={this.state.showImage}
            image={this.state.image}
            SelectImage={this.SelectImage}
            buttonText={"Edit Profile"}
            showButton={this.state.toggleMode}
          />

          <View style={{ height: 10 }} />
          {this.state.toggleMode ? (
            <CustomTextBox
              width={"85%"}
              value={this.state.partnerName}
              onChangeText={(text) => this.setState({ partnerName: text })}
              backgroundColor={WHITE_COLOR}
              placeholder={"Name"}
            />
          ) : (
            <CustomText
              titleText="Name"
              description={this.state.partnerName}
              iconName={"user"}
            />
          )}
          {/* {this.state.toggleMode ? ( */}
          {/* <CustomTextBox
              value={this.state.email}
              placeholder="Email Address"
              keyboardType="email-address"
              width={"85%"}
              backgroundColor={WHITE_COLOR}
            />
          ) : ( */}
          <CustomText
            titleText="Email"
            description={this.state.email}
            iconName={"envelope"}
          />
          {/* )} */}

          {/* {this.state.toggleMode ? ( */}
          {/* <CustomTextBox
              value={this.state.phoneNumber}
              placeholder="Phone"
              keyboardType="phone-pad"
              width={"85%"}
              backgroundColor={WHITE_COLOR}
            />
          ) : ( */}
          <CustomText
            titleText="Phone Number"
            description={this.state.phoneNumber}
            iconName={"phone"}
          />
          {/* )} */}

          <View style={{ height: 10 }} />
          {this.state.toggleMode ? (
            <CustomTextBox
              maxLength={6}
              onChangeText={(text) => this.setState({ postalCode: text })}
              value={this.state.postalCode}
              placeholder="Postal Code"
              keyboardType="phone-pad"
              width={"85%"}
              backgroundColor={WHITE_COLOR}
            />
          ) : (
            <CustomText
              titleText="Postal Code"
              description={this.state.postalCode}
              iconName={"phone"}
            />
          )}
          <View style={{ height: 10 }} />
          {this.state.toggleMode ? (
            <CustomTextarea value={this.state.address} />
          ) : (
            <CustomText
              titleText="Address"
              onChangeText={(text) => this.setState({ address: text })}
              description={this.state.address}
              iconName={"home"}
              textPlaceHeight={60}
            />
          )}

          <View style={{ height: 40 }} />
          {this.state.toggleMode ? (
            <CustomButton
              onPress={() => {
                this.props.updatePatnerProfile(
                  new MyAuth().setUpdateProfile(
                    this.state._id,
                    this.state.partnerName,
                    this.state.phoneNumber,
                    this.state.postalCode,
                    this.state.address,
                    {
                      longitude: this.state.longitude,
                      latitude: this.state.latitude,
                    }
                  ),
                  this.state.image,
                  this
                );

                this.toggleButton();
              }}
              width="85%"
              text={"Save"}
            />
          ) : (
            <CustomButton
              onPress={() => this.toggleButton()}
              width="85%"
              text={"Edit Info"}
            />
          )}

          <View style={{ height: 10 }} />
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  patnerID: state.LoadUserReducer.userData,
});
export default connect(
  mapStateToProps,
  {
    showPatnerProfile,
    updatePatnerProfile,
    loadUserAction,
  }
)(EditInfoScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE_COLOR,
  },
  imageViewStyle: {
    height: 120,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: SCREEN_BG_COLOR,
  },
  logoStyle: {
    height: 100,
    width: 100,
    borderRadius: 100,
    zIndex: 999,
    alignSelf: "center",
    marginTop: 120,
  },
  buttonViewStyle: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTextStyle: { height: 35, alignSelf: "center", borderRadius: 3 },
  mainCheckBoxViewStyle: {
    height: 40,
    width: "87%",
    flexDirection: "row",
    alignSelf: "center",
  },

  checkBoxViewStyle: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  checkBoxStyle: {
    backgroundColor: "#F6F6F6",
    height: 20,
    width: 20,
    borderColor: Button_BG_COLOR,
    borderWidth: 1,
  },
  checkBoxInnerViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  checkBoxTextViewStyle: {
    flex: 3,
    justifyContent: "center",
    alignItems: "flex-start",
  },
});
