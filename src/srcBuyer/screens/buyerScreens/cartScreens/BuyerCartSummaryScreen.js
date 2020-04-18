import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar
} from "react-native";
import {
  Container,
  Content,
  Icon,
  FooterTab,
  Footer,
  Right,
  Left,
  Button
} from "native-base";
import ProductDetailComponent from "../../../components/productDetailComponent";
import {
  SCREEN_BG_COLOR,
  Button_BG_COLOR,
  WHITE_COLOR,
  SCREEN_COLOR_DARKER
} from "../../../../theme/color";
import { MEDIUM } from "../../../../theme/font";
export default class CartSummaryScreen extends Component {
  render() {
    return (
      <Container>
        <StatusBar backgroundColor={Button_BG_COLOR} barStyle="light-content" />
        <View style={{ height: 50, flexDirection: "row" }}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("BuyerCartScreen")}
            >
              <Icon name="arrow-back" style={{ fontSize: 20 }} />
            </TouchableOpacity>
          </View>
          <View
            style={{ flex: 2, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontSize: 20 }}>SummaryScreen</Text>
          </View>
          <View style={{ flex: 1 }}></View>
        </View>

        <View style={styles.pageTitleStyle}>
          <Text>Summary of the Order</Text>
        </View>
        <Content>
          <View style={{ height: 20 }} />
          <ScrollView
            horizontal={true}
            style={{ height: 180, flexDirection: "row", paddingLeft: 20 }}
          >
            <ProductDetailComponent
              mealImage={require("../../../../images/menu.jpg")}
            />
            <ProductDetailComponent
              mealImage={require("../../../../images/menu.jpg")}
            />
            <ProductDetailComponent
              mealImage={require("../../../../images/menu.jpg")}
            />
            <ProductDetailComponent
              mealImage={require("../../../../images/menu.jpg")}
            />
          </ScrollView>

          {/* ////// */}

          <View style={{ height: 40 }} />
          <View style={styles.lineStyle} />
          <View style={styles.textsMainViewStyle}>
            <View style={styles.desViewStyle}>
              <Text style={{ color: "black", fontSize: MEDIUM }}>
                Sub Total
              </Text>
            </View>
            <View style={styles.priceViewStyle}>
              <Text
                style={{ color: "black", fontSize: MEDIUM, fontWeight: "bold" }}
              >
                $399
              </Text>
            </View>
          </View>

          <View style={styles.textsMainViewStyle}>
            <View style={styles.desViewStyle}>
              <Text style={{ color: "black", fontSize: MEDIUM }}>
                Delivery Charges
              </Text>
            </View>
            <View style={styles.priceViewStyle}>
              <Text
                style={{ color: "black", fontSize: MEDIUM, fontWeight: "bold" }}
              >
                $50
              </Text>
            </View>
          </View>

          <View style={styles.textsMainViewStyle}>
            <View style={styles.desViewStyle}>
              <Text style={{ color: "black", fontSize: MEDIUM }}>Tax</Text>
            </View>
            <View style={styles.priceViewStyle}>
              <Text
                style={{ color: "black", fontSize: MEDIUM, fontWeight: "bold" }}
              >
                $39
              </Text>
            </View>
          </View>
          <View style={styles.lineStyle} />
          <View style={{ height: 20 }} />
        </Content>
        <Footer>
          <FooterTab style={{ backgroundColor: WHITE_COLOR }}>
            <Left style={{ marginLeft: "6%" }}>
              <Text style={{ color: "grey" }}>Total</Text>
              <Text style={{ fontWeight: "bold", color: SCREEN_COLOR_DARKER }}>
                $1500
              </Text>
            </Left>
            <Right>
              <Button
                style={styles.buttonStyle}
                onPress={() =>
                  this.props.navigation.navigate("BuyerOrderedMealScreen")
                }
              >
                <Text style={{ color: "white" }}> Checkout </Text>
              </Button>
            </Right>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  pageTitleStyle: {
    height: 50,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  lineStyle: {
    height: 1,
    width: "95%",
    backgroundColor: "#979797",
    alignSelf: "center"
  },
  textsMainViewStyle: {
    height: 50,
    width: "90%",
    alignSelf: "center",
    flexDirection: "row"
  },
  desViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  priceViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end"
  },
  buttonStyle: {
    marginRight: "13%",
    backgroundColor: SCREEN_COLOR_DARKER,
    width: 130,
    justifyContent: "center"
  }
});
