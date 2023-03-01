const TransactionManager = require("../../model/transaction");

const getAllTransactions = async (req, res) => {
  const dbRes = await TransactionManager.getAllTransactions();
  res.status(200).json(dbRes);
}

module.exports = getAllTransactions;