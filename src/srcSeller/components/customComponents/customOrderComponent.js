import React, { Component } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Button, Text } from "native-base";
import MealComponentPart from "../../../customeComponents/partOfCustomMeal";
import { SMALL, EXTRA_SMALL, MEDIUM } from "../../../theme/font";
import {
  Button_BG_COLOR,
  WHITE_COLOR,
  DIFFERENT_BLUE
} from "../../../theme/color";

let mealImage = require("../../../images/meal.png");
let halalImage = require("../../../images/halal.png");
let vegetarianImage = require("../../../images/vegetable.png");
let clockImage = require("../../../images/time.png");
let truckImage = require("../../../images/truck.png");
let personImage = require("../../../images/person.png");
let phoneImage = require("../../../images/phone.png");
let locationImage = require("../../../images/location.png");

export default class CustomOrderComponent extends Component {
  render() {
    const data = this.props.Orders.newOrderDate.split("T");
    console.log(this.props.Orders);
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
                flex: 3,
                paddingLeft: 10,
                justifyContent: "center",
                alignItems: "flex-start"
              }}
            >
              <Text style={{ fontSize: MEDIUM }}>Order ID#</Text>
              <Text note style={{ fontSize: EXTRA_SMALL }}>
                {this.props.Orders._id}
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
                  width: "70%",
                  buttonRadius: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  backgroundColor: Button_BG_COLOR,
                  borderRadius: 20,
                  opacity: 0.8
                }}
              >
                <Text
                  style={{
                    color: WHITE_COLOR,
                    fontSize: EXTRA_SMALL,
                    alignSelf: "center"
                  }}
                >
                  Booked
                </Text>
              </View>
              <View style={{ height: 5 }} />

              <TouchableOpacity
                onPress={this.props.orderDetails}
                style={{
                  height: 25,
                  width: "70%",
                  buttonRadius: 30,
                  justifyContent: "center",
                  alignItems: "center",

                  borderRadius: 20,

                  alignSelf: "center",
                  borderColor: Button_BG_COLOR,
                  borderWidth: 1,
                  backgroundColor: WHITE_COLOR
                }}
              >
                <Text style={{ color: Button_BG_COLOR, fontSize: EXTRA_SMALL }}>
                  Details
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* second */}
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={[styles.itemsViewStyle]}>
              <MealComponentPart
                iconText={this.props.Orders.totalPrice + "$"}
                iconSource={halalImage}
              />
            </View>

            <View style={[styles.itemsViewStyle, { flex: 1 }]}>
              <MealComponentPart
                iconText="Vegetarian"
                iconSource={vegetarianImage}
              />
            </View>
            <View style={[styles.itemsViewStyle, { flex: 1 }]}>
              <MealComponentPart
                iconText={data[0]}
                iconSource={clockImage}
                textSize={9}
              />
            </View>
            <View style={[styles.itemsViewStyle, { flex: 1 }]}>
              <MealComponentPart
                iconText={data[0]}
                iconSource={clockImage}
                textSize={9}
              />
            </View>
          </View>
          {/* {third for buyer} */}
          {this.props.thirdBuyer ? (
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={styles.itemsViewStyle}>
                <MealComponentPart
                  iconText="Self Pickup"
                  iconSource={truckImage}
                />
              </View>
              <View style={styles.itemsViewStyle}>
                <MealComponentPart
                  iconText={
                    this.props.Orders.buyer
                      ? this.props.Orders.buyer.buyerName
                      : ""
                  }
                  iconSource={personImage}
                />
              </View>
              <View style={styles.itemsViewStyle}>
                <MealComponentPart
                  iconText={
                    this.props.Orders.buyer ? this.props.Orders.buyer.phone : ""
                  }
                  iconSource={phoneImage}
                />
              </View>
            </View>
          ) : (
            false
          )}
          {/* third for patners */}
          {this.props.thirdPatner ? (
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={styles.itemsViewStyle}>
                <MealComponentPart
                  iconText="Delivery"
                  iconSource={truckImage}
                  imageHeight={18}
                  imageWidth={25}
                />
              </View>
              <View style={styles.itemsViewStyle}>
                {this.props.showCashOnPick ? (
                  <MealComponentPart
                    iconText="Cash on Pick"
                    iconSource={truckImage}
                    imageHeight={18}
                    imageWidth={25}
                  />
                ) : (
                  false
                )}
              </View>
              <View style={{ flex: 1 }} />
            </View>
          ) : (
            false
          )}
          {/* fourth */}
          {this.props.thirdPatner ? (
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={styles.itemsViewStyle}>
                <MealComponentPart
                  iconText="Buyer Name"
                  iconSource={personImage}
                />
              </View>
              <View style={styles.itemsViewStyle}>
                <MealComponentPart
                  iconText="Buyer Phone No."
                  iconSource={phoneImage}
                />
              </View>
              <View style={{ flex: 1 }} />
            </View>
          ) : (
            false
          )}
          {/* fifth */}
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 4, alignItems: "flex-start" }}>
              <MealComponentPart
                iconText="Jinnah Town, Sahiwal PUnjab Pakistan"
                iconSource={locationImage}
                imageWidth={15}
              />
            </View>
            <View style={styles.bottomButtonStyle}>
              {this.props.booked ? (
                <TouchableOpacity
                  onPress={this.props.orderDelivered}
                  style={{
                    height: 25,
                    width: "100%",
                    buttonRadius: 30,
                    justifyContent: "center",
                    alignItems: "center",

                    borderRadius: 20,

                    alignSelf: "center",
                    elevation: 2,
                    backgroundColor: DIFFERENT_BLUE
                  }}
                >
                  <Text style={{ fontSize: EXTRA_SMALL, color: "white" }}>
                    Delivered
                  </Text>
                </TouchableOpacity>
              ) : (
                <View
                  style={{
                    height: 25,
                    width: "100%",
                    buttonRadius: 30,
                    justifyContent: "center",
                    alignItems: "center",

                    borderRadius: 20,

                    alignSelf: "center",

                    backgroundColor: Button_BG_COLOR
                  }}
                >
                  <Text style={{ fontSize: EXTRA_SMALL, color: "white" }}>
                    Delivered
                  </Text>
                </View>
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
    flex: 1,
    marginTop: 10
  },
  boxStyle: {
    height: 190,
    width: "97%",
    alignSelf: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#f5f5f5",
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
    paddingRight: 10,

    alignItems: "center"
  }
});
