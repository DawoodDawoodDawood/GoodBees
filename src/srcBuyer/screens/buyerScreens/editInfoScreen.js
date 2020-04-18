import React, { Component } from "react";
import { StyleSheet, View, Alert, StatusBar } from "react-native";
import {
  Text,
  Button,
  Container,
  Content,
  CheckBox,
  Spinner
} from "native-base";
import {
  SCREEN_BG_COLOR,
  WHITE_COLOR,
  Button_BG_COLOR
} from "../../../theme/color";
import CustomProfileView from "../../components/customComponents/customProfileView";
import CustomCheckbox from "../../components/customComponents/customCheckbox";
import CustomTextarea from "../../components/customComponents/customTextarea";
import CustomButton from "../../components/customComponents/customButton";
import CustomTextBox from "../../components/customComponents/customTextbox";
import CustomText from "../../components/customComponents/customText";
import {
  showBuyerProfile,
  updateBuyerProfile
} from "../../store/actions/authActions/authActions";
import ImagePicker from "react-native-image-crop-picker";
import { connect } from "react-redux";

import { loadUserAction } from "../../../appStore/loadUser/loadUserAction";
import MyAuth from "../../businessLogic/MyAuth/MyAuth";
class EditInfoScreen extends Component {
  state = {
    toggleMode: false,
    spinnerMove: false,
    name: "",
    image: null,
    email: "",
    phoneNumber: "",
    age: "",
    postalCode: "",
    address: "",
    breakfast: false,
    lunch: false,
    dinner: false,
    halal: false,
    notHalal: false,

    veg: false,
    nonVeg: false,
    id: "",
    notification: false,
    buyerImgURL: "",
    alergicDetails: "",
    longitude: "",
    latitude: "",
    showImage: false,
    spinnerMove: false,
    buyerPoints: ""
  };
  SelectImage = () => {
    this.setState({ showImage: false });
    ImagePicker.openPicker({
      width: 200,
      height: 100
    }).then(image => {
      let imgSource = {
        uri: image.path,
        type: image.mime,
        name: image.path.replace(/^.*[\\\/]/, "")
      };
      this.setState({ image: imgSource, showImage: true });
    });
  };
  componentDidMount = () => {
    this.props.showBuyerProfile(this.props.userData._id, this);
  };
  toggleButton = () => {
    this.setState({ toggleMode: !this.state.toggleMode });
  };

  toggleCheckBox = () => {
    this.setState({ notification: !this.state.notification });
  };
  render() {
    return (
      <Container>
        <StatusBar backgroundColor={Button_BG_COLOR} barStyle="light-content" />
        <Content>
          <CustomProfileView
            showCumulative
            buyerPoints={this.state.buyerPoints}
            onPressBack={() => this.props.navigation.goBack()}
            imageURL={this.state.buyerImgURL}
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
              backgroundColor={WHITE_COLOR}
              placeholder={"Enter Name"}
              value={this.state.name}
              onChangeText={text => this.setState({ name: text })}
            />
          ) : (
            <CustomText
              titleText="Name"
              description={this.state.name}
              iconName={"user"}
            />
          )}
          {this.state.toggleMode ? (
            <CustomTextBox
              placeholder="Email Address"
              keyboardType="email-address"
              width={"85%"}
              value={this.state.email}
              onChangeText={text => this.setState({ email: text })}
              backgroundColor={WHITE_COLOR}
            />
          ) : (
            <CustomText
              titleText="Email"
              description={this.state.email}
              iconName={"envelope"}
            />
          )}

          {this.state.toggleMode ? (
            <CustomTextBox
              placeholder="Phone"
              keyboardType="phone-pad"
              width={"85%"}
              value={this.state.phoneNumber}
              onChangeText={text => this.setState({ phoneNumber: text })}
              backgroundColor={WHITE_COLOR}
            />
          ) : (
            <CustomText
              titleText="Phone"
              description={this.state.phoneNumber}
              iconName={"phone"}
            />
          )}

          <View style={{ height: 10 }} />
          {this.state.toggleMode ? (
            <CustomTextBox
              placeholder="Age"
              keyboardType="phone-pad"
              width={"85%"}
              value={this.state.age}
              onChangeText={text => this.setState({ age: text })}
              backgroundColor={WHITE_COLOR}
            />
          ) : (
            <CustomText
              titleText="Age"
              description={this.state.age}
              iconName={"phone"}
            />
          )}

