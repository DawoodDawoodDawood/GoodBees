import MyLocation from "./MyLocation";

class MyAuth {
  constructor() {
    this._id = "";
    this.partnerName = "";
    this.email = "";
    this.password = "";

    this.phone = "";
    this.postalCode = "";
    this.address = "";
    this.location = {};
  }

  setLogin(email, password) {
    this.email = email;
    this.password = password;
    return this;
  }

  setSignupCredentials(name, email, password, phone) {
    this.partnerName = name;
    this.email = email;
    this.password = password;

    this.phone = phone;
    return this;
  }
  setUpdateProfile(_id, name, phone, postalCode, address, location) {
    this._id = _id;
    this.partnerName = name;
    this.phone = phone;
    this.postalCode = postalCode;
    this.address = address;
    this.location = new MyLocation(location);
    return this;
  }
  setSignupProfile(
    name,
    email,
    password,
    phone,
    postalCode,
    address,
    location
  ) {
    this.partnerName = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.postalCode = postalCode;
    this.address = address;
    this.location = new MyLocation(location);
    return this;
  }
}

export default MyAuth;
