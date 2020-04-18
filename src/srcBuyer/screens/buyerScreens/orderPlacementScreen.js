import React, { Component } from "react";
import { StyleSheet, View, StatusBar, Modal, Alert } from "react-native";
import { Container, Content, CheckBox, Spinner } from "native-base";
import {
  WHITE_COLOR,
  Button_BG_COLOR,
  ALERT_ERROR_COLOR,
} from "../../../theme/color";
import CustomProfileView from "../../components/customComponents/customProfileView";
import CustomButton from "../../components/customComponents/customButton";
import CustomTextBox from "../../components/customComponents/customTextbox";
import CustomText from "../../components/customComponents/customText";
import CustomParallelButton from "../../components/customComponents/customParallelButton";
import CustomTimePicker from "../../components/customComponents/CustomTimePicker";
import { IMG_URL } from "../../../appStore/BASE_URL";
import VoucherCodePopup from "../../components/popups/voucherCode";
import { connect } from "react-redux";
import {
  addToCart,
  matchVoucherCode,
} from "../../store/actions/cartAction/cartAction";
import { alertMsgActionForComponents } from "../../../appStore/alertMsg/alertAction";
import { ALERT_MSG } from "../../../appStore/alertMsg/type";
class OrderPlacementScreen extends Component {
  componentDidMount() {
    const completeMealData = this.props.navigation.getParam(
      "completeMeals",
      ""
    );

    if (completeMealData === "") {
    } else {
      const mealData = JSON.parse(completeMealData);
      console.log(mealData);
      console.log(mealData._id);
      this.setState({
        id: mealData._id,
        mealType: mealData.mealType,
        imageURL: mealData.mealImgURL[0],
        mealName: mealData.mealName,
        mealDescription: mealData.mealDescription,
        foodCategory: mealData.foodCategory,
        foodType: mealData.foodType,
        sellerName: mealData.contactName,
        sellerNumber: mealData.contactNumber,
        delivery: mealData.delivery,
        mealVoucherCode: mealData.voucherCode,
        foodId: mealData._id,
        sellerId: mealData.seller,
        price: mealData.price,
        availableMealQuantity: mealData.quantity,
      });
    }
  }
  state = {
    id: "",
    mealType: "",
    imageURL: "",
    mealName: "",
    mealDescription: "",
    foodCategory: "",
    foodType: "",
    sellerName: "",
    sellerNumber: "",
    delivery: "",
    mealVoucherCode: "",
    showImage: false,
    modalVisible: false,
    newVoucherCode: "",
    foodId: "",
    sellerId: "",
    price: 0,
    availableMealQuantity: 0,
    enterMealQuantity: 0,
    addedToCart: false,
    spinnerMove: false,
  };

  setModalVisible() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  render() {
    return (
      <Container style={styles.container}>
        <StatusBar backgroundColor={Button_BG_COLOR} barStyle="light-content" />
        <Content>
          <CustomProfileView
            height={150}
            lowerHeight={100}
            imageViewHeight={80}
            width={280}
            borderRadius={10}
            onPressBack={() => this.props.navigation.goBack()}
            marginTop={100}
            buttonText={this.state.mealType}
            showImage={this.state.showImage}
            imageURL={this.state.imageURL}
            // showMenuButton
            // showRightSideButton
          />
          <View style={{ height: 15 }} />

          <CustomText
            description={this.state.mealName}
            titleText={"Meal Name:"}
          />

          <CustomText
            description={this.state.mealDescription}
            titleText={"Description:"}
            // textPlaceHeight={100}
          />

          <CustomText
            description={this.state.foodCategory}
            titleText={"Food Category:"}
          />

          <CustomText
            description={this.state.foodType}
            titleText={"Food Type:"}
          />

          <CustomText
            description={this.state.sellerName}
            titleText={"Seller Name:"}
          />

          <CustomText
            description={this.state.sellerNumber}
            titleText={"Seller Phone:"}
          />

          <CustomTextBox
            backgroundColor="white"
            width="85%"
            placeholder="Enter Voucher Code"
            value={this.state.newVoucherCode}
            onChangeText={(text) => this.setState({ newVoucherCode: text })}
          />

          {/* button */}
          <View style={{ height: 25 }} />

          <Modal
            animationType="slide"
            transparent={true}
            presentationStyle="overFullScreen"
            visible={this.state.modalVisible}
            onRequestClose={() => this.setModalVisible()}
          >
            <VoucherCodePopup
              vouchereCode={this.state.enterMealQuantity}
              onChangeText={(text) =>
                this.setState({ enterMealQuantity: text })
              }
              setModalVisible={() => this.setModalVisible()}
              navigation={this.props.navigation}
              onVoucherCodeEnter={() => {
                if (
                  this.state.newVoucherCode === this.state.mealVoucherCode &&
                  this.state.enterMealQuantity <=
                    this.state.availableMealQuantity
                ) {
                  this.props.addToCart(
                    "MEAL",
                    this.state.foodId,
                    this.state.sellerId,
                    this.state.price * this.state.enterMealQuantity,
                    this.state.enterMealQuantity,
                    this.props.buyerId,
                    this
                  );
                } else {
                  if (
                    this.state.enterMealQuantity <=
                    this.state.availableMealQuantity
                  ) {
                    this.props.alertMsgActionForComponents({
                      data: "Add To Cart",
                      success: true,
                      alert: "Meal Quanity Not Available",
                      alertIconName: "exclamation-triangle",
                      alertColor: ALERT_ERROR_COLOR,
                    });
                  }
                }
              }}
            />
          </Modal>
          {this.state.spinnerMove ? (
            <Spinner color={Button_BG_COLOR} />
          ) : (
            <CustomButton
              width="85%"
              text={"Continue"}
              onPress={() => {
                this.props.matchVoucherCode(
                  this.props.buyerId,
                  this.state.id,
                  this.state.newVoucherCode,
                  this
                );
              }}
            />
          )}

          <View style={{ height: 10 }} />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  buyerId: state.LoadUserReducer.userData._id,
});

export default connect(
  mapStateToProps,
  { addToCart, alertMsgActionForComponents, matchVoucherCode }
)(OrderPlacementScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE_COLOR,
  },
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
