import React, { Component } from "react";
import { StyleSheet, StatusBar, FlatList } from "react-native";
import { Container, Content, Spinner } from "native-base";
import {
  WHITE_COLOR,
  Button_BG_COLOR,
  SCREEN_BG_COLOR
} from "../../../theme/color";
import CustomHeader from "../../components/customComponents/customHeader";
import BLD_MealComponent from "../../components/BLD_MealComponent";
import { orderedMealOfBuyer } from "../../store/actions/orderAction/orderAction";
import { connect } from "react-redux";
import CustomOrderComponent from "../../components/orderHistoryComponent";
class OrderHistoryScreen extends Component {
  state = { spinnerMove: false };
  componentDidMount() {
    this.props.orderedMealOfBuyer(this.props.buyerId, this);
  }
  render() {
    return (
      <Container style={styles.container}>
        <CustomHeader
          onPressMenu={() => this.props.navigation.toggleDrawer()}
          headerText={"Ordered Items"}
        />

        <Content>
          <StatusBar
            backgroundColor={Button_BG_COLOR}
            barStyle="light-content"
          />
          {this.state.spinnerMove ? (
            <Spinner color={Button_BG_COLOR} />
          ) : (
            <FlatList
              data={this.props.orderedMealData}
              renderItem={({ item, index }) => (
                <CustomOrderComponent
                  booked
                  orderDetails={() => {
                    this.props.navigation.navigate(
                      "OrderDeailScreenSeller",

                      {
                        orderLine: JSON.stringify(item.orderLine)
                      }
                    );
                  }}
                  thirdBuyer
                  key={index}
                  Orders={item}
                />
              )}
              keyExtractor={item => item.id}
            />
          )}
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  buyerId: state.LoadUserReducer.userData._id,
  orderedMealData: state.BuyerOrderReducer.orderedMeal
});

export default connect(
  mapStateToProps,
  {
    orderedMealOfBuyer
  }
)(OrderHistoryScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5"
  },
  pageTitleViewStyle: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: WHITE_COLOR
  }
});
