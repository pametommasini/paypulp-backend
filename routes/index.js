const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', require("../controllers/index"));

/* routing */
router.use('/user', require("./user")); 


router.use('/transaction', require("./transaction"));


router.use('/product', require("./product"));




router.get('/', require('../controllers/secureRequestController'));

//endpoint de login
router.post('/login', require('../controllers/loginController'));

// endpoint de signup
//router.post('/signup', require('../controllers/signupController'));



module.exports = router;
