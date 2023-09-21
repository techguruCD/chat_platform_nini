const validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateChatInput(data) {
    let errors = {};
    data.content = !isEmpty(data.content) ? data.content : ""
    data.sender = !isEmpty(data.sender) ? data.sender : ""
    data.receiver = !isEmpty(data.receiver) ? data.receiver : ""
    data.type = !isEmpty(data.type) ? data.type: 0

    if (data.type == 0 && validator.isEmpty(data.content))
        errors.content = "Type your message"
    return {
        errors,
        isValid: isEmpty(errors)
    }
}