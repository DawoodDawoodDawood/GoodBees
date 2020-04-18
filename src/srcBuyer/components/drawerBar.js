import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text, Icon} from 'native-base';

import {SCREEN_BG_COLOR, Button_BG_COLOR} from '../../theme/color';

export default class DrawerComponent extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.mainViewStyle}>
        <View style={styles.iconStyle1}>
          <Icon
            style={{color: Button_BG_COLOR, fontSize: 22}}
            name={this.props.iconName ? this.props.iconName : ''}
            type="FontAwesome"
          />
        </View>

        <View style={styles.textViewStyle}>
          <Text>{this.props.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  upperMainViewStyle: {
    height: 150,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  viewStyle: {
    flex: 1,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  mainViewStyle: {
    height: 60,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  iconStyle1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  textViewStyle: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
