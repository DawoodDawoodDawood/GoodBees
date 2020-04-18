import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Icon} from 'native-base';
import {WHITE_COLOR, SCREEN_BG_COLOR} from '../../theme/color';
import {SMALL} from '../../theme/font';
export default class InterestComponent extends Component {
  render() {
    return (
      <React.Fragment style={styles.container}>
        <View style={{height: 10}} />
        <View style={styles.mainBoxStyle}>
          {/* firstLine */}
          <View style={styles.boxInnerViewStyle}>
            <View style={styles.firstViewStyle}>
              <View style={styles.dotStyle} />
            </View>
            <View style={styles.secondViewStyle}>
              <Text style={{fontSize: SMALL}}>Chicken Quorma</Text>
            </View>
          </View>

          {/* secondLine */}
          <View style={[styles.boxInnerViewStyle, {flex: 1.3}]}>
            <View style={styles.firstViewStyle}>
              <Icon
                name="file-text"
                type="FontAwesome"
                style={{color: 'grey', fontSize: 20}}
              />
            </View>
            <View style={styles.secondViewStyle}>
              <Text style={{fontSize: SMALL}}>
                Chicken korma recipe is a delicious gravy dish that is usually
                made of spices, nuts,yogurt, seeds, coconut, vegetables and meat
              </Text>
            </View>
          </View>
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  mainBoxStyle: {
    height: 100,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    borderColor: '#E4E4E4',
    borderWidth: 1,
    backgroundColor: WHITE_COLOR,
  },
  boxInnerViewStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  firstViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondViewStyle: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  dotStyle: {
    height: 20,
    width: 20,
    borderRadius: 100,
    backgroundColor: 'green',
  },
});
