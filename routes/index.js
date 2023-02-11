const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', require("../controllers/index"));

/* routing */
router.use('/user', require("./user")); 

/*routing*/
router.use('/transaction', require("./transaction"));

module.exports = router;
