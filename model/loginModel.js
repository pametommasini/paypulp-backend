const newClient = async () => await require("./newClient")();

class Login {
    constructor(
        userId = null,
        userUuid = null,
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
        email = null,
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
        this.password = password;
    }
}

class LoginManager {

    static compareEmail = async (email) => {
        const pgClient = await newClient();
        try {
        const dbClient = await pgClient.query("SELECT * FROM users WHERE email = ($1)", [email]);
        pgClient.end();
        return dbClient
        } catch(error) {
            return error
        }
    }

    static getName = async (userUuid) => {
        const pgClient = await newClient();
        try{
        const dbRes = await pgClient.query("SELECT  payment_methods.*, paypulp_costumers.first_name, personal_accounts.costumer_id FROM payment_methods INNER JOIN personal_accounts ON payment_methods.personal_id = personal_accounts.personal_id INNER JOIN paypulp_costumers ON personal_accounts.costumer_id = paypulp_costumers.costumer_id WHERE user_uuid = ($1);", [userUuid]);
        pgClient.end();
        return dbRes;
        } catch(error){
            return error;
        }
    }
}

module.exports = LoginManager;