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
    address = null,
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
    this.address = address;
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

class PersonalAccount {
  constructor(personalId = null, costumerId = null) {
    this.personalId = personalId;
    this.costumerId = costumerId;
  }
}

class BusinessAccount {
  constructor(
    businessId = null,
    costumerId = null,
    businessName = null,
    businessType = null,
    businessDescription = null,
    webPage = null,
    cif = null,
    industry = null,
    bankAccountNumber = null
  ) {
    this.businessId = businessId;
    this.costumerId = costumerId;
    this.businessName = businessName;
    this.businessType = businessType;
    this.businessDescription = businessDescription;
    this.webPage = webPage;
    this.cif = cif;
    this.industry = industry;
    this.bankAccountNumber = bankAccountNumber;
  }
}

const dataToPersonalAccount = (dataFromDb) => {
  const personalAccount = new PersonalAccount(
    (personalId = dataFromDb.personal_id),
    (costumerId = dataFromDb.costumer_id)
  );
  return personalAccount;
};

const dataToBusinessAccount = (dataFromDb) => {
  const businessAccount = new PersonalAccount(
    (costumerId = dataFromDb.costumer_id),
    (businessId = dataFromDb.business_id),
    (businessName = dataFromDb.business_name),
    (businessType = dataFromDb.business_type),
    (businessDescription = dataFromDb.business_description),
    (webPage = dataFromDb.web_page),
    (cif = dataFromDb.cif),
    (industry = dataFromDb.industry),
    (bankAccountNumber = dataFromDb.bank_account_number)
  );
  return businessAccount;
};

class SignupManager {
  static insertUsers = async (email, accountType, userUuid, md5Password) => {
    const pgClient = await newClient();
    try {
      const dbUsers = await pgClient.query(
        "INSERT INTO users (user_uuid, email, account_type, password) VALUES (($1), ($2), ($3), ($4)) RETURNING *",
        [userUuid, email, accountType, md5Password]
      );
      pgClient.end();
      return dbUsers;
    } catch (error) {
      return error;
    }
  };

  static insertCostumers = async (userUuid, body, creationTime) => {
    const pgClient = await newClient();
    try {
      const dbCustomers = await pgClient.query(
        "INSERT INTO paypulp_costumers (user_uuid, first_name, last_name, phone, birth_date, address, city, country, time_zone, security_question, security_question_answer, creation_time) VALUES (($1), ($2), ($3), ($4), ($5), ($6), ($7), ($8), ($9), ($10), ($11), ($12)) RETURNING *",
        [
          userUuid,
          body.firstName,
          body.lastName,
          body.phone,
          body.birthDate,
          body.address,
          body.city,
          body.country,
          body.timeZone,
          body.securityQuestion,
          body.securityQuestionAnswer,
          creationTime,
        ]
      );
      pgClient.end();
      return dbCustomers;
    } catch (error) {
      return error;
    }
  };

  static insertPersonalAccount = async (costumer_id) => {
    const pgClient = await newClient();
    try {
      const dbPersonalAccounts = await pgClient.query(
        "INSERT INTO personal_accounts (costumer_id) VALUES (($1)) RETURNING *",
        [costumer_id]
      );
      pgClient.end();
      const newPersonalAccount = dataToPersonalAccount(
        dbPersonalAccounts.rows[0]
      );
      return newPersonalAccount;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  static insertBusinessAccount = async (costumerId, body) => {
    const pgClient = await newClient();
    try {
      const dbBusinessAccount = await pgClient.query(
        "INSERT INTO business_accounts (costumer_id, business_name, business_type, business_description, web_page, cif, industry, bank_account_number) VALUES (($1), ($2), ($3), ($4), ($5), ($6), ($7), ($8)) RETURNING *",
        [
          costumerId,
          body.businessName,
          body.businessType,
          body.businessDescription,
          body.webPageURL,
          body.cif,
          body.industry,
          body.bankAccountNumber,
        ]
      );
      pgClient.end();
      const businessAccount = dataToBusinessAccount(dbBusinessAccount.rows[0])
      return businessAccount;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
}

module.exports = SignupManager;
