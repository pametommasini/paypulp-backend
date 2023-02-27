var express = require('express');
var router = express.Router();

router.get('/', require("../controllers/Transactions/getAllTransactions"));

router.get('/:userUuid', require("../controllers/Transactions/getTransaction"));

router.post('/', require("../controllers/Transactions/getNewTransaction"));

module.exports = router;
