const newClient = async () => await require("./newClient")();

class transaction {
    constructor(
        transactionId = null,
        businessId = null,
        personalId = null,
        payMethodUuid = null,
        productUuid= null,
        totalAmount = null,
        dateTime = null,
        wentTrough = null
    ) {
      this.transactionId = transactionId;
      this.businessId = businessId;
      this.personalId = personalId;
      this.payMethodUuid = payMethodUuid;
      this.productUuid = productUuid;
      this.totalAmount = totalAmount;
      this.dateTime = dateTime;
      this.wentTrough = wentTrough;
    }
  }

  class TransactionManager {

    static getAllTransactions = async ( ) => {
      const pgClient = await newClient ();
      const queryRes = await pgClient.query (
        "SELECT * FROM transactions"
      );
      pgClient.end();
      return queryRes.rows;
    };

    static getTransaction = async (userUuid) => {
      const pgClient = await newClient ();
      const queryRes = await pgClient.query ( 
        "SELECT transactions.transaction_id, transactions.personal_id,transactions.business_id, transactions.total_amount, transactions.date_time, transactions.went_trough,paypulp_costumers.user_uuid, paypulp_costumers.first_name, business_accounts.business_name, products.product_name, payment_methods.card_number, payment_methods.is_preferred FROM transactions INNER JOIN personal_accounts ON transactions.personal_id = personal_accounts.personal_id INNER JOIN business_accounts ON transactions.business_id = business_accounts.business_id INNER JOIN products ON transactions.product_uuid = products.product_uuid  INNER JOIN payment_methods ON transactions.pay_method_uuid = payment_methods.pay_method_uuid INNER JOIN paypulp_costumers ON business_accounts.costumer_id = paypulp_costumers.costumer_id OR personal_accounts.costumer_id = paypulp_costumers.costumer_id WHERE user_uuid = ($1) ORDER BY date_time DESC;", [userUuid]
      );
      if (queryRes.rows === 0) res.status(400).json({error: "no transactions found"})
        pgClient.end();
      return queryRes.rows;
    };

    static getNewTransaction= async (newTransaction) => {
      const pgClient = await newClient ();
      const queryRes = await pgClient.query (
        "INSERT INTO transactions (business_id, personal_id, pay_method_uuid, product_uuid, total_amount, date_time, went_trough) VALUES (($1), ($2), ($3), ($4), ($5), ($6), ($7)) RETURNING *",
        [newTransaction.businessId, newTransaction.personalId, newTransaction.payMethodUuid, newTransaction.productUuid, newTransaction.totalAmount, newTransaction.dateTime, newTransaction.wentThrough]
        );
      pgClient.end();
      return queryRes.rows[0];
    };
  }

  module.exports = TransactionManager;