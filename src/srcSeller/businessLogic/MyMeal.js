class MyMeal {
  constructor() {
    this._id = "";
    this.mealName = "";
    this.mealDescription = "";
    this.contactName = "";
    this.contactNumber = "";
    this.sellerID = "";
    this.quantity = "";
    this.voucherCode = "";
    this.mealType = "";
    this.foodType = "";
    this.foodCategory = "";

    this.price = "";
    this.pickupStartTime = "";
    this.pickupEndTime = "";
    this.availabilityDate = "";
  }

  setSellerAddMeal(
    mealName,
    mealDescription,
    contactName,
    contactNumber,
    sellerID,
    quantity,
    voucherCode,
    mealType,
    foodType,
    foodCategory,

    price,
    pickupStartTime,
    pickupEndTime,
    availabilityDate
  ) {
    this.mealName = mealName;
    this.mealDescription = mealDescription;
    this.contactName = contactName;
    this.contactNumber = contactNumber;
    this.sellerID = sellerID;
    this.quantity = quantity;
    this.voucherCode = voucherCode;
    this.mealType = mealType;
    this.foodType = foodType;
    this.foodCategory = foodCategory;
    this.availabilityDate = availabilityDate;

    this.price = price;
    this.pickupStartTime = pickupStartTime;
    this.pickupEndTime = pickupEndTime;
    return this;
  }

  setSellerUpdateMeal(
    _id,
    mealName,
    mealDescription,
    contactName,
    contactNumber,
    sellerID,
    quantity,
    voucherCode,
    mealType,
    foodType,
    foodCategory,

    price,
    pickupStartTime,
    pickupEndTime,
    availabilityDate
  ) {
    this._id = _id;
    this.mealName = mealName;
    this.mealDescription = mealDescription;
    this.contactName = contactName;
    this.contactNumber = contactNumber;
    this.sellerID = sellerID;
    this.quantity = quantity;
    this.voucherCode = voucherCode;
    this.mealType = mealType;
    this.foodType = foodType;
    this.foodCategory = foodCategory;
    this.price = price;
    this.pickupStartTime = pickupStartTime;
    this.pickupEndTime = pickupEndTime;
    this.availabilityDate = availabilityDate;
    return this;
  }
}

export default MyMeal;
