import React, { Component } from "react";
import { StyleSheet, View, StatusBar, Alert } from "react-native";
import { Container, Content, Spinner } from "native-base";
import {
  WHITE_COLOR,
  SCREEN_BG_COLOR,
  Button_BG_COLOR
} from "../../../theme/color";
import CustomProfileView from "../../components/customComponents/customProfileView";
import CustomButton from "../../components/customComponents/customButton";
import CustomTextBox from "../../components/customComponents/customTextbox";
import CustomText from "../../components/customComponents/customText";
import ImagePicker from "react-native-image-crop-picker";
import MySellerClass from "../../businessLogic/MySeller";
import {
  addMenu,
  updateMenu
} from "../../store/actions/menuActions/menuActions";
import { connect } from "react-redux";
import { IMG_URL } from "../../../appStore/BASE_URL";

class AddMenuScreen extends Component {
  componentDidMount() {
    const data = this.props.navigation.getParam("data", "");
    if (data === "") {
    } else {
      const editData = JSON.parse(data);
      this.setState({
        editingMode: true,
        menuID: editData._id,
        menuName: editData.menuName,
        menuPrice: JSON.stringify(editData.price),
        imageURL: editData.menuImgURL[0],
        image: ""
      });
    }
  }
  state = {
    toggleMode: true,
    menuID: "",
    menuName: "",
    menuPrice: 0,
    imageURL: null,
    image: null,
    spinnerMove: false,
    menuAdded: false,
    showImage: false,
    menuUpdated: false
  };
  SelectImage = () => {
    this.setState({ showImage: false });
    ImagePicker.openPicker({
      width: 200,
      height: 100,
      cropping: false
    }).then(image => {
      let imgSource = {
        uri: image.path,
        type: image.mime,
        name: image.path.replace(/^.*[\\\/]/, "")
      };

      this.setState({ image: imgSource, showImage: true });
    });
  };
  toggle = () => {
    this.setState({ toggleMode: !this.state.toggleMode });
  };

  render() {
    if (this.state.menuAdded) {
      this.props.navigation.navigate("SellerMenuListScreen");
    }
    if (this.state.menuUpdated === true) {
      this.props.navigation.navigate("SellerMenuListScreen");
    }
    return (
      <Container style={styles.container}>
        <StatusBar backgroundColor={SCREEN_BG_COLOR} barStyle="light-content" />
        <Content>
          <CustomProfileView
            showImage={this.state.showImage}
            imageURL={this.state.imageURL}
            image={this.state.image}
            SelectImage={this.SelectImage}
            LunchLogo
            height={150}
            lowerHeight={100}
            imageViewHeight={80}
            width={280}
            borderRadius={10}
            marginTop={100}
            buttonText={"Upload Menu Picture"}
            showButton={this.state.toggleMode}
            onBackButtonPress={() => this.props.navigation.goBack()}
          />
          <View style={{ height: 15 }} />
          {this.state.toggleMode ? (
            <CustomTextBox
              value={this.state.menuName}
              width={"85%"}
              backgroundColor={WHITE_COLOR}
              placeholder={"Enter Menu Name"}
              keyboardType="default"
              onChangeText={text => this.setState({ menuName: text })}
            />
          ) : (
            <CustomText
              Title="Menu Name"
              description={this.state.menuName}
              iconName={"cutlery"}
            />
          )}
          {this.state.toggleMode ? (
            <CustomTextBox
              value={this.state.menuPrice}
              width={"85%"}
              backgroundColor={WHITE_COLOR}
              placeholder={"Enter Menu Price"}
              keyboardType="number-pad"
              onChangeText={text => this.setState({ menuPrice: text })}
            />
          ) : (
            <CustomText
              Title="Price"
              description={this.state.menuPrice}
              iconName={"money"}
            />
          )}
          <View style={{ height: 40 }} />
          {this.state.spinnerMove ? (
            <Spinner color={Button_BG_COLOR} />
          ) : this.state.editingMode ? (
            <CustomButton
              onPress={() => {
                this.props.updateMenu(
                  new MySellerClass().updateSellerMenu(
                    this.state.menuID,
                    this.state.menuName,
                    this.props.sellerId,
                    this.state.menuPrice
                  ),
                  this.state.image,
                  this
                );
              }}
              width="85%"
              text={"Update Menu"}
            />
          ) : (
            <CustomButton
              onPress={() => {
                this.props.addMenu(
                  new MySellerClass().addSellerMenu(
                    this.state.menuName,
                    this.props.sellerId,
                    this.state.menuPrice
                  ),
                  this.state.image,
                  this
                );
              }}
              width="85%"
              text={"Add Menu"}
            />
          )}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  sellerId: state.LoadUserReducer.userData._id
});

export default connect(mapStateToProps, { addMenu, updateMenu })(AddMenuScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE_COLOR
  }
});
