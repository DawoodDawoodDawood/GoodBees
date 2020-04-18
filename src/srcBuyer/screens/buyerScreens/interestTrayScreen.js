import React, { Component } from "react";
import { StyleSheet, StatusBar, FlatList, View, Text } from "react-native";
import { Container, Content, Spinner } from "native-base";
import { WHITE_COLOR, Button_BG_COLOR } from "../../../theme/color";
import CustomHeader from "../../components/customComponents/customHeader";
import InterestComponent from "../../components/intrestedMealListComponent";
import { connect } from "react-redux";

import { boardCastListOfMenus } from "../../store/actions/BroadCast/broadCastActions";
class InterestTrayScreen extends Component {
  state = { spinnerMove: false, noMenu: false };
  componentDidMount() {
    this.props.boardCastListOfMenus(this.props.userData._id, this);
  }
  render() {
    return (
      <Container style={styles.container}>
        <CustomHeader
          onPressMenu={() => this.props.navigation.toggleDrawer()}
          headerText={"Interest Tray"}
        />
        <StatusBar backgroundColor={Button_BG_COLOR} barStyle="light-content" />
        <Content>
          {this.state.spinnerMove ? (
            <Spinner color={Button_BG_COLOR} />
          ) : this.state.noMenu ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                height: "100%"
              }}
            >
              <Text
                style={{
                  color: Button_BG_COLOR,
                  fontWeight: "bold",
                  fontSize: 18
                }}
              >
                No BroadCast Meal Available
              </Text>
            </View>
          ) : (
            <FlatList
              data={this.props.listOfMenu}
              renderItem={({ item }) => (
                <InterestComponent broadCastID={item._id} menus={item.menu} />
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
  userData: state.LoadUserReducer.userData,
  listOfMenu: state.BuyerBroadCastReducer.listOFBroadCastMenus
});

export default connect(
  mapStateToProps,
  {
    boardCastListOfMenus
  }
)(InterestTrayScreen);
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
