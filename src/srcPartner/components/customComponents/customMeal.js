import React, { Component } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Button, Text } from "native-base";
import MealComponentPart from "../../../customeComponents/partOfCustomMeal";
import { SMALL, EXTRA_SMALL } from "../../../theme/font";
import { Button_BG_COLOR, WHITE_COLOR } from "../../../theme/color";

let mealImage = require("../../../images/meal.png");
let halalImage = require("../../../images/halal.png");
let vegetarianImage = require("../../../images/vegetable.png");
let clockImage = require("../../../images/time.png");
let truckImage = require("../../../images/truck.png");
let personImage = require("../../../images/person.png");
let phoneImage = require("../../../images/phone.png");
let locationImage = require("../../../images/location.png");
let landlineImage = require("../../../images/landline.png");
export default class CustomMealComponent extends Component {
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
                source={require("../../../images/menu.jpg")}
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
              <Text style={{ fontSize: SMALL }}>Toast</Text>
              <Text note style={{ fontSize: EXTRA_SMALL }}>
                This is a seafood dish ,rice included withmultiple souces and
                this dish have agreat
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
                  backgroundColor: Button_BG_COLOR,
                  width: "80%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 15
                }}
              >
                <Text style={{ color: WHITE_COLOR, fontSize: EXTRA_SMALL }}>
                  Breakfast
                </Text>
              </View>
              <View style={{ height: 5 }} />
              <TouchableOpacity
                style={{
                  height: 25,
                  width: "80%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 15,
                  alignSelf: "center",
                  borderColor: this.props.bddColor
                    ? this.props.bddColor
                    : Button_BG_COLOR,
                  borderWidth: 1,
                  backgroundColor: this.props.bggColor
                    ? this.props.bggColor
                    : WHITE_COLOR
                }}
              >
                <Text
                  style={{
                    color: this.props.butttonTextColor
                      ? this.props.butttonTextColor
                      : Button_BG_COLOR,
                    fontSize: EXTRA_SMALL,
                    fontWeight: "bold"
                  }}
                >
                  {this.props.butttonText ? this.props.butttonText : "Deliver"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* second */}
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={styles.itemsViewStyle}>
              <MealComponentPart iconText="x 3" iconSource={mealImage} />
            </View>
            <View style={styles.itemsViewStyle}>
              <MealComponentPart iconText="Halal" iconSource={halalImage} />
            </View>

            <View style={[styles.itemsViewStyle, { flex: 1.5 }]}>
              <MealComponentPart
                iconText="Vegetarian"
                iconSource={vegetarianImage}
              />
            </View>
            <View style={[styles.itemsViewStyle, { flex: 2 }]}>
              <MealComponentPart
                textSize={9}
                iconText="10:00 AM to 10:30 AM"
                iconSource={clockImage}
              />
            </View>
          </View>
          {/* third */}
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
          {/* fourth */}
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

            {this.props.showPartner ? (
              <View style={styles.itemsViewStyle}>
                <MealComponentPart
                  iconText="Partner Phone No."
                  iconSource={landlineImage}
                />
              </View>
            ) : (
              <View style={{ flex: 1 }} />
            )}
          </View>
          {/* fifth */}
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 3 }}>
              <MealComponentPart
                iconText="Jinnah Town, Sahiwal PUnjab Pakistan"
                iconSource={locationImage}
                imageWidth={15}
              />
            </View>
            <View style={styles.bottomButtonStyle}>
              {this.props.secondButton ? (
                <TouchableOpacity
                  style={{
                    height: 25,
                    width: "90%",
                    alignSelf: "center",
                    backgroundColor: this.props.bgColor
                      ? this.props.bgColor
                      : "green",
                    borderRadius: 3,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text style={{ fontSize: EXTRA_SMALL, color: WHITE_COLOR }}>
                    {this.props.secondButtonText
                      ? this.props.secondButtonText
                      : ""}
                  </Text>
                </TouchableOpacity>
              ) : (
                <View
                  style={{
                    height: 25,
                    alignSelf: "center",
                    borderRadius: 15,
                    borderWidth: 1,
                    borderColor: "red",
                    width: "90%",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text style={{ fontSize: EXTRA_SMALL, color: "red" }}>
                    Booked
                  </Text>
                </View>
              )}
            </View>
            <View style={{ width: 8 }}></View>
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
    borderColor: "#cbcbcb",
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
    alignItems: "center"
  }
});
