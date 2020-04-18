class MySeller {
  constructor() {
    this._id = '';
    this.menuName = '';
    this.sellerID = '';
    this.price = '';
  }

  addSellerMenu(menuName, sellerID, menuPrice) {
    this.menuName = menuName;
    this.sellerID = sellerID;
    this.price = menuPrice;
    return this;
  }
  updateSellerMenu(menuID, menuName, sellerID, menuPrice) {
    this._id = menuID;
    this.menuName = menuName;
    this.sellerID = sellerID;
    this.price = menuPrice;
    return this;
  }
}

export default MySeller;
