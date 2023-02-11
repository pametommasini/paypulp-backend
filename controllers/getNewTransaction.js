const TransactionManager = require("../model/transaction");

const getNewTransaction = async (req, res) => {
  const dbRes = await TransactionManager.getNewTransaction(req.body);
  res.status(201).json(dbRes);
}

module.exports = getNewTransaction;