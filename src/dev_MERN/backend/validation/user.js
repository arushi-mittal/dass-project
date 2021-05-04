const Validator = require("validator");
const isEmpty = require("is-empty");


// for recriuter registration
// const validateProfile = (data) => {
//     let errors = {
//     };

//     // convert empty fields to empty strings so we can use validator
//     data.name = !isEmpty(data.name) ? data.name : "";
//     data.username = !isEmpty(data.username) ? data.username : "";
//     data.email = !isEmpty(data.email) ? data.email : "";

//     // check name
//     if (Validator.isEmpty(data.name)) {
//         errors.name = "Please enter your name";
//     }


//     // check Email
//     if (Validator.isEmpty(data.email)) {
//         errors.email = "Please enter email";
//     } else if (!Validator.isEmail(data.email)) {
//         errors.email = "Invalid email address";
//     }

//     return {
//         errors,
//         isValid: isEmpty(errors)
//     };
// };

// for recriuter registration
const validateProfile = (data) => {
    // String.prototype.countWords = function () {
    //     return this.split(/\s+\b/).length;
    // }
    let errors = {};

    // convert empty fields to empty strings so we can use validator
    data.name = !isEmpty(data.name) ? data.name.toString() : "";
    data.username = !isEmpty(data.username) ? data.username.toString() : "";
    data.address = !isEmpty(data.address) ? data.address.toString() : "";
    data.email = !isEmpty(data.email) ? data.email.toString() : "";
    data.mobile_no = !isEmpty(data.mobile_no) ? data.mobile_no.toString() : "";

    // check name
    if (Validator.isEmpty(data.name)) {
        errors.name = "Please enter your name.";
    }

    // check username
    if (Validator.isEmpty(data.username)) {
        errors.username = "Username can not be blank.";
    }

    // // check address
    // if (Validator.isEmpty(data.address)) {
    //     errors.address = "Please enter address.";
    // }

    // check mobile_no
    if (Validator.isEmpty(data.mobile_no)) {
        errors.mobile_no = "Please enter Mobile No.";
    } else if (!Validator.isMobilePhone(data.mobile_no, "en-IN", { strictMode: true })) {
        errors.mobile_no = "Please provide your 10-digit Indian mobile num."
    }

    // check Email
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email can't be blank";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "That doesn't seem like a valid email address :(";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};


module.exports = {
    validateProfile
}