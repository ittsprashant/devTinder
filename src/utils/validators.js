const validator = require("validator");

const checkSignUpValidity = (obj) => {

    const {firstName, lastName, email, password, gender} = obj;

    if(!firstName || !lastName || !email || !password){
        throw new Error("Mandatory fields missing");
    }
    else if(!validator.isEmail(email)){
        throw new Error("Please enter valid email");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password");
    }

}

module.exports = {
    checkSignUpValidity
}