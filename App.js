import React, { Component } from "react";
import {
  StyleSheet,
  Modal,
  Dimensions,
  ImageBackground,
  Alert,
  FlatList,
  View,
  Text,
  StatusBar,
  ScrollView
} from "react-native";
import AppContainer from "./src/navigation/navigation";
import { connect } from "react-redux";
import NetInfo from "@react-native-community/netinfo";
const { width } = Dimensions.get("window");
import firebase, { Notification } from "react-native-firebase";
import AlertMsgComponent from "./src/customeComponents/alertMsgComponent";
import FirebaseToken from "./src/appStore/FirebaseToken";
import { Button_BG_COLOR } from "./src/theme/color";
let pushData = [
  {
    title: "First push",
    message: "First push message"
  },
  {
    title: "Second push",
    message: "Second push message"
  }
];
class App extends Component {
  constructor() {
    super();
    this.state = {
      isConnected: false,
      compHeight: 0,
      message: "",
      color: "",
      TOKEN: "",
      fcToken: "",
      url: "2"
    };
  }
  componentDidMount() {
    NetInfo.fetch().then(state => {
      if (state.isConnected === true) {
        if (state.isInternetReachable === true) {
          this.setState({
            compHeight: 0,
            message: "all o",
            color: "red",
            isConnected: false
          });
        } else {
          this.setState({
            message: "Limmited",
            compHeight: 30,
            color: "black"
          });
        }
      } else {
        this.setState({
          compHeight: 50,
          message: "Internet Not Connected",
          color: "red",
          isConnected: true
        });
      }
    });
    this.unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected === true) {
        if (state.isInternetReachable === true) {
          this.setState({
            compHeight: 0,
            message: "",
            color: "white",
            isConnected: false
          });
        } else {
          console.log("limited");
          this.setState({
            message: "Limmited",
            compHeight: 30,
            color: "black"
          });
        }
      } else {
        console.log("no internet");
        this.setState({
          compHeight: 50,
          message: "Internet Not Connected",
          color: "red",
          isConnected: true
        });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  _renderItem = ({ item }) => (
    <View key={item.title}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.message}>{item.message}</Text>
    </View>
  );

  handleConnectivityChange = isConnected => {
    console.log(isConnected);
    this.setState({ isConnected: isConnected });
  };
  render() {
    return (
      <React.Fragment>
        {this.state.isConnected === true ? (
          <ImageBackground
            style={{
              flex: 1,
              height: Dimensions.get("screen").height,
              width: Dimensions.get("screen").width
            }}
            resizeMode="stretch"
            source={require("../GoodBees/src/images/noInternet.jpeg")}
          />
        ) : (
          <React.Fragment>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.props.AlertModal}
            >
              <StatusBar
                backgroundColor={Button_BG_COLOR}
                barStyle="light-content"
              />
              <AlertMsgComponent
                AlertMsg={this.props.AlertMsg.msg}
                AlertTitle={this.props.AlertTitle}
                AlertColor={this.props.AlertColor}
                AlertIconName={this.props.AlertIconName}
              />
            </Modal>
            {/* <FirebaseToken /> */}
            <AppContainer />

            {/* <PushController /> */}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  AlertModal: state.AlertMsgReducer.successResponse,
  AlertMsg: state.AlertMsgReducer.responseData,
  AlertTitle: state.AlertMsgReducer.alertTitle,
  AlertColor: state.AlertMsgReducer.alertColor,
  AlertIconName: state.AlertMsgReducer.alertIconName
});

export default connect(
  mapStateToProps,
  null
)(App);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: { backgroundColor: "pink" },
  listHeader: {
    backgroundColor: "#eee",
    color: "#222",
    height: 44,
    padding: 12
  },
  title: { fontSize: 18, fontWeight: "bold", paddingTop: 10 },
  message: {
    fontSize: 14,
    paddingBottom: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  engine: { position: "absolute", right: 0 },
  body: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  sectionContainer: { marginTop: 32, paddingHorizontal: 24 },
  sectionTitle: { fontSize: 24, fontWeight: "600", color: "black" },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: "blue"
  },
  highlight: { fontWeight: "700" },
  footer: {
    color: "black",
    fontSize: 12,
    fontWeight: "600",
    padding: 4,
    paddingRight: 12,
    textAlign: "right"
  }
});
