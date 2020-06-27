const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Entered email is invalid"
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password is reqiured';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

};