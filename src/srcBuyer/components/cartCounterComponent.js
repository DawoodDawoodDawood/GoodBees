import React, { Component } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Button, Text, Spinner } from "native-base";
import { SMALL, EXTRA_SMALL } from "../../theme/font";
import { Button_BG_COLOR, WHITE_COLOR } from "../../theme/color";
import CustomDropdown from "../components/customComponents/customDropdown";
import { DeliveryTypeArray } from "../../customeComponents/DropDown/dropDownValues";
import CustomTimePicker from "../components/customComponents/CustomTimePicker";
import CustomParallelButton from "../components/customComponents/customParallelButton";
import { connect } from "react-redux";
import { deleteToCart } from "../store/actions/cartAction/cartAction";
import { IMG_URL } from "../../appStore/BASE_URL";
class CartCounterComponent extends Component {
  state = {
    deliveryType: "",
    spinnerMove: false,
    cartItemDeleted: false,
    showCount: 0,
  };
  componentDidMount() {
    this.setState({ showCount: this.props.foodItemsData.quantity });
  }
  increaseQuantity = () => {
    quantityPlus = this.state.showCount + 1;
    this.setState({ showCount: quantityPlus });
    this.props.onIncrement();
  };
  decreaseQuantity() {
    if (this.state.showCount > 1) {
      quantityMinus = this.state.showCount - 1;
      this.setState({ showCount: quantityMinus });
      this.props.onDecrement();
    } else {
    }
  }
  render() {
    return (
      <React.Fragment>
        <View style={{ height: 10 }} />
        <View style={styles.boxStyle}>
          <View style={styles.imageViewStyle}>
            <Image
              source={{
                uri: this.props.foodItemsData.meal
                  ? IMG_URL + this.props.foodItemsData.meal.mealImgURL[0]
                  : IMG_URL + this.props.foodItemsData.menu.menuImgURL[0],
              }}
              style={styles.imageStyle}
            />
          </View>
          <View
            style={{
              flex: 1,
            }}
          >
            <View style={styles.viewStyle}>
              <Text style={{ fontSize: SMALL }}>
                {this.props.foodItemsData.meal
                  ? this.props.foodItemsData.meal.mealName
                  : this.props.foodItemsData.menu.menuName}
              </Text>
              <Text note style={{ fontSize: EXTRA_SMALL }}>
                {this.props.foodItemsData.meal
                  ? this.props.foodItemsData.meal.price
                  : this.props.foodItemsData.menu.price}
              </Text>
            </View>
            <View style={[styles.viewStyle, { flex: 1.2 }]}>
              <View style={styles.counterMainBoxStyle}>
                <TouchableOpacity
                  style={styles.viewStyle2}
                  onPress={() => this.decreaseQuantity()}
                >
                  <Text style={{ fontSize: 20 }}>-</Text>
                </TouchableOpacity>
                <View style={styles.viewStyle2}>
                  <Text>{this.state.showCount}</Text>
                </View>
                <TouchableOpacity
                  style={styles.viewStyle2}
                  onPress={() => this.increaseQuantity()}
                >
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View
            style={[
              styles.viewStyle2,
              { justifyContent: "flex-end", marginBottom: 8 },
            ]}
          >
            {this.state.spinnerMove ? (
              <Spinner color={"red"} size={20} />
            ) : (
              <Button
                rounded
                style={styles.deleteButtonStyle}
                onPress={() =>
                  this.props.deleteToCart(
                    this.props.cartId,
                    this.props.foodItemsData._id,
                    this
                  )
                }
              >
                <Text style={{ color: "red", fontSize: EXTRA_SMALL }}>
                  Delete
                </Text>
              </Button>
            )}
          </View>
        </View>
      </React.Fragment>
    );
  }
}

export default connect(null, { deleteToCart })(CartCounterComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cartTitleStyle: {
    height: 30,
    width: "90%",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    alignSelf: "center",
  },

  boxStyle: {
    height: 100,
    width: "90%",
    alignSelf: "center",
    borderRadius: 5,
    borderColor: "grey",
    flexDirection: "row",
  },
  imageViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  imageStyle: {
    height: "85%",
    width: "80%",
    borderRadius: 5,
  },
  itemsViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    height: 30,
    width: 100,
    alignSelf: "center",
    borderColor: "red",
    borderWidth: 1,
    backgroundColor: WHITE_COLOR,
    justifyContent: "center",
    marginBottom: 20,
  },
  viewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  counterMainBoxStyle: {
    height: 40,
    width: 100,
    borderRadius: 2,
    backgroundColor: "#F0F0F0",
    flexDirection: "row",
  },
  viewStyle2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonStyle: {
    height: 28,
    width: 90,
    borderColor: "red",
    borderWidth: 1,
    backgroundColor: WHITE_COLOR,
    justifyContent: "center",
  },
});
