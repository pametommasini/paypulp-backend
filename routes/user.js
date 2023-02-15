var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', require("../controllers/getAllUsers"));

router.get('/:userUuid', require("../controllers/getUser"));

/* POST new user */

router.delete('/:userUuid', require("../controllers/deleteUser"));
// login
router.post('/login', require('../controllers/loginController'));
// signup
router.post('/signup', require('../controllers/signupController'));

// payment methods
// router.get('/:userUuid/paymentmethods', require('../controllers/getPayment'));

// router.post('/:userUuid/paymentmethods', require('../controllers/postPayment'));

// router.delete('/:userUuid/paymentmethods', require('../controllers/deletePayment'))

module.exports = router;
