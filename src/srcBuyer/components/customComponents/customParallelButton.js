import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Button, Left, Right} from 'native-base';
import {
  Button_BG_COLOR,
  WHITE_COLOR,
  Textbox_BG_COLOR,
} from '../../../theme/color';

export default class CustomParallelButton extends Component {
  render() {
    return (
      <View
        style={{
          height: 60,
          flexDirection: 'row',
          width: '85%',
          alignSelf: 'center',
          marginTop: 20,
        }}>
        <Left>
          <Button
            style={[
              styles.buttonStyle1,
              {
                backgroundColor: this.props.buttonBgColor1
                  ? this.props.buttonBgColor1
                  : '#F5F5F5',
                borderColor: this.props.buttonBorderColor1
                  ? this.props.buttonBorderColor1
                  : Textbox_BG_COLOR,
              },
            ]}
            onPress={this.props.onPress1}>
            <Text style={{color: WHITE_COLOR}}> {this.props.Text1}</Text>
          </Button>
        </Left>
        <Right>
          <Button
            style={[
              styles.buttonStyle2,
              {
                backgroundColor: this.props.buttonBgColor2
                  ? this.props.buttonBgColor2
                  : '#F5F5F5',
                borderColor: this.props.buttonBorderColor2
                  ? this.props.buttonBorderColor2
                  : Textbox_BG_COLOR,
              },
            ]}
            onPress={this.props.onPress2}>
            <Text
              style={{
                color: this.props.buttonTextColor
                  ? this.props.buttonTextColor
                  : Textbox_BG_COLOR,
              }}>
              {this.props.Text2}
            </Text>
          </Button>
        </Right>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle2: {
    borderWidth: 3,
    width: 130,
    borderRadius: 5,
    justifyContent: 'center',
  },
  buttonStyle1: {
    backgroundColor: '#F5F5F5',
    borderColor: Textbox_BG_COLOR,
    borderWidth: 3,
    width: 130,
    borderRadius: 5,
    justifyContent: 'center',
  },
});
