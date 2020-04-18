import React, { Component } from "react";
import { StyleSheet, StatusBar } from "react-native";
import {
  Container,
  Content,
  Text,
  Button,
  FooterTab,
  Footer,
  Left,
  Right
} from "native-base";
import {
  WHITE_COLOR,
  SCREEN_COLOR_DARKER,
  SCREEN_BG_COLOR,
  Button_BG_COLOR
} from "../../../../theme/color";
import CartCounterComponent from "../../../components/cartCounterComponent";
import CustomHeader from "../../../../srcSeller/components/customComponents/customHeader";
export default class CheckoutFirstScreen extends Component {
  render() {
    return (
      <Container>
        <CustomHeader
          headerText={"Cart"}
          onPressMenu={() => this.props.navigation.toggleDrawer()}
        />
        <StatusBar backgroundColor={Button_BG_COLOR} barStyle="light-content" />
        <Content>
          <CartCounterComponent showText />
          <CartCounterComponent showText />
          <CartCounterComponent showText />
          <CartCounterComponent showText />
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
                  this.props.navigation.navigate("PartnerCheckoutSecondScreen")
                }
              >
                <Text> Checkout </Text>
              </Button>
            </Right>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    marginRight: "13%",
    backgroundColor: SCREEN_COLOR_DARKER,
    width: 130,
    justifyContent: "center"
  }
});
