import React, { Component } from "react";
import { StyleSheet, ScrollView, StatusBar, Alert } from "react-native";
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
  showBookedOrdersOfBuyer,
  showDeliveredOrdersOfBuyer,
  markOrderDelivered
} from "../../store/actions/orderAction/orderAction";

class SellerOrderScreen extends Component {
  state = { spinnerMove: false };

  componentDidMount() {
    this.props.showBookedOrdersOfBuyer(this.props.sellerId, "BUYER", this);

    this.props.showDeliveredOrdersOfBuyer(this.props.sellerId, "BUYER", this);
  }
  render() {
    return (
      <Container>
        <CustomHeader
          headerText={"Orders To Buyers"}
          onPressMenu={() => this.props.navigation.toggleDrawer()}
        />
        <StatusBar backgroundColor={Button_BG_COLOR} barStyle="light-content" />

        <Tabs tabBarUnderlineStyle={{ backgroundColor: Button_BG_COLOR }}>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: WHITE_COLOR }}>
                <Text
                  style={{
                    color: Button_BG_COLOR,
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
                {this.props.buyerBookedOrders.map((bbo, index) => (
                  <CustomOrderComponent
                    booked
                    orderDelivered={() =>
                      this.props.markOrderDelivered(bbo._id, this)
                    }
                    orderDetails={() => {
                      this.props.navigation.navigate(
                        "OrderDeailScreenSeller",

                        {
                          orderLine: JSON.stringify(bbo.orderLine)
                        }
                      );
                    }}
                    thirdBuyer
                    key={index}
                    Orders={bbo}
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
                    color: Button_BG_COLOR,
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
                {this.props.buyerDeliveredOrders.map((bdo, index) => (
                  <CustomOrderComponent
                    thirdBuyer
                    orderDetails={() => {
                      this.props.navigation.navigate(
                        "OrderDeailScreenSeller",

                        {
                          orderLine: JSON.stringify(bdo.orderLine)
                        }
                      );
                    }}
                    key={index}
                    Orders={bdo}
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
  buyerBookedOrders: state.SellerOrderReducer.BookedOrdersOfBuyer,

  buyerDeliveredOrders: state.SellerOrderReducer.DeliveredOrersOfBuyer
});

export default connect(
  mapStateToProps,
  {
    showBookedOrdersOfBuyer,
    markOrderDelivered,
    showDeliveredOrdersOfBuyer
  }
)(SellerOrderScreen);
