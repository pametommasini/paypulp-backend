var express = require('express');
var router = express.Router();

// User data

router.get('/:costumerId/userdata', require('../controllers/getUserData'));

router.delete('/:userUuid', require("../controllers/deleteUser"));

// router.get('/:userUuid', require("../controllers/getUser"));

// router.get('/:userUuid/username', require('../controllers/getUserName'));


// payment methods
router.get('/:userUuid/paymentmethods', require('../controllers/getPayment'));

router.post('/:userUuid/paymentmethods', require('../controllers/postPayment'));

router.delete('/:userUuid/paymentmethods', require('../controllers/deletePayment'))


module.exports = router;
