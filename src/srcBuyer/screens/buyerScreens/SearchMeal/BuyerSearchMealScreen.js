import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Alert,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import {
  Container,
  Content,
  Icon,
  Button,
  Right,
  Left,
  Text,
} from "native-base";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import CustomHeader from "../../../components/customComponents/customHeader";
import {
  showAllMealsToBuyer,
  showAllBreakFastMealsToBuyer,
  showAllLunchMealsToBuyer,
  showAllDinnerMealsToBuyer,
} from "../../../store/actions/meal_menuActions/meal_menuActions";
import { WHITE_COLOR, Button_BG_COLOR } from "../../../../theme/color";
import CustomSearchBar from "../../../components/customComponents/customSearchBar";
import SearchLocationModal from "../../../components/popups/searchLocationModal";
import { connect } from "react-redux";
class BuyerSearchMealScreen extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  render() {
    return (
      <Container>
        <CustomHeader
          showHeaderButton
          onPressIcon={() =>
            this.props.navigation.navigate("BuyerAllMealListScreen")
          }
          imageIcon={require("../../../../images/list.png")}
          headerText={"SearchMeal"}
          onPressMenu={() => this.props.navigation.toggleDrawer()}
        />
        <StatusBar backgroundColor={Button_BG_COLOR} barStyle="light-content" />
        <Content>
          {/* <CustomSearchBar
            placeholderText={"Search any Location"}
            backgroundColor={WHITE_COLOR}
          /> */}
          <TouchableOpacity style={styles.barsButtonStyle}>
            <Icon style={{ color: "grey" }} name="compass" />
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            presentationStyle="pageSheet"
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
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          >
            <Marker
              onPress={() => {
                this.setModalVisible(true);
              }}
              coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
              title={"Location 1"}
              description={"Location 1 Description"}
            />
            {this.props.allMealsForBuyer.map((item) => (
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
    );
  }
}
const mapStateToProps = (state) => ({
  allMealsForBuyer: state.BuyerMealMenuReducer.buyerAllMeals,
  allBreakfastsForBuyer: state.BuyerMealMenuReducer.buyerAllBreakFastMeals,
  allLunchForBuyer: state.BuyerMealMenuReducer.buyerAllLunchMeals,
  allDinnerForBuyer: state.BuyerMealMenuReducer.buyerAllDinnerMeals,
});

export default connect(
  mapStateToProps,
  {
    showAllMealsToBuyer,
    showAllBreakFastMealsToBuyer,
    showAllLunchMealsToBuyer,
    showAllDinnerMealsToBuyer,
  }
)(BuyerSearchMealScreen);

const styles = StyleSheet.create({
  barsButtonStyle: {
    position: "absolute",
    zIndex: 999,
    right: 20,
    top: 70,
    backgroundColor: WHITE_COLOR,
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
