import React, { Component } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import { Text, Button, Icon } from "native-base";
import {
  SCREEN_BG_COLOR,
  WHITE_COLOR,
  Button_BG_COLOR,
} from "../../../theme/color";
import { EXTRA_SMALL } from "../../../theme/font";
import { IMG_URL } from "../../../appStore/BASE_URL";

export default class CustomProfileView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.backViewStyle}>
          <View style={styles.buttonsStyle}>
            {this.props.showMenuButton ? (
              <Button transparent>
                <Icon name="menu" style={{ color: WHITE_COLOR }} />
              </Button>
            ) : (
              <Button iconLeft transparent onPress={this.props.onPressBack}>
                <Icon name="arrow-back" style={{ color: WHITE_COLOR }} />
                <Text style={{ color: WHITE_COLOR }}>Back</Text>
              </Button>
            )}
          </View>
          <View style={[styles.buttonsStyle, { alignItems: "flex-end" }]}>
            {this.props.showRightSideButton ? (
              <Button
                rounded
                style={{
                  height: 30,
                  alignSelf: "center",
                  backgroundColor: this.props.buttonBgColor
                    ? this.props.buttonBgColor
                    : Button_BG_COLOR,
                  marginLeft: "22%",
                }}
              >
                <Text style={{ color: WHITE_COLOR, fontSize: EXTRA_SMALL }}>
                  {this.props.buttonText}
                </Text>
              </Button>
            ) : (
              false
            )}
          </View>
        </View>
        <View
          style={[
            styles.imageViewStyle,
            {
              height: this.props.imageViewHeight
                ? this.props.imageViewHeight
                : 40,
            },
          ]}
        >
          <Image
            resizeMode="stretch"
            style={{
              height: this.props.height ? this.props.height : 100,
              width: this.props.width ? this.props.width : 100,
              borderRadius: this.props.borderRadius
                ? this.props.borderRadius
                : 200,
              zIndex: 999,
              alignSelf: "center",
              marginTop: this.props.marginTop ? this.props.marginTop : 40,
            }}
            source={
              this.props.showImage
                ? this.props.image
                : this.props.imageURL
                ? { uri: IMG_URL + this.props.imageURL }
                : this.props.LunchLogo
                ? require("../../../images/LunchLogo.png")
                : require("../../../images/profile.png")
            }
          />
        </View>
        <View
          style={{
            height: this.props.lowerHeight ? this.props.lowerHeight : 60,
          }}
        />
        {this.props.showButton ? (
          <View style={styles.buttonViewStyle}>
            <Button onPress={this.props.SelectImage} style={styles.buttonStyle}>
              <Text style={{ color: WHITE_COLOR }}>
                {this.props.buttonText}
              </Text>
            </Button>
          </View>
        ) : (
          false
        )}
        {this.props.showCumulative ? (
          <View
            style={{
              height: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#f8cd5a" }}>
              Cumulative Points: {this.props.patnerPoints}
            </Text>
          </View>
        ) : (
          false
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE_COLOR,
  },
  backViewStyle: {
    height: 80,
    flexDirection: "row",
    backgroundColor: Button_BG_COLOR,
  },
  buttonsStyle: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  imageViewStyle: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Button_BG_COLOR,
  },
  logoStyle: {},
  buttonViewStyle: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    height: 35,
    alignSelf: "center",
    borderRadius: 3,
    backgroundColor: Button_BG_COLOR,
  },
});
