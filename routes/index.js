const express = require('express');
const router = express.Router();

router.use('/user', require("./user")); 

router.use('/transaction', require("./transaction"));

module.exports = router;
