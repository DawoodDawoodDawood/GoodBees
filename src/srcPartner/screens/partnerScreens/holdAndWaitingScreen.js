import React, { Component } from "react";
import { StyleSheet, StatusBar, FlatList } from "react-native";
import {
  Container,
  Tab,
  Tabs,
  TabHeading,
  Spinner,
  Content
} from "native-base";
import { WHITE_COLOR, Button_BG_COLOR } from "../../../theme/color";
import CustomHeader from "../../../srcSeller/components/customComponents/customHeader";
import { listOfIntrestedBuyers } from "../../store/actions/BroadCastActions/broadCastActions";
import CustomMealComponent from "../../components/customComponents/intrestedBuyerComponent";
import { connect } from "react-redux";
class HoldAndWaitingScreen extends Component {
  componentDidMount() {
    this.props.listOfIntrestedBuyers(this.props.patnerID._id, this);
  }
  state = { spinnerMove: false };
  render() {
    console.log(this.props.IntrestedBuyers);
    return (
      <Container style={styles.container}>
        <CustomHeader
          headerText={"Hold and Waiting"}
          onPressMenu={() => this.props.navigation.toggleDrawer()}
        />
        <StatusBar backgroundColor={Button_BG_COLOR} barStyle="light-content" />
        <Content>
          {this.state.spinnerMove ? (
            <Spinner />
          ) : (
            this.props.IntrestedBuyers.map(item => (
              <CustomMealComponent
                broadCastID={item._id}
                IntrestedBuyers={item.interstedBuyers}
                menus={item.menu}
              />
            ))
          )}
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  patnerID: state.LoadUserReducer.userData,
  IntrestedBuyers: state.BroadCastFromPatnerToBuyer.intrestedBuyerList
});
export default connect(
  mapStateToProps,
  { listOfIntrestedBuyers }
)(HoldAndWaitingScreen);

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
