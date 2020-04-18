import React, { Component } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Button, Text, Spinner } from "native-base";
import { SMALL, EXTRA_SMALL, LARGE, MEDIUM } from "../../../theme/font";
import { WHITE_COLOR } from "../../../theme/color";
import { IMG_URL } from "../../../appStore/BASE_URL";
import { connect } from "react-redux";
import { deleteMenu } from "../../store/actions/menuActions/menuActions";

class MenuComponent extends Component {
  state = { spinnerMove: false, menuDeleted: false };
  render() {
    if (this.state.menuDeleted) {
      this.props.navigation.navigate("SellerMenuListScreen");
    }

    return (
      <React.Fragment>
        <View style={{ height: 15 }} />
        <View style={styles.boxStyle}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                flex: 2,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                resizeMode={"stretch"}
                source={{ uri: IMG_URL + this.props.menuList.menuImgURL[0] }}
                style={{
                  height: "90%",
                  width: "90%",
                  borderRadius: 5
                }}
              />
            </View>
            <View
              style={{
                flex: 2
              }}
            >
              <View style={{ flex: 2, paddingTop: 10, fontWeight: "700" }}>
                <Text style={{ fontSize: MEDIUM }}>
                  {this.props.menuList.menuName}
                </Text>

                <View style={{ height: 10 }} />
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <Image
                    style={{ height: 20, width: 30 }}
                    resizeMode={"stretch"}
                    source={require("../../../images/currency.png")}
                  ></Image>
                  <View style={{ width: 10 }}></View>
                  <Text style={{ fontSize: MEDIUM }}>
                    {this.props.menuList.price}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row"
                }}
              >
                <View style={styles.buttonViewStyle}>
                  {this.state.spinnerMove ? (
                    <Spinner color={"red"} />
                  ) : (
                    <Button
                      onPress={() =>
                        this.props.deleteMenu(this.props.menuList._id, this)
                      }
                      rounded
                      style={styles.deleteButtonStyle}
                    >
                      <Text style={{ color: "red", fontSize: EXTRA_SMALL }}>
                        Delete
                      </Text>
                    </Button>
                  )}
                </View>
                <View style={styles.buttonViewStyle}>
                  <Button
                    onPress={() =>
                      this.props.navigation.navigate("SellerAddMenuScreen", {
                        data: JSON.stringify(this.props.menuList)
                      })
                    }
                    rounded
                    style={styles.editButtonStyle}
                  >
                    <Text style={{ color: "orange", fontSize: EXTRA_SMALL }}>
                      Edit
                    </Text>
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </View>
      </React.Fragment>
    );
  }
}

export default connect(null, { deleteMenu })(MenuComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  boxStyle: {
    minHeight: 120,
    width: "97%",
    alignSelf: "center",
    borderRadius: 5,

    elevation: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  itemsViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonViewStyle: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  deleteButtonStyle: {
    height: 28,
    width: 75,
    borderColor: "red",
    borderWidth: 1,
    backgroundColor: WHITE_COLOR,
    justifyContent: "center",
    elevation: 1
  },
  broadCastButton: {
    height: 30,
    width: "100%",
    borderColor: "red",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: WHITE_COLOR,
    justifyContent: "center",
    elevation: 1
  },
  editButtonStyle: {
    height: 28,
    width: 75,
    borderColor: "orange",
    borderWidth: 1,
    elevation: 1,
    backgroundColor: WHITE_COLOR,
    justifyContent: "center"
  }
});
