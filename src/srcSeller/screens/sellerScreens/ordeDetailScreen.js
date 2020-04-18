import React, { Component } from "react";
import { View, ScrollView, StatusBar } from "react-native";
// import { Container, Tab, Tabs, TabHeading, Text, Spinner } from "native-base";
import {
  Header,
  Container,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text
} from "native-base";
import {
  WHITE_COLOR,
  SCREEN_BG_COLOR,
  Button_BG_COLOR
} from "../../../theme/color";

import CustomMealComponent from "../../components/customComponents/customOrderDetailComponent";
import { connect } from "react-redux";

class OrderDetailScreen extends Component {
  state = { spinnerMove: false };

  componentDidMount() {}

  render() {
    const orderLine = JSON.parse(
      this.props.navigation.getParam("orderLine", "")
    );

    console.log(orderLine);
    return (
      <Container>
        <Header
          style={{ backgroundColor: Button_BG_COLOR, justifyContent: "center" }}
        >
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" style={{ color: "white" }} />
            </Button>
          </Left>
          <Body style={{ color: WHITE_COLOR }}>
            <Text style={{ color: WHITE_COLOR }}>Order Detail</Text>
          </Body>
          <Right>
            {this.props.showHeaderButton ? (
              <TouchableOpacity
                onPress={this.props.onPressRightButton}
                style={{
                  height: 35,
                  borderColor: Button_BG_COLOR,
                  borderWidth: 1,
                  width: "100%",
                  backgroundColor: SCREEN_BG_COLOR,
                  alignSelf: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 5
                }}
              >
                <Text style={{ color: WHITE_COLOR }}>
                  {this.props.buttonText}
                </Text>
              </TouchableOpacity>
            ) : (
              false
            )}
          </Right>
        </Header>
        <StatusBar backgroundColor={Button_BG_COLOR} barStyle="light-content" />

        {/* {this.state.spinnerMove ? (
          <Spinner color={Button_BG_COLOR} />
        ) : ( */}
        <View style={{ height: 19 }} />
        <ScrollView>
          {orderLine.map((pbo, index) => (
            <CustomMealComponent
              booked
              thirdPatner
              showDiliveryButton
              showCashOnPick
              data={pbo}
            />
          ))}
        </ScrollView>
        {/* )} */}
      </Container>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {}
)(OrderDetailScreen);