          <View style={{ height: 10 }} />
          {this.state.toggleMode ? (
            <CustomTextBox
              placeholder="Postal Code"
              keyboardType="phone-pad"
              width={"85%"}
              value={this.state.postalCode}
              onChangeText={text => this.setState({ postalCode: text })}
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
          <CustomCheckbox
            disable={!this.state.toggleMode}
            text="Food Type"
            firstText="Veg"
            secondText="Non-Veg"
            onPress1={() => this.setState({ veg: !this.state.veg })}
            check1={this.state.veg}
            onPress2={() => this.setState({ nonVeg: !this.state.nonVeg })}
            check2={this.state.nonVeg}
          />

          <CustomCheckbox
            disable={!this.state.toggleMode}
            text="Food For"
            onPress1={() => this.setState({ breakfast: !this.state.breakfast })}
            check1={this.state.breakfast}
            onPress2={() => this.setState({ lunch: !this.state.lunch })}
            check2={this.state.lunch}
            onPress3={() => this.setState({ dinner: !this.state.dinner })}
            check3={this.state.dinner}
            showThird
            firstText="Breakfast"
            secondText="Lunch"
            thirdText="Dinner"
          />
          <CustomCheckbox
            disable={!this.state.toggleMode}
            onPress1={() => this.setState({ halal: !this.state.halal })}
            check1={this.state.halal}
            onPress2={() => this.setState({ notHalal: !this.state.notHalal })}
            check2={this.state.notHalal}
            text="Food Category"
            firstText="Halal"
            secondText="Not-Halal"
          />
          {this.state.toggleMode ? (
            <CustomTextarea
              value={this.state.address}
              title={"Address"}
              onChangeText={text => this.setState({ address: text })}
            />
          ) : (
            <CustomText
              titleText={"Address"}
              description={this.state.address}
              iconName={"home"}
              textPlaceHeight={60}
            />
          )}
          {this.state.toggleMode ? (
            <CustomTextarea
              value={this.state.alergicDetails}
              title={"Alergic Details"}
              onChangeText={text => this.setState({ alergicDetails: text })}
            />
          ) : (
            <CustomText
              titleText={"Alergic Details"}
              description={this.state.alergicDetails}
              iconName={"home"}
              textPlaceHeight={60}
            />
          )}

          {/* checkbox */}
          <View style={{ height: 10 }} />
          <View style={styles.mainCheckBoxViewStyle}>
            {/* <View style={styles.checkBoxViewStyle}>
              <View style={styles.checkBoxInnerViewStyle}>
                <CheckBox
                  color={Button_BG_COLOR}
                  checked={this.state.notification}
                  onPress={() => this.toggleCheckBox()}
                />
              </View>
              <View style={styles.checkBoxTextViewStyle}>
                <Text style={{ color: "grey" }}>Notification Reminder</Text>
              </View>
            </View> */}

            <View style={{ flex: 1 }} />
          </View>

          <View style={{ height: 40 }} />
          {this.state.toggleMode ? (
            this.state.spinnerMove ? (
              <Spinner color={Button_BG_COLOR} />
            ) : (
              <CustomButton
                onPress={() => {
                  if (
                    !this.state.name == "" &&
                    (this.state.veg == true || this.state.nonVeg == true) &&
                    (this.state.breakfast == true ||
                      this.state.lunch == true ||
                      this.state.dinner == true) &&
                    (this.state.halal == true || this.state.notHalal == true) &&
                    !this.state.longitude == "" &&
                    !this.state.latitude == "" &&
                    !this.state.alergicDetails == "" &&
                    !this.state.postalCode == "" &&
                    !this.state.address == ""
                  ) {
                    this.props.updateBuyerProfile(
                      new MyAuth().setUpdateProfile(
                        this.state.id,
                        this.state.name,
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
                        this.state.alergicDetails,

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
                    Alert.alert("Some data is missing while signup the seller");
                  }
                }}
                width="85%"
                text={"Save"}
              />
            )
          ) : (
            <CustomButton
              onPress={() => this.toggleButton()}
              width="85%"
              text={this.state.toggleMode ? "Save" : "Edit Info"}
            />
          )}
          <View style={{ height: 10 }} />
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  userData: state.LoadUserReducer.userData
});

export default connect(
  mapStateToProps,
  {
    showBuyerProfile,
    updateBuyerProfile,
    loadUserAction
  }
)(EditInfoScreen);
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
  mainCheckBoxViewStyle: {
    height: 40,
    width: "87%",
    flexDirection: "row",
    alignSelf: "center"
  },

  checkBoxViewStyle: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  checkBoxStyle: {
    backgroundColor: "#F6F6F6",
    height: 20,
    width: 20,
    borderColor: Button_BG_COLOR,
    borderWidth: 1
  },
  checkBoxInnerViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  checkBoxTextViewStyle: {
    flex: 3,
    justifyContent: "center",
    alignItems: "flex-start"
  }
});
