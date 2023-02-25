var express = require('express');
var router = express.Router();
const { validateResult } = require('../middlewares/validators/validateHelper');
const { validateSignup } = require('../middlewares/validators/signupValidator');
const { validateLogin } = require('../middlewares/validators/loginValidator');

/* GET users listing. */
router.get('/', require("../controllers/getAllUsers"));

router.get('/:userUuid', require("../controllers/getUser"));

/* POST new user */

router.delete('/:userUuid', require("../controllers/deleteUser"));
// login
router.post('/login', validateLogin, validateResult, require('../controllers/loginController'));
// signup
router.post('/signup', validateSignup, validateResult, require('../controllers/signupController'));

// payment methods
router.get('/:userUuid/paymentmethods', require('../controllers/getPayment'));

router.post('/:userUuid/paymentmethods', require('../controllers/postPayment'));

router.delete('/:userUuid/paymentmethods', require('../controllers/deletePayment'))

router.get('/:costumerId/userdata', require('../controllers/getUserData'));

router.get('/:userUuid/username', require('../controllers/getUserName'));

module.exports = router;
