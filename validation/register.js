const validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : ""
    data.email = !isEmpty(data.email) ? data.email : ""
    data.password = !isEmpty(data.password) ? data.password : ""
    data.password_confirm = !isEmpty(data.password_confirm) ? data.password_confirm : ""

    if (validator.isEmpty(data.name))
        errors.name = "Name field is required"
    if (!validator.isEmail(data.email))
        errors.email = "Email is invalid"
    if (validator.isEmpty(data.email))
        errors.email = "Email field is required"
    if (validator.isEmpty(data.password))
        errors.password = "Password field is required"
    if (!validator.equals(data.password, data.password_confirm))
        errors.password_confirm = "Confirm password"
    return {
        errors,
        isValid: isEmpty(errors)
    }
}