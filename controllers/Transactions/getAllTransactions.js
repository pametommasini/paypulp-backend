const TransactionManager = require("../../model/transaction");

const getAllTransactions = async (req, res) => {
  const dbRes = await TransactionManager.getAllTransactions();
  if(dbRes.rows?.length === 0){
    return res.status(401).json("Transaction not found!").end();
  }
  res.status(200).json(dbRes);
}

module.exports = getAllTransactions;