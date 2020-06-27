const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if(Validator.isEmpty(data.name)) {
        errors.name = 'Name is a required field';
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Entered email is invalid"
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password is reqiured';
    }

    if(Validator.isEmpty(data.password2)) {
        errors.password2 = 'Password confirmation is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

};