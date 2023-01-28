var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', require("../controllers/index"));

/* routing */
router.use('/users', require("./users"));



module.exports = router;
