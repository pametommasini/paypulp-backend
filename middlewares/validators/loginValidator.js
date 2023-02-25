const { check } = require('express-validator');
const { validateResult } = require('./validateHelper');

const validateLogin = [
    check("email")
    .exists()
    .withMessage("Email param doesn't exist!")
    .isEmail()
    .withMessage("Incorrect email format!")
    .notEmpty()
    .withMessage("Email param is empty!"),
    check("password")
    .exists()
    .withMessage("Password param doesn't exist!")
    .notEmpty()
    .withMessage("Password param is empty!"),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateLogin };