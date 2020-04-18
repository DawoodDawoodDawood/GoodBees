import React, { Component } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { Text, Container, Content, Spinner } from "native-base";
import { WHITE_COLOR, Button_BG_COLOR } from "../../../theme/color";
import CustomHeader from "../../components/customComponents/customHeader";
import MenuComponent from "../../components/customComponents/menuComponent";
import { LARGE } from "../../../theme/font";
import { connect } from "react-redux";
import { showMenu } from "../../store/actions/menuActions/menuActions";

class MenuListScreen extends Component {
  state = { spinnerMove: false, menuLoaded: false };

  componentDidMount() {
    this.props.showMenu(this.props.sellerId, this);
  }
  render() {
    return (
      <Container style={styles.container}>
        <CustomHeader
          headerText={"Menu List"}
          buttonText={"Add Menu"}
          showHeaderButton
          onPressMenu={() => this.props.navigation.toggleDrawer()}
          onPressRightButton={() =>
            this.props.navigation.navigate("SellerAddMenuScreen")
          }
        />
        <StatusBar backgroundColor={Button_BG_COLOR} barStyle="light-content" />
        {/* <View style={styles.pageTitleViewStyle}>
          <Text style={{ color: Button_BG_COLOR, fontSize: LARGE }}>
            Menu List
          </Text>
        </View> */}
        <Content>
          {this.state.spinnerMove ? (
            <Spinner color={Button_BG_COLOR} />
          ) : (
            this.props.addedMenuList.map((list, index) => (
              <MenuComponent
                key={index}
                menuList={list}
                navigation={this.props.navigation}
              />
            ))
          )}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  sellerId: state.LoadUserReducer.userData._id,
  addedMenuList: state.SellerAddMenuReducer.AddedMenuList
});

export default connect(mapStateToProps, { showMenu })(MenuListScreen);

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
