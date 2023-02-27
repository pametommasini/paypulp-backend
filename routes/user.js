var express = require('express');
var router = express.Router();
const { validateResult } = require('../middlewares/validators/validateHelper');
const { validateSignup } = require('../middlewares/validators/signupValidator');
const { validateLogin } = require('../middlewares/validators/loginValidator');

// User data

router.get('/:costumerId/userdata', require('../controllers/Users/getUserData'));

router.delete('/:userUuid', require("../controllers/Users/deleteUser"));
// login
router.post('/login', validateLogin, validateResult, require('../controllers/Auth/loginController'));
// signup
router.post('/signup', validateSignup, validateResult, require('../controllers/Auth/signupController'));

// payment methods
router.get('/:userUuid/paymentmethods', require('../controllers/Payments/getPayment'));

router.post('/:userUuid/paymentmethods', require('../controllers/Payments/postPayment'));

router.delete('/:userUuid/paymentmethods', require('../controllers/Payments/deletePayment'));


module.exports = router;
