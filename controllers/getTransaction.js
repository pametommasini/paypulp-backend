const TransactionManager = require("../model/transaction");

const getTransaction = async (req, res) => {
  const dbRes = await TransactionManager.getTransaction(req.params.userUuid);
  res.status(200).json(dbRes);
}

module.exports = getTransaction;