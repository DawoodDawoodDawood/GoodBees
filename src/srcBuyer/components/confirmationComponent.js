import React, { Component } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Button, Text, Spinner } from "native-base";
import { SMALL, EXTRA_SMALL, MEDIUM } from "../../theme/font";
import { WHITE_COLOR, Button_BG_COLOR } from "../../theme/color";
import { IMG_URL } from "../../appStore/BASE_URL";
import { connect } from "react-redux";
import { showIntrestAgainstBroadCast } from "../store/actions/BroadCast/broadCastActions";
class MenuComponent extends Component {
  state = { menuQuantity: 1, spinnerMove: false };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ height: 10 }} />
        <View style={styles.boxStyle}>
          <View
            style={{
              flex: 1.2,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              source={{ uri: IMG_URL + this.props.menus.menuImgURL[0] }}
              style={{
                height: "70%",
                width: "80%",
                borderRadius: 5
              }}
            />
          </View>

          <View
            style={{
              flex: 2
            }}
          >
            <View style={styles.viewStyle}>
              <Text style={{ fontSize: MEDIUM }}>
                {this.props.menus.menuName}
              </Text>
              <View style={{ height: 6 }} />
              <Text note style={{ fontSize: SMALL }}>
                Price: {this.props.menus.price}$
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 2,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {this.state.spinnerMove ? (
              <Spinner color={Button_BG_COLOR} size={22} />
            ) : (
              <Button
                onPress={() =>
                  this.props.showIntrestAgainstBroadCast(
                    this.props.broadCastID,
                    this.props.buyerId,
                    this
                  )
                }
                style={{
                  height: 30,
                  borderRadius: 5,
                  alignSelf: "center",
                  backgroundColor: Button_BG_COLOR
                }}
              >
                <Text style={{ fontSize: EXTRA_SMALL, color: WHITE_COLOR }}>
                  {"Confirm Order"}
                </Text>
              </Button>
            )}
          </View>
        </View>
        <View style={{ height: 2 }} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  buyerId: state.LoadUserReducer.userData._id
});

export default connect(
  mapStateToProps,
  { showIntrestAgainstBroadCast }
)(MenuComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    flexDirection: "row"
  },
  itemsViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonStyle: {
    height: 30,
    width: 100,
    alignSelf: "center",
    borderColor: "red",
    borderWidth: 1,
    backgroundColor: WHITE_COLOR,
    justifyContent: "center",
    marginBottom: 20
  },

  ///
  viewStyle: {
    flex: 1,
    paddingTop: 20,
    alignItems: "flex-start"
  },
  counterMainBoxStyle: {
    height: 30,
    width: 100,
    borderRadius: 2,
    backgroundColor: "#F0F0F0",
    flexDirection: "row"
  },
  viewStyle2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
