const newClient = async () => await require("./newClient")();
const CryptoJS = require("crypto-js");
const { v4: uuidv4 } = require("uuid");

class PaymentMethod {
  constructor(
    payMethodUuid = null,
    isPreferred = null,
    cardNumber = null,
    cardName = null,
    cardType = null,
    cardExpiryDate = null
  ) {
    this.payMethodUuid = payMethodUuid;
    this.isPreferred = isPreferred;
    this.cardNumber = cardNumber;
    this.cardName = cardName;
    this.cardType = cardType;
    this.cardExpiryDate = cardExpiryDate;
  }
}

const dataToPaymentMethod = (DataFromDb) => {
  const paymentMethod = new PaymentMethod(
    (payMethodUuid = DataFromDb.pay_method_uuid),
    (isPreferred = DataFromDb.is_preferred),
    (cardNumber = DataFromDb.card_number),
    (cardName = DataFromDb.card_name),
    (cardType = DataFromDb.card_type),
    (cardExpiryDate = DataFromDb.card_expiry_date)
  );
  return paymentMethod;
};

class PaymentMethodManager {
  static getPaymentMethods = async (userUuid, params) => {
    const pgClient = await newClient();
    if (params?.ispreferred) {
      const prefQueryRes = await pgClient.query(
        "SELECT payment_methods.pay_method_uuid, payment_methods.card_number, payment_methods.card_name, payment_methods.card_type, payment_methods.is_preferred, payment_methods.card_expiry_date FROM payment_methods INNER JOIN personal_accounts ON payment_methods.personal_id = personal_accounts.personal_id INNER JOIN paypulp_customers ON personal_accounts.customer_id = paypulp_customers.customer_id WHERE user_uuid = ($1) AND is_preferred = true;",
        [userUuid]
      );
      pgClient.end();
      if (prefQueryRes.rows.length === 0) return [];
      const preferredPaymentMethod = [dataToPaymentMethod(prefQueryRes.rows[0])];
      return preferredPaymentMethod;
    } else {
      const queryRes = await pgClient.query(
        "SELECT payment_methods.pay_method_uuid, payment_methods.card_number, payment_methods.card_name, payment_methods.card_type, payment_methods.is_preferred, payment_methods.card_expiry_date FROM payment_methods INNER JOIN personal_accounts ON payment_methods.personal_id = personal_accounts.personal_id INNER JOIN paypulp_customers ON personal_accounts.customer_id = paypulp_customers.customer_id WHERE user_uuid = ($1)",
        [userUuid]
      );
      pgClient.end();
      const userPaymentMethods = queryRes.rows.map(row => dataToPaymentMethod(row));
      return userPaymentMethods;
    }
  };

  static postPayment = async (newPayment) => {
    const pay_method_uuid = uuidv4();
    const pgClient = await newClient();
    const queryRes = await pgClient.query(
      "INSERT INTO payment_methods (pay_method_uuid, personal_id, is_preferred, card_number, card_name, card_type, card_expiry_date, card_security_code) VALUES (($1), ($2), ($3), ($4), ($5), ($6), ($7), ($8)) RETURNING *",
      [
        pay_method_uuid,
        newPayment.personalId,
        newPayment.isPreferred,
        newPayment.cardNumber,
        newPayment.cardName,
        newPayment.cardType,
        newPayment.cardExpiryDate,
        newPayment.cardSecurityCode,
      ]
    );
    pgClient.end();
    return queryRes.rows[0];
  };

  static deletePayment = async (id) => {
    const pgClient = await newClient();
    const queryRes = await pgClient.query(
      "DELETE FROM payment_methods WHERE personal_id = ($1)",
      [id]
    );
    pgClient.end();
    return queryRes.rows[0];
  };
}

module.exports = PaymentMethodManager;
