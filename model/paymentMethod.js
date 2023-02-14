const newClient = async () => await require("./newClient")();
const CryptoJS = require("crypto-js");
const MD5 = require("crypto-js/md5");
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

class paymentMethodManager {

    static getAllPayments = async (id) => {
        const pgClient = await newClient ();
        const queryRes = await pgClient.query (
          "SELECT * FROM payment_methods WHERE personal_id = {$1}",
          [id]
        );
        pgClient.end();
        return queryRes.rows;
    }
    
    static getPayment = async (id, is_preferred) => {
        const pgClient = await newClient ();
        const queryRes = await pgClient.query (
          "SELECT * FROM payment_methods WHERE personal_id = {$1} AND is_preferred = {$2}",
          [id, is_preferred]
        );
        pgClient.end();
        return queryRes.rows;
    }

    static postPayment = async (newPayment) => {
        const pay_method_uuid = uuidv4();
        const pgClient = await newClient ();
        const queryRes = await pgClient.query (
          "INSERT INTO payment_methods (pay_method_uuid, personal_id, is_preferred, card_number, card_name, card_type, card_expiry_date, card_security_code) VALUES (($1), ($2), ($3), ($4), ($5), ($6), ($7), ($8)) RETURNING *",
          [pay_method_uuid, personal_id, is_preferred, card_number, card_name, card_type, card_expiry_date, card_security_code]
        );
        pgClient.end();
        return queryRes.rows[0];
    }
    
}