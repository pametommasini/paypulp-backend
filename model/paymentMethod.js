const newClient = async () => await require("./newClient")();
const CryptoJS = require("crypto-js");
const { v4: uuidv4 } = require('uuid');

class paymentMethod {
    constructor(
        pay_method_uuid = null,
        personal_id = null,
        is_preferred = null,
        card_number = null,
        card_name = null,
        card_type = null,
        card_expiry_date = null,
        card_security_code = null
    ) {
        this.pay_method_uuid = pay_method_uuid;
        this.personal_id = personal_id;
        this.is_preferred = is_preferred;
        this.card_number = card_number;
        this.card_name = card_name;
        this.card_type = card_type;
        this.card_expiry_date = card_expiry_date;
        this.card_security_code = card_security_code;
    }
}

class PaymentMethodManager {

    static getPayments = async (req, id) => {
        const pgClient = await newClient ();
        const isPreferred = req.ispreferred;
        if(isPreferred){
          const prefQueryRes = await pgClient.query(
            "SELECT * FROM payment_methods WHERE is_preferred = TRUE"
          )
          pgClient.end();
          return prefQueryRes.rows[0]
        } else {
        const queryRes = await pgClient.query (
          "SELECT * FROM payment_methods WHERE personal_id = ($1)",
          [id]
        );
        pgClient.end();
        return queryRes.rows[0];
        }
    }

    static postPayment = async (newPayment) => {
        const pay_method_uuid = uuidv4();
        const pgClient = await newClient ();
        const queryRes = await pgClient.query (
          "INSERT INTO payment_methods (pay_method_uuid, personal_id, is_preferred, card_number, card_name, card_type, card_expiry_date, card_security_code) VALUES (($1), ($2), ($3), ($4), ($5), ($6), ($7), ($8)) RETURNING *",
          [pay_method_uuid, newPayment.personalId, newPayment.isPreferred, newPayment.cardNumber, newPayment.cardName, newPayment.cardType, newPayment.cardExpiryDate, newPayment.cardSecurityCode]
        );
        pgClient.end();
        return queryRes.rows[0];
    }

    static deletePayment = async (id) => {
        const pgClient = await newClient ();
        const queryRes = await pgClient.query (
            "DELETE FROM payment_methods WHERE personal_id = ($1)",
            [id]
          );
          pgClient.end();
          return queryRes.rows[0];
    }
    
}

module.exports = PaymentMethodManager;