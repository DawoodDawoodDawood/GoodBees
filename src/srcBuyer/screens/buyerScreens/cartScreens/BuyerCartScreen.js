import React, { Component } from "react";
import { StatusBar } from "react-native";
import CartComponent from "../../../components/cartComponent";
import CustomHeader from "../../../components/customComponents/customHeader";
import { Content, Container } from "native-base";
import { Button_BG_COLOR } from "../../../../theme/color";
import { connect } from "react-redux";
import { showCartDetail } from "../../../store/actions/cartAction/cartAction";

class StepThreeScreen extends Component {
  componentDidMount() {
    this.props.showCartDetail(this.props.buyerId, this);
  }

  render() {
    return (
      <Container style={{ flex: 1 }}>
        <CustomHeader
          onPressMenu={() => this.props.navigation.toggleDrawer()}
          headerText={"Cart"}
        />
        <StatusBar backgroundColor={Button_BG_COLOR} barStyle="light-content" />
        <Content>
          {this.props.addedCartDetail.map((cartData, index) => (
            <CartComponent
              key={index}
              index={index}
              cartData={cartData}
              navigation={this.props.navigation}
            />
          ))}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  buyerId: state.LoadUserReducer.userData._id,
  addedCartDetail: state.BuyerCartReducer.buyerAddedCart,
});

export default connect(mapStateToProps, {
  showCartDetail,
})(StepThreeScreen);
