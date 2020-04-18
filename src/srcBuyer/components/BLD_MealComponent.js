import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Button, Text } from "native-base";
import MealComponentPart from "../../customeComponents/partOfCustomMeal";
import { SMALL, EXTRA_SMALL } from "../../theme/font";
import { Button_BG_COLOR, WHITE_COLOR } from "../../theme/color";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IMG_URL } from "../../appStore/BASE_URL";

let mealImage = require("../../images/meal.png");
let halalImage = require("../../images/halal.png");
let vegetarianImage = require("../../images/vegetable.png");
let clockImage = require("../../images/time.png");
let shopImage = require("../../images/shop.png");
let landlineImage = require("../../images/phone.png");

export default class BLD_MealComponent extends Component {
  render() {
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
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                source={{ uri: IMG_URL + this.props.allMeals.mealImgURL[0] }}
                style={{
                  height: 55,
                  width: 55,
                  borderRadius: 5
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
                flex: 1.5,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  height: 25,
                  alignSelf: "center",
                  backgroundColor: this.props.buttonBgColor
                    ? this.props.buttonBgColor
                    : Button_BG_COLOR,
                  width: 80,
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={{
                    color: WHITE_COLOR,
                    fontSize: SMALL,
                    paddingBottom: 2
                  }}
                >
                  {this.props.allMeals.mealType}
                </Text>
              </View>
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

            <View style={[styles.itemsViewStyle, { flex: 1.5 }]}>
              <MealComponentPart
                iconText={this.props.allMeals.foodType}
                iconSource={vegetarianImage}
              />
            </View>
            {/* {this.props.emptyDate ? (
              <View style={{ flex: 1 }} />
            ) : (
              <View style={[styles.itemsViewStyle, { flex: 2 }]}>
                <MealComponentPart
                  iconText={
                    this.props.timeIconText
                      ? this.props.timeIconText
                      : "10:00 AM to 10:30 AM"
                  }
                  iconSource={clockImage}
                />
              </View>
            )} */}
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
              <MealComponentPart
                iconText={
                  this.props.phoneNumber
                    ? this.props.phoneNumber
                    : "Jinnah Town, Sahiwal PUnjab Pakistan"
                }
                iconSource={landlineImage}
              />
            </View>
            <View style={{ flex: 1 }} />
          </View>

          {/* fourth */}
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 2 }}>
              {/* <MealComponentPart
                iconText={
                  this.props.phoneNumber
                    ? this.props.phoneNumber
                    : "Jinnah Town, Sahiwal PUnjab Pakistan"
                }
                iconSource={landlineImage}
              /> */}
            </View>
            <View style={styles.bottomButtonStyle}>
              {this.props.secondButton ? (
                <TouchableOpacity
                  // onPress={() =>
                  //   this.props.navigation.navigate('BuyerOrderPlacementScreen')
                  // }
                  onPress={() =>
                    this.props.navigation.navigate(
                      "BuyerOrderPlacementScreen",
                      {
                        completeMeals: JSON.stringify(this.props.allMeals)
                      }
                    )
                  }
                  style={{
                    height: 25,
                    width: 80,
                    borderRadius: 5,
                    alignSelf: "flex-end",
                    marginRight: 10,
                    marginBottom: 5,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: this.props.bgColor
                      ? this.props.bgColor
                      : Button_BG_COLOR
                  }}
                >
                  <Text style={{ fontSize: SMALL, color: WHITE_COLOR }}>
                    {this.props.secondButtonText
                      ? this.props.secondButtonText
                      : "Ordered"}
                  </Text>
                </TouchableOpacity>
              ) : (
                <Button
                  bordered
                  danger
                  rounded
                  style={{ height: 25, alignSelf: "center" }}
                >
                  <Text style={{ fontSize: EXTRA_SMALL, color: "red" }}>
                    Delete
                  </Text>
                </Button>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
  boxStyle: {
    height: 150,
    width: "97%",
    alignSelf: "center",
    borderRadius: 5,
    elevation: 2,
    backgroundColor: "white",

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
    alignItems: "flex-end"
  }
});
