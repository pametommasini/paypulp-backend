const { check, body } = require('express-validator');
const { validateResult } = require('./validateHelper');

const validateSignup = [
    check("email")
    .exists()
    .withMessage("Email param doesn't exist!")
    .isEmail()
    .withMessage("Incorrect email param format!")
    .notEmpty()
    .withMessage("Email param is empty"),
    check("password")
    .exists()
    .withMessage("Password param doesn't exist!")
    .notEmpty()
    .withMessage("Password param is empty"),
    check("accountType")
    .exists()
    .withMessage("Account type param doesn't exist!")
    .notEmpty()
    .withMessage("Account type param is empty!"),
    check("firstName")
    .exists()
    .withMessage("First name param doesn't exist!")
    .notEmpty()
    .withMessage("First name param is empty!"),
    check("lastName")
    .exists()
    .withMessage("Last name param doesn't exist!")
    .notEmpty()
    .withMessage("Last name param is empty!"),
    check("phone")
    .exists()
    .withMessage("Phone param doesn't exist!")
    .notEmpty()
    .withMessage("Phone param is empty!"),
    check("birthDate")
    .exists()
    .withMessage("Birth date param doesn't exist!")
    .notEmpty()
    .withMessage("Birth date param is empty!"),
    check("address")
    .exists()
    .withMessage("Address param doesn't exist!")
    .notEmpty()
    .withMessage("Address param is empty!"),
    check("city")
    .exists()
    .withMessage("City param doesn't exist!")
    .notEmpty()
    .withMessage("City param is empty!"),
    check("timeZone")
    .exists()
    .withMessage("Time zone param doesn't exist!")
    .notEmpty()
    .withMessage("Time zone param is empty!"),
    check("securityQuestion")
    .exists()
    .withMessage("Security question param doesn't exist!")
    .notEmpty()
    .withMessage("Security question param is empty!"),
    check("securityQuestionAnswer")
    .exists()
    .withMessage("Security question answer param doesn't exist!")
    .notEmpty()
    .withMessage("Security question answer param is empty!"),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateSignup };