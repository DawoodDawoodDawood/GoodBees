import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList
} from "react-native";
import { Spinner, Text } from "native-base";
import MealComponentPart from "../../../customeComponents/partOfCustomMeal";
import { SMALL, EXTRA_SMALL, MEDIUM } from "../../../theme/font";
import { Button_BG_COLOR, WHITE_COLOR } from "../../../theme/color";
import { IMG_URL } from "../../../appStore/BASE_URL";
import { connect } from "react-redux";
import { askForconfirmation } from "../../store/actions/BroadCastActions/broadCastActions";
class CustomMealComponent extends Component {
  componentDidMount() {}
  state = { spinnnerMove: false };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.boxStyle}>
          <View
            style={{
              flex: 2,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                resizeMode={"stretch"}
                source={{ uri: IMG_URL + this.props.menus.menuImgURL[0] }}
                style={{
                  height: "80%",
                  width: "80%",
                  borderRadius: 5
                }}
              />
            </View>
            <View
              style={{
                flex: 2,
                justifyContent: "center",
                alignItems: "flex-start"
              }}
            >
              <Text style={{ fontSize: MEDIUM }}>
                {this.props.menus.menuName}
              </Text>
              <Text note style={{ fontSize: SMALL }}>
                Price: {this.props.menus.price}$
              </Text>
            </View>
          </View>

          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 3 }} />
            <View style={styles.bottomButtonStyle}>
              {this.state.spinnnerMove ? (
                <Spinner />
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    this.props.askForconfirmation(this.props.broadCastID, this)
                  }
                  style={{
                    height: 25,
                    width: "100%",
                    alignSelf: "center",
                    backgroundColor: this.props.bgColor
                      ? this.props.bgColor
                      : "green",
                    borderRadius: 3,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text style={{ fontSize: 10, color: "white" }}>
                    Confirmation
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          {/* fifth */}
        </View>

        <FlatList
          key={this.props.broadCastID}
          data={this.props.IntrestedBuyers}
          renderItem={({ item }) => (
            <View key={this.props.broadCastID}>
              <View style={{ width: "80%", alignSelf: "center" }}>
                <View
                  style={{
                    flex: 2,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Image
                      source={{ uri: IMG_URL + item.buyerImgURL[0] }}
                      style={{
                        height: 55,
                        width: 55,
                        borderRadius: 5
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 3,
                      justifyContent: "center",
                      alignItems: "flex-start"
                    }}
                  >
                    <Text style={{ fontSize: SMALL }}>{item.buyerName}</Text>
                  </View>
                </View>

                <View style={{ height: 8 }} />
              </View>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  patnerID: state.LoadUserReducer.userData
});
export default connect(
  mapStateToProps,
  { askForconfirmation }
)(CustomMealComponent);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: "white",
    elevation: 1,
    width: "97%",
    alignSelf: "center"
  },
  boxStyle: {
    height: 90,
    width: "97%",
    alignSelf: "center",
    borderRadius: 5,

    justifyContent: "center",
    alignItems: "center"
  },
  itemsViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  bottomButtonStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
