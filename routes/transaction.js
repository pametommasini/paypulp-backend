var express = require('express');
var router = express.Router();

router.get('/', require("../controllers/getAllTransactions"));

router.get('/:transactionId', require("../controllers/getTransaction"));

router.post('/', require("../controllers/getNewTransaction"));

module.exports = router;
