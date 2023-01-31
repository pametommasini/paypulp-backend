var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:useruuid', require("../controllers/getAllUsers"));

/* POST new user */
router.post('/', require("../controllers/newUser"));

module.exports = router;
