import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Footer, Button, FooterTab, Left, Right} from 'native-base';
import {GREEN, WHITE_COLOR} from '../../../theme/color';

export default class CustomFooter extends Component {
  render() {
    return (
      <Footer>
        <FooterTab style={{backgroundColor: WHITE_COLOR}}>
          <Left style={{paddingLeft: '2.5%'}}>
            {this.props.showIcon ? (
              <Button style={styles.buttonStyle1} onPress={this.props.onPress1}>
                <Text style={{color: 'black'}}> {this.props.Text1}</Text>
              </Button>
            ) : (
              false
            )}
          </Left>
          <Right>
            <Button style={styles.buttonStyle2} onPress={this.props.onPress2}>
              <Text style={{color: WHITE_COLOR}}> {this.props.Text2} </Text>
            </Button>
          </Right>
        </FooterTab>
      </Footer>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle2: {
    marginRight: '11%',
    backgroundColor: GREEN,
    width: 130,
    justifyContent: 'center',
  },
  buttonStyle1: {
    marginLeft: '5%',
    backgroundColor: WHITE_COLOR,
    borderColor: GREEN,
    borderWidth: 1,
    width: 130,
    justifyContent: 'center',
  },
});
