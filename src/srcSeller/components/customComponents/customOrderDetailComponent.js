import React, { Component } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Button, Text } from "native-base";
import MealComponentPart from "../../../customeComponents/partOfCustomMeal";
import { SMALL, EXTRA_SMALL, MEDIUM } from "../../../theme/font";

import { IMG_URL } from "../../../appStore/BASE_URL";

export default class CustomMealComponent extends Component {
  render() {
    return (
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
              resizeMode={"stretch"}
              source={{
                uri:
                  IMG_URL + this.props.data.meal
                    ? this.props.data.meal.mealImgURL[0]
                    : this.props.data.menu.menuImgURL[0]
              }}
              style={{
                height: 70,
                width: 70,
                borderRadius: 15
              }}
            />
          </View>
          <View
            style={{
              flex: 2,

              justifyContent: "center",
              alignItems: "flex-start",
              height: "100%"
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "flex-end",
                flexDirection: "row"
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: MEDIUM }}>
                  {this.props.data.meal
                    ? this.props.data.meal.mealName
                    : this.props.data.menu.menuName}
                </Text>
              </View>
              {this.props.data.meal ? (
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <Text style={{ fontSize: SMALL }}>V.C:</Text>
                  <View style={{ width: 4 }} />
                  <Text note style={{ fontSize: SMALL }}>
                    {this.props.data.meal.voucherCode}
                  </Text>
                </View>
              ) : (
                false
              )}
            </View>
            <View style={{ height: 10 }} />
            {this.props.data.meal ? (
              <View style={{ flex: 1 }}>
                <Text note style={{ fontSize: SMALL }}>
                  {this.props.data.meal.mealDescription}
                </Text>
              </View>
            ) : (
              false
            )}
          </View>
        </View>

        {/* second */}
        <View style={{ height: 10 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxStyle: {
    minHeight: 100,
    width: "90%",
    alignSelf: "center",
    borderRadius: 5,
    borderWidth: 1,
    elevation: 2,
    backgroundColor: "white",
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
