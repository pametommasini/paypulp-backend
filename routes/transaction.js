var express = require('express');
var router = express.Router();
const { validateTransaction } = require('../middlewares/TransactionValidator');
const { validateResult } = require('../middlewares/validators/bodyValid');

// router.post('/:selleruuid/:totalamount', validateTransaction, validateResult, require("../controllers/Transactions/getNewTransaction"));

module.exports = router;
