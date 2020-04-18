import React, { Component } from "react";
import { StyleSheet, ScrollView, StatusBar } from "react-native";
import { Container, Tab, Tabs, TabHeading, Text, Spinner } from "native-base";
import {
  WHITE_COLOR,
  SCREEN_BG_COLOR,
  Button_BG_COLOR
} from "../../../theme/color";
import CustomHeader from "../../components/customComponents/customHeader";

import { SMALL } from "../../../theme/font";
import CustomOrderComponent from "../../components/customComponents/customOrderComponent";
import { connect } from "react-redux";
import {
  showBookedOrdersOfPartner,
  showDeliveredOrdersOfPartner
} from "../../store/actions/orderAction/orderAction";

class SellerOrderScreen extends Component {
  state = { spinnerMove: false };

  componentDidMount() {
    this.props.showBookedOrdersOfPartner(this.props.sellerId, "PARTNER", this);

    this.props.showDeliveredOrdersOfPartner(
      this.props.sellerId,
      "PARTNER",
      this
    );
  }
  render() {
    return (
      <Container>
        <CustomHeader
          headerText={"Orders To Partner"}
          onPressMenu={() => this.props.navigation.toggleDrawer()}
        />
        <StatusBar backgroundColor={Button_BG_COLOR} barStyle="light-content" />

        <Tabs tabBarUnderlineStyle={{ backgroundColor: SCREEN_BG_COLOR }}>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: WHITE_COLOR }}>
                <Text
                  style={{
                    color: SCREEN_BG_COLOR,
                    fontSize: SMALL,
                    fontWeight: "800"
                  }}
                >
                  Booked Orders
                </Text>
              </TabHeading>
            }
          >
            {this.state.spinnerMove ? (
              <Spinner color={Button_BG_COLOR} />
            ) : (
              <ScrollView>
                {this.props.partnerBookedOrders.map((pbo, index) => (
                  <CustomOrderComponent
                    booked
                    orderDetails={() => {
                      this.props.navigation.navigate("OrderDeailScreenSeller");
                    }}
                    thirdPatner
                    showDiliveryButton
                    showCashOnPick
                    key={index}
                    partnerboookedOrders={pbo}
                  />
                ))}
              </ScrollView>
            )}
          </Tab>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: WHITE_COLOR }}>
                <Text
                  style={{
                    color: SCREEN_BG_COLOR,
                    fontSize: SMALL,
                    fontWeight: "800"
                  }}
                >
                  Delivered
                </Text>
              </TabHeading>
            }
          >
            {this.state.spinnerMove ? (
              <Spinner color={Button_BG_COLOR} />
            ) : (
              <ScrollView>
                {this.props.partnerDeliveredOrders.map((pdo, index) => (
                  <CustomOrderComponent
                    orderDetails={() => {
                      this.props.navigation.navigate("OrderDeailScreenSeller");
                    }}
                    thirdPatner
                    showCashOnPick
                    key={index}
                    partnerrdeliveredOrders={pdo}
                  />
                ))}
              </ScrollView>
            )}
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  sellerId: state.LoadUserReducer.userData._id,

  partnerBookedOrders: state.SellerOrderReducer.BookedOrdersOfPartner,

  partnerDeliveredOrders: state.SellerOrderReducer.DeliveredOrersOfPartner
});

export default connect(
  mapStateToProps,
  {
    showBookedOrdersOfPartner,

    showDeliveredOrdersOfPartner
  }
)(SellerOrderScreen);
