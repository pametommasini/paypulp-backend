var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.status(200).json("users page");
});

/* POST new user */
router.post('/', require("../controllers/newUser"));

module.exports = router;
