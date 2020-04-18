import MyFoodType from "./classes/MyFoodType";
import MyFoodFor from "./classes/MyFoodFor";
import MyFoodCategory from "./classes/MyFoodCategory";
import MyLocation from "./classes/MyLocation";

class MyAuth {
  constructor() {
    this.buyerName = "";
    this.email = "";
    this.password = "";
    this.phone = "";
    this.postalcode = "";
    this.foodType = {};
    this.foodFor = {};
    this.foodCategory = {};
    this.alergicDetails = "";
    this.address = "";
    this.age = "";
    this.location = {};
  }

  setLogin(email, password) {
    this.email = email;
    this.password = password;
    return this;
  }

  setSignupCredentials(name, email, password, phone) {
    this.buyerName = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    return this;
  }

  setSignupProfile(
    name,
    email,
    password,
    phone,
    postalCode,
    foodType,
    foodFor,
    foodCategory,
    alergicDetails,
    address,
    age,
    location
  ) {
    this.buyerName = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.postalcode = postalCode;
    this.foodType = new MyFoodType(foodType);
    this.foodFor = new MyFoodFor(foodFor);
    this.foodCategory = new MyFoodCategory(foodCategory);
    this.alergicDetails = alergicDetails;
    this.address = address;
    this.age = age;
    this.location = new MyLocation(location);
    return this;
  }
  setUpdateProfile(
    _id,
    name,

    postalCode,
    foodType,
    foodFor,
    foodCategory,
    alergicDetails,
    address,
    age,
    location
  ) {
    this._id = _id;
    this.buyerName = name;

    this.postalCode = postalCode;

    this.foodType = new MyFoodType(foodType);
    this.foodFor = new MyFoodFor(foodFor);
    this.foodCategory = new MyFoodCategory(foodCategory);
    this.alergicDetails = alergicDetails;
    this.address = address;
    this.age = age;
    this.location = new MyLocation(location);
    return this;
  }
}

export default MyAuth;
