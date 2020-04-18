import React, {Component} from 'react';
import {View} from 'react-native';
import {Item, Input, Text} from 'native-base';
import {MEDIUM} from '../../../theme/font';
class CustomTextInput extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <View style={{paddingLeft: 20, width: '90%'}}>
          <Text style={{color: '#707070', fontSize: 13}}>
            {this.props.FeildTitle}
          </Text>
        </View>
        <View style={{height: 5}}></View>
        <Item
          style={{
            width: '90%',
            alignSelf: 'center',
            height: this.props.Inputheight ? this.props.Inputheight : 30,
          }}>
          <Input
            disabled={this.props.disabled ? this.props.disabled : false}
            // value={this.props.value ? this.props.value : ""}
            secureTextEntry={
              this.props.secureTextEntry ? this.props.secureTextEntry : false
            }
            onChangeText={
              this.props.onChangeText ? this.props.onChangeText : false
            }
            placeholder={
              this.props.placeholder ? this.props.placeholder : 'Enter'
            }
            defaultValue={
              this.props.defaultValue ? this.props.defaultValue : ''
            }
            style={{fontSize: MEDIUM}}
            placeholderTextColor="#979797"
          />
        </Item>
      </React.Fragment>
    );
  }
}

export default CustomTextInput;
