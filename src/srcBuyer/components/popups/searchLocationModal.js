import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Alert,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Container, Content, Icon, Button, Right, Left, Text} from 'native-base';
import {LARGE, MEDIUM} from '../../../theme/font';
import {WHITE_COLOR, SCREEN_BG_COLOR} from '../../../theme/color';
import BLD_MealComponent from '../BLD_MealComponent';
export default class SearchLocationModal extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 1, backgroundColor: 'gray', opacity: 0.1}} />
        <View style={styles.mainViewStyle}>
          <View style={styles.viewStyle1}>
            <View style={styles.viewStyle2}>
              <Text style={{fontSize: LARGE, paddingLeft: 5}}>
                Selected Location
              </Text>
            </View>

            <View style={[styles.viewStyle2, {alignItems: 'flex-end'}]}>
              <TouchableOpacity onPress={this.props.setModalVisible}>
                <Icon
                  name="chevron-circle-down"
                  type="FontAwesome"
                  style={styles.arrowDownIconStyle}
                />
              </TouchableOpacity>
            </View>
          </View>

          <BLD_MealComponent
            buttonText={'Breakfast'}
            secondButton
            secondButtonText={'Add to Cart'}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  mainViewStyle: {
    height: 250,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 15,
    backgroundColor: WHITE_COLOR,
  },
  viewStyle1: {
    height: 60,
    flexDirection: 'row',
  },
  viewStyle2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  arrowDownViewStyle: {
    height: 50,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  arrowDownIconStyle: {color: SCREEN_BG_COLOR, marginRight: 20, fontSize: 30},
});
