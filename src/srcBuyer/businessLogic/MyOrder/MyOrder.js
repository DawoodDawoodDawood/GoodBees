import MyDeliveryDetail from "./class/deliveryDetails";
class MyOrder {
  constructor() {
    this.buyerCartID = "";
    this.buyerID = "";
    this.sellerID = "";
    this.totalPrice = "";
    this.deliveryCharges = "";
    this.delivery = false;
    this.selfPickUp = false;
    this.deliveryDetails = {};
    this.timeOfDelivery = "";
    this.orderLine = [];
  }

  setOrder(
    buyerCartID,
    buyerID,
    sellerID,
    totalPrice,
    deliveryCharges,

    delivery,
    selfPickUp,
    deliveryDetails,
    timeOfDelivery,

    orderLine
  ) {
    this.buyerCartID = buyerCartID;
    this.buyerID = buyerID;
    this.sellerID = sellerID;
    this.totalPrice = totalPrice;
    this.deliveryCharges = deliveryCharges;

    this.delivery = delivery;
    this.selfPickUp = selfPickUp;
    this.deliveryDetails = new MyDeliveryDetail(deliveryDetails);
    this.timeOfDelivery = timeOfDelivery;
    this.orderLine = orderLine;
    return this;
  }
}

export default MyOrder;
