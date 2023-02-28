var express = require('express');
var router = express.Router();
const { validateSignup } = require('../middlewares/validators/signupValidator');
const { validateLogin } = require('../middlewares/validators/loginValidator');
const { validatePayment } = require('../middlewares/validators/paymentValidator');

// User data

router.get('/userdata', require('../controllers/Users/getUserData'));

router.delete('/:userUuid', require("../controllers/Users/deleteUser"));
// login
router.post('/login', validateLogin, require('../controllers/Auth/loginController'));
// signup
router.post('/signup', validateSignup, require('../controllers/Auth/signupController'));

// payment methods
router.get('/:userUuid/paymentmethods', require('../controllers/Payments/getPayment'));

router.post('/:userUuid/paymentmethods', validatePayment, require('../controllers/Payments/postPayment'));

router.delete('/:userUuid/paymentmethods', require('../controllers/Payments/deletePayment'));


module.exports = router;
