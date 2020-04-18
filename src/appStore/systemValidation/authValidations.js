class AuthValidations {
  constructor() {}

  //EmailValidation
  emailValidation(email) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email)) {
      return true;
    } else {
      return false;
    }
  }

  //PasswordValidation
  passwordValidation(password) {
    if (password.length >= 8) {
      return true;
    } else {
      return false;
    }
  }

  //NameValidation
  nameValidation(name) {
    if (name == '') {
      return false;
    } else {
      return true;
    }
  }

  //PhoneValidation
  phoneValidation(phoneNo) {
    if (phoneNo.length >= 11) {
      return true;
    } else {
      return false;
    }
  }

  //CodeValidation
  codeValidation(code) {
    if (code.length == 6) {
      return true;
    } else {
      return false;
    }
  }
}
export default AuthValidations;
