const { check } = require('express-validator');
const { validateResult } = require('./validateHelper');

const validateSignup = [
    check(email)
    .exists()
    .not()
    .isEmail()
    .isEmpty(),
    check(password)
    .exists()
    .not()
    .isEmpty(),
    check(accountType)
    .exists()
    .not()
    .isEmpty(),
    check(firstName)
    .exists()
    .not()
    .isEmpty(),
    check(lastName)
    .exists()
    .not()
    .isEmpty(),
    check(phone)
    .exists()
    .not()
    .isEmpty(),
    check(birthDate)
    .exists()
    .not()
    .isEmpty(),
    check(adress)
    .exists()
    .not()
    .isEmpty(),
    check(city)
    .exists()
    .not()
    .isEmpty(),
    check(country)
    .exists()
    .not()
    .isEmpty(),
    check(timeZone)
    .exists()
    .not()
    .isEmpty(),
    check(securityQuestion)
    .exists()
    .not()
    .isEmpty(),
    check(securityQuestionAnswer)
    .exists()
    .not()
    .isEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = validateSignup;