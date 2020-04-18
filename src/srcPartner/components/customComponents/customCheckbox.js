import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, CheckBox} from 'native-base';
import {EXTRA_SMALL, SMALL} from '../../../theme/font';
import {Button_BG_COLOR} from '../../../theme/color';

export default class CustomCheckbox extends Component {
  state = {check: false};

  toggleCheckBox = () => {
    this.setState({check: !this.state.check});
  };
  render() {
    return (
      <React.Fragment>
        {/* checkbox */}
        <View style={styles.textViewStyle}>
          <Text>{this.props.text}</Text>
        </View>
        <View style={styles.mainCheckBoxViewStyle}>
          <View style={styles.checkBoxViewStyle}>
            <View style={styles.checkBoxTextViewStyle}>
              <Text style={{color: 'grey', fontSize: SMALL}}>
                {this.props.firstText}
              </Text>
            </View>
            <View style={styles.checkBoxInnerViewStyle}>
              <CheckBox
                color={Button_BG_COLOR}
                checked={this.state.check}
                onPress={() => this.toggleCheckBox()}
                style={{height: 19, width: 19}}
              />
            </View>
          </View>
          <View style={styles.checkBoxViewStyle}>
            <View style={styles.checkBoxTextViewStyle}>
              <Text style={{color: 'grey', fontSize: SMALL}}>
                {this.props.secondText}
              </Text>
            </View>
            <View style={styles.checkBoxInnerViewStyle}>
              <CheckBox
                color={Button_BG_COLOR}
                checked={this.state.check}
                onPress={() => this.toggleCheckBox()}
                style={{height: 19, width: 19}}
              />
            </View>
          </View>

          {this.props.showThird ? (
            <View style={styles.checkBoxViewStyle}>
              <View style={styles.checkBoxTextViewStyle}>
                <Text style={{color: 'grey', fontSize: SMALL}}>
                  {this.props.thirdText}
                </Text>
              </View>
              <View style={styles.checkBoxInnerViewStyle}>
                <CheckBox
                  color={Button_BG_COLOR}
                  checked={this.state.check}
                  onPress={() => this.toggleCheckBox()}
                  style={{height: 19, width: 19}}
                />
              </View>
            </View>
          ) : (
            <View style={{flex: 1}} />
          )}
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  textViewStyle: {
    height: 40,
    width: '85%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  mainCheckBoxViewStyle: {
    height: 40,
    width: '85%',
    flexDirection: 'row',
    alignSelf: 'center',
  },

  checkBoxViewStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBoxStyle: {
    backgroundColor: '#F6F6F6',
    height: 20,
    width: 20,
    borderColor: 'red',
    borderWidth: 1,
  },
  checkBoxInnerViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  checkBoxTextViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
