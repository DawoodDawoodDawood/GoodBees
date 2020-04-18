import React, {Component} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {LARGE} from '../../../theme/font';
import CustomParallelButton from '../customComponents/customParallelButton';
import {GREEN, WHITE_COLOR} from '../../../theme/color';
export default class ItemAddToCartPopup extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            height: 200,
            width: '90%',
            alignSelf: 'center',
            borderRadius: 10,
          }}>
          <View
            style={{
              flex: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../images/image1.png')}
              style={{height: '95%', width: '36%'}}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: LARGE}}>Item Added to Cart</Text>
          </View>
          <View style={{flex: 1.5}}>
            <CustomParallelButton
              marginTop={1}
              firstButtonBgColor={GREEN}
              firstButtonTextColor={GREEN}
              Text1={'View Cart'}
              buttonBgColor={GREEN}
              buttonBorderColor={GREEN}
              buttonTextColor={WHITE_COLOR}
              Text2={'Close'}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
