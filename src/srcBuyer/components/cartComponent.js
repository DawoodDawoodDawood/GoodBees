import React, { Component } from "react";
import { StyleSheet, View, Modal, Alert } from "react-native";
import { Text, Spinner } from "native-base";
import { Button_BG_COLOR, WHITE_COLOR } from "../../theme/color";
import CustomDropdown from "./customComponents/customDropdown";
import { DeliveryTypeArray } from "../../customeComponents/DropDown/dropDownValues";
import CustomTimePicker from "./customComponents/CustomTimePicker";
import CustomParallelButton from "./customComponents/customParallelButton";
import CartCounterComponent from "./cartCounterComponent";
import { connect } from "react-redux";
import {
  placeOrder,
  orderLinePrePaper,
} from "../store/actions/orderAction/orderAction";
import MyOrderClass from "../businessLogic/MyOrder/MyOrder";
import {
  decrimentCartProduct,
  incrimentCartProduct,
  deleteCompleteToCart,
} from "../store/actions/cartAction/cartAction";
import VoucherCodePopup from "../components/popups/OrderDetail";
class CartComponent extends Component {
  state = {
    deliveryType: "",
    modalVisible: false,
    selfPcikUp: false,
    delivery: false,
    buyerName: "",
    buyerContact: "",
    buyerAddress: "",
    timeOfDelivery: "",
    spinnerMove: false,
  };
  onModalPress = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };
  componentDidMount() {
    if (this.props.cartData.seller.delivery === true) {
      this.setState({ deliveryType: "DELIVERY" });
    }
    if (this.props.cartData.seller.selfPickUp === true) {
      this.setState({ deliveryType: "SELFPICKUP" });
    }

    this.setState({
      buyerContact: this.props.cartData.buyer.phone,
      buyerAddress: this.props.cartData.buyer.address,
      buyerName: this.props.cartData.buyer.buyerName,
      selfPcikUp: this.props.cartData.seller.selfPickUp,
      delivery: this.props.cartData.seller.delivery,
    });
  }
  render() {
    const date = new Date(Date.now()).toISOString();
    const datee = date.split("T");
    const dateee = Date.parse(
      datee[0] + "T" + this.state.timeOfDelivery + ":00Z"
    );

    return (
      <React.Fragment>
        <View style={{ height: 10 }} />
        {/* Title */}
        <View style={styles.cartTitleStyle}>
          <Text style={{ fontWeight: "bold", color: Button_BG_COLOR }}>
            Cart # {this.props.index + 1}
          </Text>
        </View>

        {this.props.cartData.foodItems.map((data, index) => (
          <CartCounterComponent
            onIncrement={() =>
              this.props.incrimentCartProduct(this.props.cartData._id, data._id)
            }
            onDecrement={() =>
              this.props.decrimentCartProduct(this.props.cartData._id, data._id)
            }
            key={index}
            cartId={this.props.cartData._id}
            foodItemsData={data}
            navigation={this.props.navigation}
          />
        ))}

        {/* Dropdown */}
        {this.state.delivery === true && this.state.selfPcikUp === false ? (
          <CustomDropdown
            width={"90%"}
            onValueChange={(text) => this.setState({ deliveryType: text })}
            value={this.state.deliveryType}
            pickerArray={[{ key: "DELIVERY", value: "DELIVERY" }]}
            title="Delivery Type"
          />
        ) : (
          false
        )}
        {this.state.delivery === false && this.state.selfPcikUp === true ? (
          <CustomDropdown
            width={"90%"}
            onValueChange={(text) => this.setState({ deliveryType: text })}
            value={this.state.deliveryType}
            pickerArray={[{ key: "SELFPICKUP", value: "SELFPICKUP" }]}
            title="Delivery Type"
          />
        ) : (
          false
        )}
        {this.state.delivery === true && this.state.selfPcikUp === true ? (
          <CustomDropdown
            width={"90%"}
            onValueChange={(text) => this.setState({ deliveryType: text })}
            value={this.state.deliveryType}
            pickerArray={DeliveryTypeArray}
            title="Delivery Type"
          />
        ) : (
          false
        )}

        {/* Picker */}
        <View style={{ height: 15 }} />
        <CustomTimePicker
          placeholder={
            this.state.deliveryType === "SELFPICKUP"
              ? "PickUp Time"
              : "Delivery Time"
          }
          disabled
          showIcon
          width={"90%"}
          timeRef={(ref) => (this.TimePicker1 = ref)}
          defaultValue={this.state.timeOfDelivery}
          iconName="clock-o"
          title="Select Time"
          onCancle={() => this.TimePicker1.close()}
          onPress={() => this.TimePicker1.open()}
          onConfirm={(hour, minute) => {
            this.setState({ timeOfDelivery: `${hour}:${minute}` });
            this.TimePicker1.close();
            if (hour != "" && minute != "") {
              this.setState({
                timeValidate: true,
              });
            } else {
              this.setState({
                timeValidate: false,
              });
            }
          }}
        />

        {/* Button */}
        <View style={{ height: 10 }} />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            width: "90%",
            alignSelf: "center",
            height: 30,
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1, paddingLeft: 40 }}>
            <Text style={{ fontWeight: "bold", color: Button_BG_COLOR }}>
              Total
            </Text>
          </View>

          <View style={{ flex: 1, paddingLeft: 70 }}>
            <Text style={{ fontWeight: "bold", color: Button_BG_COLOR }}>
              {this.props.cartData.totalBill}
            </Text>
          </View>
        </View>
        {this.state.spinnerMove ? (
          <Spinner color="red" />
        ) : (
          <CustomParallelButton
            showIcon
            Text1="Delete Cart"
            Text2="Checkout"
            buttonBgColor1={"red"}
            buttonBgColor2={Button_BG_COLOR}
            buttonBorderColor1={"red"}
            buttonBorderColor2={Button_BG_COLOR}
            buttonTextColor={WHITE_COLOR}
            onPress1={() =>
              this.props.deleteCompleteToCart(this.props.cartData._id, this)
            }
            onPress2={() => {
              this.props.orderLinePrePaper(this.props.cartData._id);
              if (this.state.timeOfDelivery === "") {
                if (this.state.deliveryType === "SELFPICKUP") {
                  Alert.alert("Select PickUp Time");
                } else if (this.state.deliveryType === "DELIVERY") {
                  Alert.alert("Select Delivery Time");
                }
              } else if (this.state.deliveryType === "") {
                Alert.alert("deliveryType");
              } else {
                this.onModalPress();
              }
            }}
          />
        )}

        <View style={{ height: 15 }} />
        <Modal
          animationType="slide"
          transparent={true}
          presentationStyle="overFullScreen"
          visible={this.state.modalVisible}
          onRequestClose={() => this.onModalPress()}
        >
          <VoucherCodePopup
            vouchereCode={this.state.newVoucherCode}
            buyerName={this.state.buyerName}
            buyerAddress={this.state.buyerAddress}
            buyerContact={this.state.buyerContact}
            onbuyerNameChange={(text) => this.setState({ buyerName: text })}
            onbuyerAddressChange={(text) =>
              this.setState({ buyerAddress: text })
            }
            onbuyerContactChange={(text) =>
              this.setState({ buyerContact: text })
            }
            setModalVisible={() => this.onModalPress()}
            navigation={this.props.navigation}
            onOrderPlace={() => {
              // console.log(t)
              this.props.placeOrder(
                new MyOrderClass().setOrder(
                  this.props.cartData._id,
                  this.props.cartData.buyer._id,
                  this.props.cartData.seller._id,
                  this.props.cartData.totalBill,
                  5,
                  this.state.delivery,
                  this.state.selfPcikUp,
                  {
                    buyerName: this.state.buyerName,
                    buyerContact: this.state.buyerContact,
                    buyerAddress: this.state.buyerAddress,
                  },
                  dateee,
                  this.props.orderLindData
                ),
                this
              );
            }}
          />
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  buyerId: state.LoadUserReducer.userData._id,
  orderLindData: state.BuyerCartReducer.orderLineCart,
});

export default connect(
  mapStateToProps,
  {
    placeOrder,
    decrimentCartProduct,
    incrimentCartProduct,
    deleteCompleteToCart,
    orderLinePrePaper,
  }
)(CartComponent);

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
