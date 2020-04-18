import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Alert,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Button, Text, Spinner } from "native-base";
import { SMALL, EXTRA_SMALL } from "../../../theme/font";
import { WHITE_COLOR, Button_BG_COLOR } from "../../../theme/color";
import { IMG_URL } from "../../../appStore/BASE_URL";
import { connect } from "react-redux";
import { addMenuToCart } from "../../../srcBuyer/store/actions/cartAction/cartAction";
import { sendBroadcastToBuyer } from "../../store/actions/BroadCastActions/broadCastActions";
import BroadCastFilter from "../popups/BroadCastFilterComponent";
class MenuComponent extends Component {
  state = {
    menuQuantity: 1,
    modalVisible: false,
    minVal: 0,
    maxVal: 0,
    spinnerMove: false,
    filterSpinner: false,
  };
  onModalPress = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };
  increaseQuantity() {
    quantityPlus = this.state.menuQuantity + 1;
    this.setState({ menuQuantity: quantityPlus });
  }

  decreaseQuantity() {
    if (this.state.menuQuantity > 1) {
      quantityMinus = this.state.menuQuantity - 1;
      this.setState({ menuQuantity: quantityMinus });
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ height: 10 }} />
        <View style={styles.boxStyle}>
          <View
            style={{
              flex: 1.2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              resizeMode={"stretch"}
              source={{ uri: IMG_URL + this.props.menus.menuImgURL[0] }}
              style={{
                height: "70%",
                width: "80%",
                borderRadius: 20,
              }}
            />
          </View>

          <View
            style={{
              flex: 2,
            }}
          >
            <View style={styles.viewStyle}>
              <Text style={{ fontSize: SMALL }}>
                {this.props.menus.menuName}
              </Text>
              <Text note style={{ fontSize: EXTRA_SMALL }}>
                {this.props.menus.price}
              </Text>
            </View>
            <View
              style={[
                styles.viewStyle,
                { flex: 1.2, justifyContent: "flex-start", marginTop: 5 },
              ]}
            >
              <View style={styles.counterMainBoxStyle}>
                <TouchableOpacity
                  style={styles.viewStyle2}
                  onPress={() => this.decreaseQuantity()}
                >
                  <Text style={{ fontSize: 20 }}>-</Text>
                </TouchableOpacity>
                <View style={styles.viewStyle2}>
                  <Text>{this.state.menuQuantity}</Text>
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
            style={{
              flex: 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {this.state.spinnerMove ? (
                <Spinner color={Button_BG_COLOR} size={22} />
              ) : (
                <Button
                  onPress={() => this.onModalPress()}
                  style={{
                    height: 30,
                    borderRadius: 5,
                    alignSelf: "center",
                    backgroundColor: Button_BG_COLOR,
                  }}
                >
                  <Text style={{ fontSize: EXTRA_SMALL, color: WHITE_COLOR }}>
                    {this.props.secondButtonText
                      ? this.props.secondButtonText
                      : "Broad Cast"}
                  </Text>
                </Button>
              )}
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* {this.state.spinnerMove ? (
                <Spinner color={Button_BG_COLOR} size={22} />
              ) : (
                <Button
                  // onPress={() =>
                  //   this.props.addMenuToCart(
                  //     "MENU",
                  //     this.props.menus._id,
                  //     this.props.menus.seller,
                  //     this.props.menus.price * this.state.menuQuantity,
                  //     this.state.menuQuantity,
                  //     this.props.buyerId,
                  //     this
                  //   )
                  // }
                  style={{
                    height: 30,
                    borderRadius: 5,
                    alignSelf: "center",
                    backgroundColor: Button_BG_COLOR,
                  }}
                >
                  <Text style={{ fontSize: EXTRA_SMALL, color: WHITE_COLOR }}>
                    {this.props.secondButtonText
                      ? this.props.secondButtonText
                      : "Add to Cart"}
                  </Text>
                </Button>
              )} */}
            </View>
          </View>
        </View>
        <View style={{ height: 2 }} />
        <Modal
          animationType="slide"
          transparent={true}
          presentationStyle="overFullScreen"
          visible={this.state.modalVisible}
          onRequestClose={() => this.onModalPress()}
        >
          <BroadCastFilter
            filterSpinner={this.state.filterSpinner}
            minVal={this.props.minVal}
            maxVal={this.state.maxVal}
            onMinValCall={(text) => {
              this.setState({ minVal: text });
            }}
            onMaxValCall={(text) => {
              this.setState({ maxVal: text });
            }}
            onApplyFilterButton={() => {
              if (this.state.minVal <= 0) {
                Alert.alert("Enter valide MinVal");
              } else if (this.state.minVal >= 60) {
                Alert.alert("Minimum Age can not be greater than 60");
              } else if (this.state.maxVal <= 15) {
                Alert.alert("Enter a Max Age greater than 15");
              } else if (this.state.maxVal >= 100) {
                Alert.alert("Max age can not be greater than 100");
              } else {
                this.props.sendBroadcastToBuyer(
                  this.props.patnerID._id,
                  this.props.menus._id,
                  this.props.sellerID,
                  this.state.minVal,
                  this.state.maxVal,
                  this
                );
              }
            }}
            onSendWithoutFilter={() =>
              this.props.sendBroadcastToBuyer(
                this.props.patnerID._id,
                this.props.menus._id,
                this.props.sellerID,
                0,
                200,
                this
              )
            }
          />
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  patnerID: state.LoadUserReducer.userData,
});

export default connect(
  mapStateToProps,
  { addMenuToCart, sendBroadcastToBuyer }
)(MenuComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boxStyle: {
    height: 90,
    width: "90%",
    alignSelf: "center",
    borderRadius: 5,
    elevation: 2,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
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

  ///
  viewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  counterMainBoxStyle: {
    height: 30,
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
});
