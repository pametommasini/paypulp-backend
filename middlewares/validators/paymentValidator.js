const { check } = require('express-validator');
const { validateResult } = require('./validateHelper');

const validatePayment = [
    check("personalId")
    .exists()
    .withMessage("Personal id param doesn't exist")
    .notEmpty()
    .withMessage("Personal id param is empty"),
    check("isPreferred")
    .exists()
    .withMessage("Is preferred param doesn't exist")
    .notEmpty()
    .withMessage("Is preferred param is empty"),
    check("cardNumber")
    .exists()
    .withMessage("Card number param doesn't exist")
    .notEmpty()
    .withMessage("Card number param is empty"),
    check("cardName")
    .exists()
    .withMessage("Card name param doesn't exist")
    .notEmpty()
    .withMessage("Card name param is empty"),
    check("cardType")
    .exists()
    .withMessage("Card type param doesn't exist")
    .notEmpty()
    .withMessage("Card type param is empty"),
    check("cardExpiryDate")
    .exists()
    .withMessage("Card expiry date param doesn't exist")
    .notEmpty()
    .withMessage("Card expiry date param is empty"),
    check("cardSecurityCode")
    .exists()
    .withMessage("Card security code param doesn't exist")
    .notEmpty()
    .withMessage("Card security code param is empty"),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];

module.exports = { validatePayment };