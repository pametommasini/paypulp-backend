var express = require('express');
var router = express.Router();
const { validateTransaction } = require('../middlewares/TransactionValidator');

// router.get('/', require("../controllers/Transactions/getAllTransactions"));

router.get('/', require("../controllers/Transactions/getTransaction"));

router.post('/', validateTransaction, require("../controllers/Transactions/getNewTransaction"));

module.exports = router;
