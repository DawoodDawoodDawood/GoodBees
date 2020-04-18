import React, {Component} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {Button_BG_COLOR} from '../../theme/color';

export default class ProductDetailComponent extends Component {
  render() {
    return (
      <View style={styles.mainViewStyle}>
        <View style={styles.gadgetImageViewStyle}>
          <Image
            resizeMode={'stretch'}
            source={this.props.mealImage}
            style={styles.gadgetImageStyle}
          />
          <View style={{height: 6}}></View>
          <View style={styles.textsViewStyle}>
            <Text style={{fontSize: 14}}>
              {this.props.LeftGadgetName
                ? this.props.LeftGadgetName
                : 'Meal Number 1'}
            </Text>
            <View style={{height: 6}}></View>
            <Text style={{color: Button_BG_COLOR, fontSize: 13}}>
              {this.props.LeftGadgetPrice ? this.props.LeftGadgetPrice : '120$'}
            </Text>
          </View>
        </View>
        <View style={{width: 10}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainViewStyle: {
    height: 100,
    flexDirection: 'row',
  },
  gadgetImageViewStyle: {
    flex: 1,
    alignItems: 'center',
  },
  gadgetImageStyle: {
    alignSelf: 'flex-start',
    height: 100,
    width: 150,
    borderRadius: 10,
  },
  textsViewStyle: {
    height: 90,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
