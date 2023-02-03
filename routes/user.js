const express = require('express');
const router = express.Router();


/* GET users listing. */
router.get('/', function(req, res) {
  res.status(200).json("users page");
});

/* POST new user */
router.post('/', require("../controllers/newUser"));

router.use('/:uuid/transactions', require("./transactions"));
//router.use('/transactions', require("./transactions"))

router.post('/', require("../controllers/newTransaction"))

module.exports = router;
