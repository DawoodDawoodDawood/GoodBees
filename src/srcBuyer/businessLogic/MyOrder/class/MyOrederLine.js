class MyOrderLine {
  constructor(orderLine) {
    this.foodType = orderLine.foodType;
    this.foodID = orderLine.foodID;
    this.buyerID = orderLine.buyerID;
    this.quantity = orderLine.quantity;
    this.unitPrice = orderLine.unitPrice;
  }
}
export default MyOrderLine;
