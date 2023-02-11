const TransactionManager = require("../model/transaction");

const getTransaction = async (req, res) => {
  const dbRes = await TransactionManager.getTransaction(req.params.transactionId);
  res.status(200).json(dbRes);
}

module.exports = getTransaction;