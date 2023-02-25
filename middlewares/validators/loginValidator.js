const { check } = require('express-validator');
const { validateResult } = require('./validateHelper');

const validateLogin = [
    check(email)
    .exists()
    .not()
    .isEmail()
    .isEmpty(),
    check(password)
    .exists()
    .not()
    .isEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = validateLogin;