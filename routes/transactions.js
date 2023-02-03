const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  console.log(req.params)
    res.status(200).json("users page");
  });

//router.get('/search/:uuid/', require("../controllers/search"))

module.exports = router;