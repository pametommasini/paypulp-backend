const TransactionManager = require("../../model/transaction");

const getNewTransaction = async (req, res) => {
  console.log(req.body)
  const dbRes = await TransactionManager.getNewTransaction(req.body);
  res.status(201).json(dbRes);
}

module.exports = getNewTransaction;