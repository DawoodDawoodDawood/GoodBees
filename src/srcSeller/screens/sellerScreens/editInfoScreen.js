import React, { Component } from "react";
import { StyleSheet, View, Image, StatusBar, Alert } from "react-native";
import {
  Text,
  Button,
  Container,
  Content,
  CheckBox,
  Spinner,
} from "native-base";
import {
  SCREEN_BG_COLOR,
  WHITE_COLOR,
  Button_BG_COLOR,
} from "../../../theme/color";
import CustomProfileView from "../../components/customComponents/customProfileView";
import ImagePicker from "react-native-image-crop-picker";
import CustomCheckbox from "../../components/customComponents/customCheckbox";
import CustomTextarea from "../../components/customComponents/customTextarea";
import CustomButton from "../../components/customComponents/customButton";
import CustomTextBox from "../../components/customComponents/customTextbox";
import CustomText from "../../components/customComponents/customText";
import { connect } from "react-redux";
import {
  showSellerProfile,
  updateSellerProfile,
} from "../../store/actions/authActions/authActions";
import { loadUserAction } from "../../../appStore/loadUser/loadUserAction";
import MyAuth from "../../../businessLogic/MyAuth/MyAuth";
class EditInfoScreen extends Component {
  componentDidMount() {
    this.props.showSellerProfile(this.props.sellerId._id, this);
  }

  state = {
    sellerPoints: "",
    id: "",
    sellerType: "",
    image: null,
    imageURL: "",
    name: "",
    email: "",
    phone: "",
    veg: false,
    nonVeg: false,
    postalCode: "",
    breakfast: false,
    sellerTypeID: "",
    lunch: false,
    dinner: false,
    halal: false,
    notHalal: false,
    address: "",
    showImage: false,
    spinnerMove: false,
    toggleMode: false,
    longitude: "",
    latitude: "",
    delivery: false,
    selfPickUp: false,
  };

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

  toggleButton = () => {
    this.setState({ toggleMode: !this.state.toggleMode });
  };

  render() {
    return (
      <Container>
        <StatusBar backgroundColor={Button_BG_COLOR} barStyle="light-content" />
        <Content>
          <CustomProfileView
            sellerPoints={this.state.sellerPoints}
            buttonText={"Upload Picture"}
            showImage={this.state.showImage}
            image={this.state.image}
            imageURL={this.state.imageURL}
            SelectImage={this.SelectImage}
            onBackButtonPress={() => this.props.navigation.goBack()}
            showButton={this.state.toggleMode}
          />
          <View style={{ height: 10 }} />
          {this.state.toggleMode ? (
            <CustomTextBox
              width={"85%"}
              onChangeText={(text) => this.setState({ name: text })}
              value={this.state.name}
              backgroundColor={WHITE_COLOR}
              placeholder={"Enter Name"}
            />
          ) : (
            <CustomText
              Title="Name"
              description={this.state.name}
              iconName={"user"}
            />
          )}
          <CustomText
            Title="Seller Type"
            description={this.state.sellerType}
            iconName={"user"}
          />
          {/* {this.state.toggleMode ? (
            <CustomTextBox
              placeholder="Email Address"
              keyboardType="email-address"
              width={"85%"}
              backgroundColor={WHITE_COLOR}
            />
          ) : ( */}
          <CustomText
            Title="Email"
            description={this.state.email}
            iconName={"envelope"}
          />
          {/* )} */}

          {/* {this.state.toggleMode ? (
            <CustomTextBox
              placeholder="Phone"
              keyboardType="phone-pad"
              width={"85%"}
              backgroundColor={WHITE_COLOR}
            />
          ) : ( */}
          <CustomText
            Title="Contact Number"
            description={this.state.phone}
            iconName={"phone"}
          />
          {/* )} */}
          {this.state.toggleMode ? (
            <CustomTextarea
              onChangeText={(text) => this.setState({ address: text })}
              value={this.state.address}
              title={"Enter Address"}
            />
          ) : (
            <CustomText
              Title="Address"
              description={this.state.address}
              iconName={"home"}
              textPlaceHeight={30}
            />
          )}
          {this.state.toggleMode ? (
            <CustomTextBox
              width={"85%"}
              onChangeText={(text) => this.setState({ postalCode: text })}
              value={this.state.postalCode}
              backgroundColor={WHITE_COLOR}
              placeholder={"Postal Code"}
            />
          ) : (
            <CustomText
              Title="Postal Code"
              description={this.state.postalCode}
              iconName={"home"}
              textPlaceHeight={60}
            />
          )}
          <View style={{ height: 10 }} />
          <CustomCheckbox
            disable={!this.state.toggleMode}
            onPress1={() => this.setState({ veg: !this.state.veg })}
            check1={this.state.veg}
            onPress2={() => this.setState({ nonVeg: !this.state.nonVeg })}
            check2={this.state.nonVeg}
            text="Food Type"
            firstText="Veg"
            secondText="Non-Veg"
          />

          <CustomCheckbox
            disable={!this.state.toggleMode}
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
            disable={!this.state.toggleMode}
            text="Food Category"
            firstText="Halal"
            secondText="Not-Halal"
            onPress1={() => this.setState({ halal: !this.state.halal })}
            check1={this.state.halal}
            onPress2={() => this.setState({ notHalal: !this.state.notHalal })}
            check2={this.state.notHalal}
          />
          <CustomCheckbox
            disable={!this.state.toggleMode}
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

          {/* checkbox */}
          {/* <View style={{height: 10}} />
          <View style={styles.mainCheckBoxViewStyle}>
            <View style={styles.checkBoxViewStyle}>
              <View style={styles.checkBoxInnerViewStyle}>
                <CheckBox
                  color={Button_BG_COLOR}
                  checked={this.state.check}
                  onPress={() => this.toggleCheckBox()}
                />
              </View>
              <View style={styles.checkBoxTextViewStyle}>
                <Text style={{color: 'grey'}}>Notification Reminder</Text>
              </View>
            </View>

            <View style={{flex: 1}} />
          </View> */}

          <View style={{ height: 40 }} />
          {this.state.toggleMode ? (
            this.state.spinnerMove ? (
              <Spinner color={Button_BG_COLOR} />
            ) : (
              <CustomButton
                onPress={() => {
                  if (
                    this.state.veg == true ||
                    (this.state.nonVeg == true &&
                      (this.state.breakfast == true ||
                        this.state.lunch == true ||
                        this.state.dinner == true) &&
                      (this.state.halal == true ||
                        this.state.notHalal == true) &&
                      !this.state.address == "" &&
                      !this.state.longitude == "" &&
                      !this.state.latitude == "" &&
                      (this.state.delivery == true ||
                        this.state.selfPickUp == true))
                  ) {
                    this.props.updateSellerProfile(
                      new MyAuth().setUpdateProfile(
                        this.state.id,
                        this.state.name,
                        this.state.email,

                        this.state.phone,

                        this.state.sellerTypeID,
                        this.state.postalCode,
                        {
                          veg: this.state.veg,
                          nonVeg: this.state.nonVeg,
                        },
                        {
                          breakFast: this.state.breakfast,
                          lunch: this.state.lunch,
                          dinner: this.state.dinner,
                        },
                        {
                          halal: this.state.halal,
                          notHalal: this.state.notHalal,
                        },
                        this.state.address,
                        {
                          longitude: this.state.longitude,
                          latitude: this.state.latitude,
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

const mapStateToProps = (state) => ({
  sellerId: state.LoadUserReducer.userData,
});

export default connect(
  mapStateToProps,
  {
    showSellerProfile,
    updateSellerProfile,
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
