const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', require("../controllers/index"));

/* routing */
router.use('/users', require("./users"));


router.get('/', require('../controllers/secureRequestController'));



module.exports = router;
