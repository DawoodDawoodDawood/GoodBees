import React, { Component } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Text, Spinner } from "native-base";
import MealComponentPart from "../../customeComponents/partOfCustomMeal";
import { SMALL, EXTRA_SMALL, MEDIUM } from "../../theme/font";
import {
  WHITE_COLOR,
  BORDER_COLOR,
  BREASKFAST_COLOR,
  BROWN_COLOR,
  DIFFERENT_GREEN
} from "../../theme/color";
import { IMG_URL } from "../../appStore/BASE_URL";
import { connect } from "react-redux";
import { deleteMeal } from "../../srcSeller/store/actions/mealAction/mealAction";
let mealImage = require("../../images/meal.png");
let halalImage = require("../../images/halal.png");
let vegetarianImage = require("../../images/vegetable.png");
let clockImage = require("../../images/time.png");
let shopImage = require("../../images/shop.png");
let landlineImage = require("../../images/landline.png");
let truckImage = require("../../images/truck.png");

class BLD_MealComponent extends Component {
  state = { spinnerMove: false, mealDeleted: false, spin: false };
  render() {
    const startDate = this.props.allMeals.pickupStartTime;

    const splittedStartData = startDate.split("T");
    const splittedStartData1 = splittedStartData[1].split(".");
    const splittedStartData2 = splittedStartData1[0].split(":");
    // const splittedStartData3 = splittedStartData2[1].split(":");

    const endDate = this.props.allMeals.pickupEndTime;

    const splittedEndData = endDate.split("T");

    const splittedEndData1 = splittedEndData[1].split(".");
    const splittedEndData2 = splittedEndData1[0].split(":");
    // const splittedEndcData3 = splittedEndData2[1].split("");

    return (
      <View style={styles.container}>
        <View style={styles.boxStyle}>
          <View
            style={{
              flex: 2,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                flex: 2,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                resizeMode={"stretch"}
                source={{
                  uri: IMG_URL + this.props.allMeals.mealImgURL[0]
                }}
                style={{
                  height: "90%",
                  width: "90%",
                  borderRadius: 20,
                  overflow: "hidden"
                }}
              />
            </View>
            <View
              style={{
                flex: 3,
                justifyContent: "center",
                alignItems: "flex-start"
              }}
            >
              <Text style={{ fontSize: SMALL }}>
                {this.props.allMeals.mealName}
              </Text>
              <Text note style={{ fontSize: EXTRA_SMALL }}>
                {this.props.allMeals.mealDescription}
              </Text>
            </View>
            <View
              style={{
                flex: 2,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  flex: 1,

                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%"
                }}
              >
                {this.props.allMeals.mealType === "DINNER" ? (
                  <View
                    style={{
                      height: 25,
                      width: "80%",
                      alignItems: "center",
                      justifyContent: "center",
                      alignSelf: "center",

                      borderRadius: 30,
                      backgroundColor: this.props.buttonBgColor
                        ? this.props.buttonBgColor
                        : "#e9404e"
                    }}
                  >
                    <Text style={{ color: WHITE_COLOR, fontSize: EXTRA_SMALL }}>
                      {this.props.allMeals.mealType}
                    </Text>
                  </View>
                ) : (
                  false
                )}
                {this.props.allMeals.mealType === "LUNCH" ? (
                  <View
                    style={{
                      height: 25,
                      width: "80%",
                      alignItems: "center",
                      justifyContent: "center",
                      alignSelf: "center",

                      borderRadius: 30,
                      backgroundColor: this.props.buttonBgColor
                        ? this.props.buttonBgColor
                        : BROWN_COLOR
                    }}
                  >
                    <Text style={{ color: WHITE_COLOR, fontSize: EXTRA_SMALL }}>
                      {this.props.allMeals.mealType}
                    </Text>
                  </View>
                ) : (
                  false
                )}
                {this.props.allMeals.mealType === "BREAKFAST" ? (
                  <View
                    style={{
                      height: 25,
                      width: "80%",
                      alignItems: "center",
                      justifyContent: "center",
                      alignSelf: "center",

                      borderRadius: 30,
                      backgroundColor: this.props.buttonBgColor
                        ? this.props.buttonBgColor
                        : BREASKFAST_COLOR
                    }}
                  >
                    <Text style={{ color: WHITE_COLOR, fontSize: EXTRA_SMALL }}>
                      {this.props.allMeals.mealType}
                    </Text>
                  </View>
                ) : (
                  false
                )}
              </View>
              {/* <View style={{ flex: 1, width: "100%" }}>
                <View style={styles.buttonViewStyle}>
                  {this.state.spinnerMove ? (
                    <Spinner color={"red"} />
                  ) : (
                    <TouchableOpacity
                      onPress={() =>
                        this.props.deleteMenu(this.props.menuList._id, this)
                      }
                      style={styles.broadCastButton}
                    >
                      <Image
                        style={{ width: 10, height: 10 }}
                        source={require("../../images/broadCast.png")}
                      ></Image>
                      <View style={{ width: 5 }}></View>
                      <Text style={{ color: "white", fontSize: EXTRA_SMALL }}>
                        Broad Cast
                      </Text>
                    </TouchableOpacity>
                  )}
                </View> */}
              {/* </View> */}
            </View>
          </View>

          {/* second */}
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={styles.itemsViewStyle}>
              <MealComponentPart
                iconText={"x" + " " + this.props.allMeals.quantity}
                iconSource={mealImage}
              />
            </View>
            <View style={styles.itemsViewStyle}>
              <MealComponentPart
                iconText={this.props.allMeals.foodCategory}
                iconSource={halalImage}
              />
            </View>

            <View style={styles.itemsViewStyle}>
              <MealComponentPart
                iconText={this.props.allMeals.foodType}
                iconSource={vegetarianImage}
              />
            </View>
            <View style={styles.itemsViewStyle}>
              <MealComponentPart
                iconText={
                  splittedStartData2[0] +
                  ":" +
                  splittedStartData2[1] +
                  " " +
                  "to" +
                  " " +
                  splittedEndData2[0] +
                  ":" +
                  splittedEndData2[1]
                }
                iconSource={clockImage}
                textSize={9}
              />
            </View>
          </View>
          {/* third */}
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={styles.itemsViewStyle}>
              <MealComponentPart
                iconText={this.props.allMeals.contactName}
                iconSource={shopImage}
                imageHeight={18}
                imageWidth={21}
              />
            </View>
            <View style={styles.itemsViewStyle}>
              {this.props.showCashOnPick ? (
                <MealComponentPart
                  iconText={this.props.allMeals.contactNumber}
                  iconSource={landlineImage}
                />
              ) : (
                false
              )}
            </View>
            <View style={styles.bottomButtonStyle} />
          </View>

          {/* fourth */}
          <View style={{ flex: 1, flexDirection: "row" }}>
            {/* <View style={[styles.itemsViewStyle, { flex: 2.5 }]}>
              <MealComponentPart
                iconText={this.props.allMeals.contactNumber}
                iconSource={landlineImage}
              />
            </View> */}

            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={this.props.onDeatil}
                style={styles.editButtonStyle}
              >
                <Text style={{ fontSize: MEDIUM, color: "white" }}>Edit</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={styles.deleteButtonStyle}
                onPress={() =>
                  this.props.deleteMeal(this.props.allMeals._id, this)
                }
              >
                {this.state.spin ? (
                  <Spinner size={12} style={{ color: BORDER_COLOR }} />
                ) : (
                  <Text style={{ fontSize: MEDIUM, color: "white" }}>
                    Delete
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ height: 5 }} />
      </View>
    );
  }
}

export default connect(
  null,
  { deleteMeal }
)(BLD_MealComponent);

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
  boxStyle: {
    minHeight: 180,
    width: "97%",
    elevation: 1,
    backgroundColor: "white",
    alignSelf: "center",
    borderRadius: 5,
    borderWidth: 0.3,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  itemsViewStyle: {
    flex: 1,
    justifyContent: "center",

    alignItems: "center"
  },
  bottomButtonStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 10
  },
  editButtonStyle: {
    height: 30,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    elevation: 1,
    borderRadius: 30,

    borderRadius: 100,
    backgroundColor: DIFFERENT_GREEN
  },
  deleteButtonStyle: {
    height: 30,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    elevation: 1,
    borderRadius: 30,

    borderRadius: 100,
    backgroundColor: "red"
  },
  buttonViewStyle: {
    flex: 1,
    width: "80%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  },

  broadCastButton: {
    height: 25,

    width: "100%",
    backgroundColor: "#3c8dbc",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",

    justifyContent: "center",
    elevation: 1
  }
});
