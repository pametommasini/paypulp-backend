var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:useruuid', require("../controllers/getAllUsers"));

/* POST new user */
router.post('/', require("../controllers/newUser"));


router.use('/:uuid/transactions', require("./transactions"));
//router.use('/transactions', require("./transactions"))

router.post('/', require("../controllers/newTransaction"))

module.exports = router;
