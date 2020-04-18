import React, { Component } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Button, Text } from "native-base";
import { SMALL, EXTRA_SMALL } from "../../theme/font";
import { WHITE_COLOR } from "../..//color";

export default class CartCounterComponent extends Component {
  render() {
    return (
      <React.Fragment>
        <View style={{ height: 15 }} />
        <View style={styles.boxStyle}>
          <View
            style={{
              flex: 1.3,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              source={require("../../images/menu.jpg")}
              style={{
                height: 80,
                width: 80,
                borderRadius: 5
              }}
            />
          </View>
          <View
            style={{
              flex: 3
            }}
          >
            <View style={styles.viewStyle}>
              <Text style={{ fontSize: SMALL }}>Meal Number 1</Text>
              <Text note style={{ fontSize: EXTRA_SMALL }}>
                1200$
              </Text>
            </View>
            <View style={[styles.viewStyle, { flex: 1.2 }]}>
              <View style={styles.counterMainBoxStyle}>
                <TouchableOpacity style={styles.viewStyle2}>
                  <Text style={{ fontSize: 20 }}>-</Text>
                </TouchableOpacity>
                <View style={styles.viewStyle2}>
                  <Text>3</Text>
                </View>
                <TouchableOpacity style={styles.viewStyle2}>
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  boxStyle: {
    height: 100,
    width: "97%",
    alignSelf: "center",
    borderRadius: 5,
    borderColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  itemsViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonStyle: {
    height: 30,
    width: 100,
    alignSelf: "center",
    borderColor: "red",
    borderWidth: 1,
    backgroundColor: WHITE_COLOR,
    justifyContent: "center",
    marginBottom: 20
  },
  viewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  counterMainBoxStyle: {
    height: 40,
    width: 100,
    borderRadius: 2,
    backgroundColor: "#F0F0F0",
    flexDirection: "row"
  },
  viewStyle2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
