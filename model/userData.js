const newClient = async () => await require("./newClient")();

class UserDataManager {
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
        personalId = null
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
        this.personalId = personalId;
      }
    
    static getUserData = async (id) => {
        const pgClient = await newClient();
        const dbRes = await pgClient.query("SELECT * FROM paypulp_costumers WHERE costumer_id = ($1);", [id]);
        const dbUsers = await pgClient.query("SELECT * FROM personal_accounts WHERE costumer_id = ($1);", [id]);
        pgClient.end();
        let dbRows = [];
        let costumers = dbRes.rows[0];
        let personal = dbUsers.rows[0];
        dbRows.push(costumers, personal);
        console.log(dbRows);
        return dbRes.rows;
    }

    static getUserName = async(id) => {
        const pgClient = await newClient();
        const dbRes = await pgClient.query("SELECT first_name FROM paypulp_costumers WHERE user_uuid = ($1);", [id]);
        pgClient.end();
        return dbRes.rows[0];

    }
}

module.exports = UserDataManager;