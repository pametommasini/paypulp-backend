const { check } = require('express-validator');
const { validateResult } = require('./validateHelper');

const validateProduct = [
    check("productUuid")
    .exists()
    .withMessage("Product uuid param doesn't exist")
    .notEmpty()
    .withMessage("Product uuid param is empty"),
    check("businessId")
    .exists()
    .withMessage("Business id param doesn't exist")
    .notEmpty()
    .withMessage("Business id param is empty"),
    check("productName")
    .exists()
    .withMessage("Product name param doesn't exist")
    .notEmpty()
    .withMessage("Product name param is empty"),
    check("productType")
    .exists()
    .withMessage("Product type param doesn't exist")
    .notEmpty()
    .withMessage("Product type param is empty"),
    check("productDescription")
    .exists()
    .withMessage("Product description param doesn't exist")
    .notEmpty()
    .withMessage("Product description param is empty"),
    check("image")
    .exists()
    .withMessage("Image param doesn't exist")
    .notEmpty()
    .withMessage("Image param is empty"),
    check("price")
    .exists()
    .withMessage("Price param doesn't exist")
    .notEmpty()
    .withMessage("Price param is empty"),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];

module.exports = { validateProduct };