const TransactionManager = require("../../model/transaction");

const getNewTransaction = async (req, res) => {
  const dbRes = await TransactionManager.getNewTransaction(req.body);
  if(dbRes.rows?.length === 0){
    return res.status(401).json("Insert transaction failed!").end();
  }
  res.status(201).json(dbRes);
}

module.exports = getNewTransaction;