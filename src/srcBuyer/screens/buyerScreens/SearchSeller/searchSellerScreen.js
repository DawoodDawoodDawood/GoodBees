import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Dimensions,
  StatusBar,
  Image,
} from "react-native";
import { Container, Content, Text } from "native-base";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

import {
  WHITE_COLOR,
  Button_BG_COLOR,
  MEDIUM,
  LARGE,
  EXTRA_SMALL,
  SMALL,
} from "../../../../theme/font";
import CustomSearchBar from "../../../components/customComponents/customSearchBar";
import SearchLocationModal from "../../../components/popups/searchLocationModal";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import Geolocation from "@react-native-community/geolocation";
import { searchNearestSeller } from "../../../store/actions/SearchSellerAndMeal/SearchMealAndSeller";
import { IMG_URL } from "../../../../appStore/BASE_URL";
import CustomHeader from "../../../components/customComponents/customHeader";

class SearchSellerScreen extends Component {
  state = {
    modalVisible: false,
    longitude: 0,
    latitude: 0,
    SellerID: "",
    SellerImage: "",
    SellerName: "",
    showModalData: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  componentDidMount() {
    Geolocation.getCurrentPosition((info) =>
      this.setState({
        longitude: info.coords.longitude,
        latitude: info.coords.latitude,
      })
    );
  }
  render() {
    return (
      <React.Fragment>
        <Container>
          <CustomHeader
            onPressIcon={() => this.props.navigation.goBack()}
            showHeaderButton
            showHeaderButton2={true}
            onPressIcon2={() => {
              Geolocation.getCurrentPosition((info) => {
                this.setState({
                  longitude: info.coords.longitude,
                  latitude: info.coords.latitude,
                });
                this.props.searchNearestSeller(
                  this.props.buyerId,
                  info.coords.longitude,
                  info.coords.latitude,
                  this
                );
              });
            }}
            // onPressIcon={() => {
            //   Geolocation.getCurrentPosition((info) => {
            //     this.props.searchNearestSeller(
            //       this.props.buyerId,
            //       info.coords.longitude,
            //       info.coords.latitude,
            //       this
            //     );
            //   });
            // }}
            imageIcon={require("../../../../images/list.png")}
            headerText={"Nearest Seller List"}
            onPressMenu={() => this.props.navigation.toggleDrawer()}
          />

          <Content>
            {/* <CustomSearchBar
              placeholderText={"Search Sellers by Location"}
              backgroundColor={WHITE_COLOR}
            /> */}
            <StatusBar
              backgroundColor={Button_BG_COLOR}
              barStyle="light-content"
            />
            {this.state.showModalData ? (
              <View style={styles.barsButtonStyle}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{ uri: IMG_URL + this.state.SellerImage }}
                    style={{ height: 50, width: 50, borderRadius: 50 }}
                  />
                </View>
                <View
                  style={{
                    flex: 2,
                    justifyContent: "center",
                    alignItems: "flex-start",
                  }}
                >
                  <Text style={{ fontSize: LARGE }}>
                    {this.state.SellerName}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 2,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.push(
                        "BuyerSideSpecificSellerMealsMenusScreen",
                        {
                          SellerID: this.state.SellerID,
                        }
                      )
                    }
                    style={{
                      height: 40,
                      width: 100,
                      borderColor: "green",
                      borderWidth: 1,
                      borderRadius: 2,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontSize: SMALL }}>Show Items</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              false
            )}

            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
            >
              <SearchLocationModal
                setModalVisible={() =>
                  this.setModalVisible(!this.state.modalVisible)
                }
              />
            </Modal>

            <MapView
              provider={PROVIDER_GOOGLE}
              style={{ width: "100%", height: Dimensions.get("window").height }}
              region={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
            >
              {this.props.nearestSellerData.map((item) => (
                <Marker
                  onPress={() => {
                    this.setState({
                      showModalData: true,
                      SellerName: item.sellerName,
                      SellerImage: item.sellerImgURL[0],
                      SellerID: item._id,
                    });
                  }}
                  coordinate={{
                    latitude: item.location.latitude,
                    longitude: item.location.longitude,
                  }}
                  // title={"Location 1"}
                  // description={"Location 1 Description"}
                />
              ))}
            </MapView>
          </Content>
        </Container>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  buyerId: state.LoadUserReducer.userData._id,
  nearestSellerData: state.BuyerSearchMealAndSeller.nearestSeller,
});

export default connect(
  mapStateToProps,
  {
    searchNearestSeller,
  }
)(SearchSellerScreen);
const styles = StyleSheet.create({
  barsButtonStyle: {
    position: "absolute",
    zIndex: 999,
    top: 70,
    backgroundColor: "white",
    width: 300,
    height: 60,
    borderRadius: 10,
    borderColor: "green",
    borderWidth: 2,
    flexDirection: "row",
    alignSelf: "center",
  },
});
