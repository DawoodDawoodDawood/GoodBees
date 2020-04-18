class Validation {
  constructor() {}
  emailValidate(email) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email)) {
      return true;
    }
    if (reg.test(email)) {
      return false;
    }
  }
}
export default Validation;
