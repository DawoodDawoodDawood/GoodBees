import MyFoodType from "./classes/MyFoodType";
import MyFoodFor from "./classes/MyFoodFor";
import MyFoodCategory from "./classes/MyFoodCategory";
import MyLocation from "./classes/MyLocation";
class MyAuth {
  constructor() {
    this.sellerTypeID = "";
    this._id = "";
    this.sellerName = "";
    this.email = "";
    this.password = "";
    this.phone = "";
    this.postalCode = "";
    this.foodType = {};
    this.foodFor = {};
    this.foodCategory = {};

    this.address = "";
    this.location = {};
    this.delivery = false;
    this.selfPickUp = false;
  }

  setLogin(email, password) {
    this.email = email;
    this.password = password;
    return this;
  }

  setSignupCredentials(sellerTypeID, name, email, password, phone) {
    this.sellerTypeID = sellerTypeID;
    this.sellerName = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    return this;
  }

  setSignupProfile(
    sellerTypeID,
    name,
    email,
    password,
    phone,
    postalCode,
    foodType,
    foodFor,
    foodCategory,
    address,
    location,
    delivery,
    selfPickUp
  ) {
    this.sellerTypeID = sellerTypeID;
    this.sellerName = name;
    this.email = email;
    this.password = password;

    this.phone = phone;
    this.postalCode = postalCode;
    this.foodType = new MyFoodType(foodType);
    this.foodFor = new MyFoodFor(foodFor);
    this.foodCategory = new MyFoodCategory(foodCategory);
    this.address = address;
    this.location = new MyLocation(location);
    this.delivery = delivery;
    this.selfPickUp = selfPickUp;
    return this;
  }
  setUpdateProfile(
    _id,
    name,
    email,
    phone,
    sellerTypeID,
    postalCode,
    foodType,
    foodFor,
    foodCategory,
    address,
    location,
    delivery,
    selfPickUp
  ) {
    this._id = _id;
    this.sellerName = name;
    this.email = email;

    this.phone = phone;
    this.sellerTypeID = sellerTypeID;
    this.postalCode = postalCode;
    this.foodType = new MyFoodType(foodType);
    this.foodFor = new MyFoodFor(foodFor);
    this.foodCategory = new MyFoodCategory(foodCategory);
    this.address = address;
    this.location = new MyLocation(location);
    this.delivery = delivery;
    this.selfPickUp = selfPickUp;
    return this;
  }
}

export default MyAuth;
