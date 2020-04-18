import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { Button, Icon, Content } from "native-base";

import CustomTextInput from "../../../components/customComponents/CuustomTextInput";
import CustomFooter from "../../../components/customComponents/customFooter";
import CustomHeader from "../../../../srcSeller/components/customComponents/customHeader";
import { Button_BG_COLOR } from "../../../../theme/color";

export default class CheckoutSecondScreen extends Component {
  static navigationOptions = () => {
    return {
      header: null
    };
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar backgroundColor={Button_BG_COLOR} barStyle="light-content" />
        {/* <CustomHeader showBackButton headerTitle={'Checkout'} /> */}
        <View style={{ height: 50, flexDirection: "row" }}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("PartnerCheckoutFirstScreen")
              }
            >
              <Icon name="arrow-back" style={{ fontSize: 20 }} />
            </TouchableOpacity>
          </View>
          <View
            style={{ flex: 2, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontSize: 20 }}>Checkout</Text>
          </View>
          <View style={{ flex: 1 }}></View>
        </View>
        <Content>
          <View style={{ height: 30 }} />
          {/* <View style={styles.ButtonsView}>
            <View style={styles.ButtonInnerView}>
              <Button style={styles.Button}>
                <Icon name="paypal" type="FontAwesome" />
              </Button>
            </View>

            <View style={styles.ButtonInnerView}>
              <Button style={styles.Button}>
                <Icon name="cc-visa" type="FontAwesome" />
              </Button>
            </View>
          </View> */}
          <View style={{ height: 30 }} />
          <CustomTextInput FeildTitle="Name on Card" placeholder="Enter Name" />
          <View style={{ height: 15 }} />
          <CustomTextInput
            FeildTitle="Card Number"
            placeholder="Enter Card Number"
          />
          <View style={{ height: 10 }}></View>
          <View style={styles.textFeildView}>
            <View style={{ flex: 1 }}>
              <CustomTextInput FeildTitle="Expiry Date" placeholder="09/18" />
            </View>
            <View style={{ flex: 1 }}>
              <CustomTextInput FeildTitle="CCV" placeholder="xxx" />
            </View>
          </View>
          <View style={{ height: 20 }}></View>
          <View
            style={{
              height: 30,
              flexDirection: "row",
              witdh: "90%",
              alignItems: "center"
              // justifyContent: "center"
              // alignSelf: "center"
            }}
          >
            <View style={{ width: 30 }}></View>
            {/* <Icon
              name="check"
              type="FontAwesome"
              style={{fontSize: 20, color: GREEN}}
            />
            <View style={{width: 30}}></View>
            <Text>Save this card details</Text> */}
          </View>
          <View style={{ height: 20 }}></View>
        </Content>
        <CustomFooter
          showIcon
          Text1="Back"
          Text2="Next"
          onPress1={() =>
            this.props.navigation.navigate("PartnerCheckoutFirstScreen")
          }
          onPress2={() =>
            this.props.navigation.navigate("PartnerCheckoutSummaryScreen")
          }
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ButtonsView: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center"
  },
  ButtonInnerView: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  Button: {
    width: "60%",
    height: 40,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00C569"
  },
  textFeildView: {
    height: 70,
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  }
});
