const newClient = async () => await require("./newClient")();

class Login {
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
        email = null,
        accountType = null,
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

class LoginManager {

    static compareEmail = async (email) => {
        const pgClient = await newClient();
        const dbClient = await pgClient.query("SELECT * FROM users WHERE email = ($1)", [email]);
        pgClient.end();
        return dbClient;
    }

    static getName = async (userUuid) => {
        const pgClient = await newClient();
        const dbRes = await pgClient.query("SELECT first_name FROM paypulp_costumers WHERE user_uuid = ($1);", [userUuid]);
        const dbPayment = await pgClient.query("SELECT is_preferred FROM payment_methods WHERE ")
        pgClient.end();
        return dbRes;
    }
}

module.exports = LoginManager;