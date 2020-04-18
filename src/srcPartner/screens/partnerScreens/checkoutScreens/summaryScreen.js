import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { Container, Content, Icon, CheckBox } from "native-base";
import ProductDetailComponent from "../../../components/productDetailComponent";
import {
  SCREEN_BG_COLOR,
  Button_BG_COLOR,
  GREEN
} from "../../../../theme/color";
import { MEDIUM, SMALL } from "../../../../theme/font";
import CustomHeader from "../../../../srcSeller/components/customComponents/customHeader";
import CustomFooter from "../../../components/customComponents/customFooter";
export default class SummaryScreen extends Component {
  state = { check: false };

  toggleCheckBox = () => {
    this.setState({ check: !this.state.check });
  };

  render() {
    return (
      <Container>
        <StatusBar backgroundColor={Button_BG_COLOR} barStyle="light-content" />
        <View style={{ height: 50, flexDirection: "row" }}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("PartnerCheckoutSecondScreen")
              }
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

          <View style={{ height: 10 }} />
          <View style={styles.textHeadingViewStyle}>
            <Text style={{ fontSize: MEDIUM, fontWeight: "bold" }}>
              Payment
            </Text>
          </View>

          <View style={styles.mainViewStyle}>
            <View style={styles.innerViewStyle}>
              <Icon
                name="cc-mastercard"
                type="FontAwesome"
                style={{ color: SCREEN_BG_COLOR }}
              />
            </View>
            <View style={[styles.innerViewStyle, { flex: 3 }]}>
              <Text style={{ fontSize: SMALL }}>Payment</Text>
              <View style={{ height: 5 }} />
              <Text style={{ fontSize: SMALL }}>**** **** **** 3454</Text>
            </View>
            <View style={[styles.innerViewStyle, { alignItems: "center" }]}>
              <CheckBox
                color={Button_BG_COLOR}
                checked={true}
                style={{ height: 19, width: 19 }}
              />
            </View>
          </View>
          <TouchableOpacity>
            <Text style={{ marginLeft: "5%", color: GREEN }}>Change</Text>
          </TouchableOpacity>

          <View style={{ height: 10 }} />
          <View style={[styles.mainViewStyle, { width: "75%" }]}>
            <View style={styles.innerViewStyle}>
              <Text>Self Pickup</Text>
            </View>

            <View style={[styles.innerViewStyle, { alignItems: "flex-end" }]}>
              <CheckBox
                color={Button_BG_COLOR}
                checked={this.state.check}
                onPress={() => this.toggleCheckBox()}
                style={{ height: 19, width: 19 }}
              />
            </View>
          </View>
          <View style={[styles.mainViewStyle, { width: "75%" }]}>
            <View style={styles.innerViewStyle}>
              <Text>Delivery</Text>
            </View>

            <View style={[styles.innerViewStyle, { alignItems: "flex-end" }]}>
              <CheckBox
                color={Button_BG_COLOR}
                checked={this.state.check}
                onPress={() => this.toggleCheckBox()}
                style={{ height: 19, width: 19 }}
              />
            </View>
          </View>
          <View style={[styles.mainViewStyle, { width: "90%" }]}>
            <View style={styles.innerViewStyle}>
              <Text>Your Order</Text>
            </View>

            <View style={[styles.innerViewStyle, { alignItems: "flex-end" }]}>
              <Text>#65</Text>
            </View>
          </View>

          {/* view */}

          <View style={{ height: 15 }} />
          <View
            style={{
              height: 200,
              width: "75%",
              alignSelf: "center",
              borderRadius: 10,
              borderColor: "gray",
              borderWidth: 1
            }}
          >
            <View style={styles.viewStyle1}>
              <Text style={{ color: "gray" }}>
                Seher Resturant/Chicken Rice
              </Text>
            </View>

            <View style={{ height: 1, backgroundColor: "gray" }} />
            <View style={styles.outerViewStyle}>
              <View style={styles.viewStyle1}>
                <Text>SubTotal</Text>
              </View>

              <View style={styles.viewStyle1}>
                <Text style={{ color: "gray" }}>$334</Text>
              </View>
            </View>

            <View style={{ height: 1, backgroundColor: "gray" }} />
            <View style={styles.outerViewStyle}>
              <View style={styles.viewStyle1}>
                <Text>SubTotal</Text>
              </View>

              <View style={styles.viewStyle1}>
                <Text style={{ color: "gray" }}>$334</Text>
              </View>
            </View>
            <View style={{ height: 1, backgroundColor: "gray" }} />
            <View style={styles.outerViewStyle}>
              <View style={styles.viewStyle1}>
                <Text>SubTotal</Text>
              </View>

              <View style={styles.viewStyle1}>
                <Text style={{ color: "gray" }}>$334</Text>
              </View>
            </View>
          </View>
        </Content>

        <View style={{ height: 10 }} />
        <CustomFooter
          showIcon
          Text1="Back"
          Text2="Pay"
          onPress1={() =>
            this.props.navigation.navigate("PartnerCheckoutSecondScreen")
          }
          onPress2={() =>
            this.props.navigation.navigate("PartnerOrderHistoryScreen")
          }
          navigation={this.props.navigation}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textHeadingViewStyle: {
    height: 40,
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "flex-start"
  },
  mainViewStyle: {
    height: 50,
    width: "90%",
    alignSelf: "center",
    flexDirection: "row"
  },
  innerViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  viewStyle1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  outerViewStyle: {
    flex: 1,
    flexDirection: "row"
  }
});
