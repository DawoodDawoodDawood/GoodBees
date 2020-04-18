import React, { Component } from "react";
import { StyleSheet, View, StatusBar, Alert } from "react-native";
import { Container, Content, Spinner } from "native-base";
import {
  WHITE_COLOR,
  Button_BG_COLOR,
  BORDER_COLOR,
} from "../../../theme/color";
import CustomProfileView from "../../components/customComponents/customProfileView";
import CustomButton from "../../components/customComponents/customButton";
import CustomTextBox from "../../components/customComponents/customTextbox";
import ImagePicker from "react-native-image-crop-picker";
import CustomTextarea from "../../components/customComponents/customTextarea";
import CustomDropdown from "../../components/customComponents/customDropdown";
import CustomText from "../../components/customComponents/customText";
import {
  MealTypeArray,
  FoodTypeArray,
  FoodCatagoryArray,
  DeliveryTypeArray,
} from "../../../customeComponents/DropDown/dropDownValues";
import { connect } from "react-redux";
import { addMeal, updateMeal } from "../../store/actions/mealAction/mealAction";
import MyMealClass from "../../businessLogic/MyMeal";
import CustomeTimePicker from "../../components/customComponents/CustomTimePicker";
import DatePicker from "../../../customeComponents/DatePicker";
import alertMsgActionForComponents from "../../../appStore/alertMsg/alertAction";
class SellerAddMealScreen extends Component {
  state = {
    toggleState: true,
    image: null,
    mealName: "",
    mealPrice: "",
    mealDescription: "",
    contactName: "",
    contactNumber: "",
    mealQuantity: "",
    mealVoucherCode: "",
    mealType: "",
    foodType: "NONVEG",
    foodCatagory: "NOTHALAL",
    pickupStartTime: "",
    pickupEndTime: "",
    showImage: false,
    mealAdded: false,
    spinnerMove: false,
    updateData: false,
    _id: "",
    imageURL: "",

    data: 0,
    data1: 0,
    saveSpin: false,
    mealArray: [],
    availabilityDate: new Date(),
    apiDate: "",
  };
  componentDidMount() {
    const completeMealData = this.props.navigation.getParam("completeMeal", "");
    this.setState({
      contactName: this.props.sellerId.sellerName,
      contactNumber: this.props.sellerId.phone,
    });

    if (this.props.sellerId.foodFor.breakFast === true) {
      this.state.mealArray.push({ key: "BREAKFAST", value: "BREAKFAST" });
    }
    if (this.props.sellerId.foodFor.lunch === true) {
      this.state.mealArray.push({ key: "LUNCH", value: "LUNCH" });
    }
    if (this.props.sellerId.foodFor.dinner === true) {
      this.state.mealArray.push({ key: "DINNER", value: "DINNER" });
    }

    if (completeMealData === "") {
    } else {
      const mealData = JSON.parse(completeMealData);

      const time = mealData.pickupStartTime.split("T");

      const timee = mealData.pickupEndTime.split("T");

      const splittedStartData1 = time[1].split(".");

      const splittedEndData1 = timee[1].split(".");
      const AvaiablityDate = mealData.availabilityDate.split("T");
      this.setState({
        _id: mealData._id,
        mealName: mealData.mealName,
        availabilityDate: AvaiablityDate[0],
        apiDate: mealData.availabilityDate,
        mealPrice: JSON.stringify(mealData.price),
        mealDescription: mealData.mealDescription,
        contactName: mealData.contactName,
        contactNumber: mealData.contactNumber,
        mealQuantity: JSON.stringify(mealData.quantity),
        mealVoucherCode: mealData.voucherCode,
        mealType: mealData.mealType,
        foodType: mealData.foodType,
        foodCatagory: mealData.foodCategory,

        toggleState: false,
        pickupStartTime: splittedStartData1[0],
        pickupEndTime: splittedEndData1[0],

        updateData: true,
        imageURL: mealData.mealImgURL[0],

        // image: mealData.mealImgURL[0]
      });

      this.setState({
        data: Date.parse(mealData.pickupStartTime),
        data1: Date.parse(mealData.pickupEndTime),
      });
    }
  }
  SelectImage = () => {
    this.setState({ showImage: false });
    ImagePicker.openPicker({
      width: 200,
      height: 100,
      cropping: false,
    }).then((image) => {
      let imgSource = {
        uri: image.path,
        type: image.mime,
        name: image.path.replace(/^.*[\\\/]/, ""),
      };

      this.setState({ image: imgSource, showImage: true });
    });
  };
  setDate = (date) => {
    console.log(new Date(date).toISOString());
    this.setState({ availabilityDate: date, apiDate: date.toISOString() });
  };
  render() {
    if (this.state.mealAdded === true) {
      this.props.navigation.navigate("SellerAllMealScreen");
    }

    const date = new Date(Date.now()).toISOString();
    const datee = date.split("T");
    const dateee = Date.parse(
      datee[0] + "T" + this.state.pickupStartTime + ":00Z"
    );

    const dateee1 = Date.parse(
      datee[0] + "T" + this.state.pickupEndTime + ":00Z"
    );

    return (
      <Container style={styles.container}>
        <StatusBar backgroundColor={Button_BG_COLOR} barStyle="light-content" />
        <Content>
          <CustomProfileView
            showCumulative
            showButton={this.state.toggleState}
            showImage={this.state.showImage}
            imageURL={this.state.imageURL}
            image={this.state.image}
            SelectImage={this.SelectImage}
            LunchLogo
            onBackButtonPress={() =>
              this.props.navigation.navigate("SellerAllMealScreen")
            }
            height={150}
            lowerHeight={100}
            imageViewHeight={80}
            width={280}
            borderRadius={10}
            marginTop={100}
            buttonText={"Upload Meal Picture"}
          />
          <View style={{ height: 15 }} />

          {this.state.toggleState ? (
            <CustomTextBox
              value={this.state.mealName}
              width={"85%"}
              backgroundColor={WHITE_COLOR}
              placeholder={"Enter Meal Name"}
              onChangeText={(text) => this.setState({ mealName: text })}
            />
          ) : (
            <CustomText
              Title="Meal Name"
              description={this.state.mealName}
              iconName={"cutlery"}
            />
          )}
          {this.state.toggleState ? (
            <CustomTextBox
              value={this.state.mealPrice}
              width={"85%"}
              backgroundColor={WHITE_COLOR}
              placeholder={"Enter Meal Price"}
              keyboardType="number-pad"
              onChangeText={(text) => this.setState({ mealPrice: text })}
            />
          ) : (
            <CustomText
              Title="Meal Price"
              description={this.state.mealPrice}
              iconName={"money"}
            />
          )}
          {this.state.toggleState ? (
            <CustomTextarea
              value={this.state.mealDescription}
              title={"Enter Meal Description"}
              onChangeText={(text) => this.setState({ mealDescription: text })}
            />
          ) : (
            <CustomText
              Title="Description"
              description={this.state.mealDescription}
              iconName={"description"}
            />
          )}
          <View style={{ height: 10 }} />
          {this.state.toggleState ? (
            <DatePicker
              availabilityDate={JSON.stringify(
                this.state.availabilityDate
              ).split("T")}
              date={(date) => this.setDate(date)}
            />
          ) : (
            <CustomText
              Title="Availabilty Time"
              description={this.state.availabilityDate}
              iconName={"description"}
            />
          )}

          {this.state.toggleState ? (
            <CustomTextBox
              width={"85%"}
              value={this.state.contactName}
              backgroundColor={WHITE_COLOR}
              placeholder={"Contact Name"}
              onChangeText={(text) => this.setState({ contactName: text })}
            />
          ) : (
            <CustomText
              Title="Contact Name"
              description={this.state.contactName}
              iconName={"user"}
            />
          )}
          {this.state.toggleState ? (
            <CustomTextBox
              width={"85%"}
              value={this.state.contactNumber}
              value={this.state.contactNumber}
              backgroundColor={WHITE_COLOR}
              placeholder={"Contact Number"}
              keyboardType="phone-pad"
              onChangeText={(text) => this.setState({ contactNumber: text })}
            />
          ) : (
            <CustomText
              Title="Contact Number"
              description={this.state.contactNumber}
              iconName={"phone"}
            />
          )}
          {this.state.toggleState ? (
            <CustomTextBox
              value={this.state.mealQuantity}
              width={"85%"}
              backgroundColor={WHITE_COLOR}
              placeholder={"Quantity"}
              keyboardType="number-pad"
              onChangeText={(text) => this.setState({ mealQuantity: text })}
            />
          ) : (
            <CustomText
              Title="Quantity"
              description={this.state.mealQuantity}
              iconName={"sort-amount-up"}
            />
          )}
          {this.state.toggleState ? (
            <CustomTextBox
              value={this.state.mealVoucherCode}
              width={"85%"}
              backgroundColor={WHITE_COLOR}
              placeholder={"Enter Voucher Code"}
              onChangeText={(text) => this.setState({ mealVoucherCode: text })}
            />
          ) : (
            <CustomText
              Title="Voucher Code"
              description={this.state.mealVoucherCode}
              iconName={"mortar-pestle"}
            />
          )}
          {this.state.toggleState ? (
            <CustomDropdown
              value={this.state.mealType}
              onValueChange={(text) => {
                if (text === "BREAKFAST") {
                  this.setState({
                    pickupStartTime: "06:00",
                    pickupEndTime: "11:00",
                  });
                } else if (text === "LUNCH") {
                  this.setState({
                    pickupStartTime: "12:00",
                    pickupEndTime: "17:00",
                  });
                } else if (text === "DINNER") {
                  this.setState({
                    pickupStartTime: "18:00",
                    pickupEndTime: "23:00",
                  });
                } else {
                }

                this.setState({ mealType: text });
              }}
              value={this.state.mealType}
              pickerArray={this.state.mealArray}
              title="Meal Type"
            />
          ) : (
            <CustomText
              Title="Meal Type"
              description={this.state.mealType}
              iconName={"mortar-pestle"}
            />
          )}
          {this.state.toggleState ? (
            <CustomDropdown
              onValueChange={(text) => this.setState({ foodType: text })}
              value={this.state.foodType}
              pickerArray={FoodTypeArray}
              title="Food Type"
            />
          ) : (
            <CustomText
              Title="Meal Type"
              description={this.state.foodType}
              iconName={"mortar-pestle"}
            />
          )}
          {this.state.toggleState ? (
            <CustomDropdown
              onValueChange={(text) => this.setState({ foodCatagory: text })}
              value={this.state.foodCatagory}
              pickerArray={FoodCatagoryArray}
              title="Food Catagory"
            />
          ) : (
            <CustomText
              Title="Meal Type"
              description={this.state.foodCatagory}
              iconName={"mortar-pestle"}
            />
          )}

          <View style={{ height: 10 }} />
          {/* {this.state.toggleState ? (
            <CustomeTimePicker
              disabled
              showIcon
              timeRef={ref => (this.TimePicker = ref)}
              defaultValue={this.state.pickupStartTime}
              iconName="clock-o"
              title="Select Time"
              onCancle={() => this.TimePicker.close()}
              onPress={() => this.TimePicker.open()}
              onConfirm={(hour, minute) => {
                this.setState({ pickupStartTime: `${hour}:${minute}` });
                this.TimePicker.close();

                //   if (hour != "" && minute != "") {
                //     this.setState({
                //       timeValidate: true
                //     });
                //   } else {
                //     this.setState({
                //       timeValidate: false
                //     });
                //   }
              }}
            />
          ) : (
            <CustomText
              Title="Meal Start Time"
              description={this.state.pickupStartTime}
              iconName={"mortar-pestle"}
            />
          )}
          <View style={{ height: 10 }} />
          {this.state.toggleState ? (
            <CustomeTimePicker
              disabled
              showIcon
              timeRef={ref => (this.TimePicker1 = ref)}
              defaultValue={this.state.pickupEndTime}
              iconName="clock-o"
              title="Select Time"
              onCancle={() => this.TimePicker1.close()}
              onPress={() => this.TimePicker1.open()}
              onConfirm={(hour, minute) => {
                console.log(hour);
                this.setState({ pickupEndTime: `${hour}:${minute}` });
                this.TimePicker1.close();

                // if (hour != "" && minute != "") {
                //   this.setState({
                //     timeValidate: true
                //   });
                // } else {
                //   this.setState({
                //     timeValidate: false
                //   });
                // }
              }}
            />
          ) : (
            <CustomText
              Title="Meal End Time"
              description={this.state.pickupEndTime}
              iconName={"mortar-pestle"}
            />
          )} */}

          <View style={{ height: 40 }} />
          {this.state.updateData ? (
            this.state.toggleState ? (
              this.state.saveSpin ? (
                <Spinner color={BORDER_COLOR} />
              ) : (
                <CustomButton
                  onPress={() => {
                    if (
                      this.state.mealName &&
                      this.state.mealPrice &&
                      this.state.mealDescription &&
                      this.state.contactName &&
                      this.state.contactNumber &&
                      this.state.mealQuantity &&
                      this.state.mealVoucherCode &&
                      this.state.mealType &&
                      this.state.foodType &&
                      this.state.foodCatagory &&
                      this.state.pickupEndTime &&
                      this.state.pickupStartTime &&
                      !this.state.availabilityDate == ""
                    ) {
                      this.props.updateMeal(
                        new MyMealClass().setSellerUpdateMeal(
                          this.state._id,
                          this.state.mealName,
                          this.state.mealDescription,
                          this.state.contactName,
                          this.state.contactNumber,
                          this.props.sellerId._id,
                          this.state.mealQuantity,
                          this.state.mealVoucherCode,
                          this.state.mealType,
                          this.state.foodType,
                          this.state.foodCatagory,

                          this.state.mealPrice,

                          dateee
                            ? JSON.stringify(dateee)
                            : JSON.stringify(this.state.data),
                          dateee1
                            ? JSON.stringify(dateee1)
                            : JSON.stringify(this.state.data1),
                          this.state.apiDate
                        ),
                        this.state.image,
                        this
                      );
                    } else {
                      Alert.alert(
                        "Some data is missing/invalid while adding the meal"
                      );
                    }
                  }}
                  width="75%"
                  text={"Save Meal"}
                />
              )
            ) : (
              <CustomButton
                width="75%"
                onPress={() => this.setState({ toggleState: true })}
                text={"Edit Meal"}
              />
            )
          ) : (
            false
          )}
          {this.state.updateData ? (
            false
          ) : this.state.spinnerMove ? (
            <Spinner color={Button_BG_COLOR} />
          ) : this.state.toggleState ? (
            <CustomButton
              width="75%"
              text={"Add Meal"}
              onPress={() => {
                console.log(JSON.stringify(dateee));
                if (
                  this.state.image &&
                  this.state.mealName &&
                  this.state.mealPrice &&
                  this.state.mealDescription &&
                  this.state.contactName &&
                  this.state.contactNumber &&
                  this.state.mealQuantity &&
                  this.state.mealVoucherCode &&
                  this.state.mealType &&
                  this.state.foodType &&
                  this.state.foodCatagory &&
                  !this.state.availabilityDate == ""
                ) {
                  this.props.addMeal(
                    new MyMealClass().setSellerAddMeal(
                      this.state.mealName,
                      this.state.mealDescription,
                      this.state.contactName,
                      this.state.contactNumber,
                      this.props.sellerId._id,
                      this.state.mealQuantity,
                      this.state.mealVoucherCode,
                      this.state.mealType,
                      this.state.foodType,
                      this.state.foodCatagory,
                      this.state.mealPrice,
                      JSON.stringify(dateee),
                      JSON.stringify(dateee1),
                      this.state.apiDate
                    ),
                    this.state.image,
                    this
                  );
                } else {
                  console.log(
                    this.state.mealName,
                    this.state.mealDescription,
                    this.state.contactName,
                    this.state.contactNumber,
                    this.props.sellerId._id,
                    this.state.mealQuantity,
                    this.state.mealVoucherCode,
                    this.state.mealType,
                    this.state.foodType,
                    this.state.foodCatagory,
                    this.state.mealPrice,
                    JSON.stringify(dateee),
                    JSON.stringify(dateee1),
                    this.state.availabilityDate
                  );
                  //  this.props.alertMsgActionForComponents( {
                  //   data: res.data,
                  //   success: true,
                  //   alert: "Add Meal",
                  //   alertIconName: "check-circle",
                  //   alertColor: ALERT_SUCCESS_COLOR
                  // })
                  //   }
                }
              }}
            />
          ) : (
            <CustomButton
              width="75%"
              text={"Edit Meal"}
              onPress={() => {
                this.setState({ toggleState: true });
              }}
            />
          )}
          <View style={{ height: 20 }} />
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
  { addMeal, updateMeal, alertMsgActionForComponents }
)(SellerAddMealScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE_COLOR,
  },
  textViewStyle: {
    height: 40,
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "flex-start",
  },
});
