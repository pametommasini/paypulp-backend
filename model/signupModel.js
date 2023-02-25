const newClient = async () => await require("./newClient")();

class Signup {
    constructor(
        userId = null,
        userUuid = null,
        email = null,
        accountType = null,
        costumerId = null,
        firstName = null,
        lastName = null,
        phone = null,
        birthDate = null,
        adress = null,
        city = null,
        country = null,
        timeZone = null,
        securityQuestion = null,
        securityQuestionAnswer = null,
        creationTime = null,
        password = null
    ) {
        this.userId = userId;
        this.userUuid = userUuid;
        this.email = email;
        this.accountType = accountType;
        this.costumerId = costumerId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.birthDate = birthDate;
        this.adress = adress;
        this.city = city;
        this.country = country;
        this.timeZone = timeZone;
        this.securityQuestion = securityQuestion;
        this.securityQuestionAnswer = securityQuestionAnswer;
        this.creationTime = creationTime;
        this.email = email;
        this.accountType = accountType;
        this.password = password;
    }
}

class SignupManager {

    static insertUsers = async (email, accountType, userUuid, md5Password) => {
        const pgClient = await newClient();
        try {
            const dbUsers = await pgClient.query('INSERT INTO users (user_uuid, email, account_type, password) VALUES (($1), ($2), ($3), ($4)) RETURNING *',
                [userUuid, email, accountType, md5Password]);
            pgClient.end();
            return dbUsers;
        } catch (error) {
            return error;
        }
    }

    static insertCostumers = async (userUuid, body, creationTime) => {
        const pgClient = await newClient();
        try {
            const dbCustomers = await pgClient.query(
                'INSERT INTO paypulp_costumers (user_uuid, first_name, last_name, phone, birth_date, address, city, country, time_zone, security_question, security_question_answer, creation_time) VALUES (($1), ($2), ($3), ($4), ($5), ($6), ($7), ($8), ($9), ($10), ($11), ($12)) RETURNING *',
                [userUuid, body.firstName, body.lastName, body.phone, body.birthDate, body.address, body.city, body.country, body.timeZone, body.securityQuestion, body.securityQuestionAnswer, creationTime]);
            pgClient.end();
            return dbCustomers;
        } catch (error) {
            return error;
        }
    }

    static getInfo = async (userUuid) => {
        const pgClient = await newClient();
        try {
            const dbInfo = await pgClient.query(
                "SELECT  payment_methods.*, paypulp_costumers.first_name, personal_accounts.costumer_id FROM payment_methods INNER JOIN personal_accounts ON payment_methods.personal_id = personal_accounts.personal_id INNER JOIN paypulp_costumers ON personal_accounts.costumer_id = paypulp_costumers.costumer_id WHERE user_uuid = ($1);", [userUuid]);
                return dbInfo;
        } catch(error) {
            return error;
        }
    }

    static getPlusInfo = async (email) => {
        const pgClient = await newClient();
        try {
        const dbClient = await pgClient.query("SELECT * FROM users WHERE email = ($1)", [email]);
        pgClient.end();
        return dbClient
        } catch(error) {
            return error
        }
    }
    
}

module.exports = SignupManager;