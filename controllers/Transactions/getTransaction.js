const TransactionManager = require("../../model/transaction");

const getTransaction = async (req, res) => {
  const dbRes = await TransactionManager.getTransaction(req.userUuid);
  if(dbRes.rows?.length === 0){
    return res.status(401).json("Transaction not found!").end();
  }
  res.status(200).json(dbRes);
}

module.exports = getTransaction;