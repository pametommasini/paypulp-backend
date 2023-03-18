var express = require('express')
var router = express.Router()
const { validateTransaction } = require('../middlewares/TransactionValidator')
const { validateResult } = require('../middlewares/validators/bodyValid')

router.post(
  '/',
  /* validateTransaction, validateResult, */ require('../controllers/Transaction/postTransaction.js'),
)

module.exports = router
