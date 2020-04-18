import React, {Component} from 'react';
import {Button, Text} from 'native-base';
import {Button_BG_COLOR} from '../../../theme/color';
export default class CustomButton extends Component {
  render() {
    return (
      <Button
        onPress={this.props.onPress}
        block
        style={{
          width: this.props.width ? this.props.width : '80%',
          height: this.props.height ? this.props.height : 45,
          alignSelf: 'center',
          borderRadius: 5,
          backgroundColor: this.props.backgroundColor
            ? this.props.backgroundColor
            : Button_BG_COLOR,
        }}>
        <Text> {this.props.text} </Text>
      </Button>
    );
  }
}
