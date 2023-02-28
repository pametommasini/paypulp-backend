var express = require('express');
var router = express.Router();
const { validateTransaction } = require('../middlewares/validators/TransactionValidator');

router.get('/', require("../controllers/Transactions/getAllTransactions"));

router.get('/:userUuid', require("../controllers/Transactions/getTransaction"));

router.post('/', validateTransaction, require("../controllers/Transactions/getNewTransaction"));

module.exports = router;
