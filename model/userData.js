const {dataToBusinessAccount} = require("./signupModel");

const newClient = async () => await require("./newClient")();

class PaypulpCustomer {
  constructor(
    userId = null,
    userUuid = null,
    email = null,
    accountType = null,
    customerId = null,
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
    creationTime = null
  ) {
    this.userId = userId;
    this.userUuid = userUuid;
    this.email = email;
    this.accountType = accountType;
    this.customerId = customerId;
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
  }
}

class PersonalAccount extends PaypulpCustomer {
  constructor(
    userId,
    userUuid,
    email,
    accountType,
    customerId,
    firstName,
    lastName,
    phone,
    birthDate,
    address,
    city,
    country,
    timeZone,
    securityQuestion,
    securityQuestionAnswer,
    creationTime,
    personalId = null
  ) {
    super(
      userId,
      userUuid,
      email,
      accountType,
      customerId,
      firstName,
      lastName,
      phone,
      birthDate,
      address,
      city,
      country,
      timeZone,
      securityQuestion,
      securityQuestionAnswer,
      creationTime
    ),
      (this.personalId = personalId);
  }
}

const dataToCustomerInfo = (dataFromDb) => {
  const customerInfo = new PaypulpCustomer(
    (userId = dataFromDb.user_id),
    (userUuid = dataFromDb.user_uuid),
    (email = dataFromDb.email),
    (accountType = dataFromDb.account_type),
    (customerId = dataFromDb.customer_id),
    (firstName = dataFromDb.first_name),
    (lastName = dataFromDb.last_name),
    (phone = dataFromDb.phone),
    (birthDate = dataFromDb.birth_date),
    (address = dataFromDb.address),
    (city = dataFromDb.city),
    (country = dataFromDb.country),
    (timeZone = dataFromDb.time_zone),
    (securityQuestion = dataFromDb.security_question),
    (securityQuestionAnswer = dataFromDb.security_question_answer),
    (creationTime = dataFromDb.creation_time)
  );
  return customerInfo;
};

class UserDataManager {
  static getCustomerData = async (userUuid) => {
    const pgClient = await newClient();
    const dbCustomer = await pgClient.query(
      "SELECT * FROM users INNER JOIN paypulp_customers ON users.user_uuid = paypulp_customers.user_uuid WHERE users.user_uuid = ($1);",
      [userUuid]
    );

    if (dbCustomer.rows.length === 0) return;
    let customerInfo = dataToCustomerInfo(dbCustomer.rows[0]);

    if (customerInfo.accountType === "personal") {
      const dbPersonal = await pgClient.query(
        "SELECT personal_accounts.personal_id FROM paypulp_customers INNER JOIN personal_accounts ON paypulp_customers.customer_id = personal_accounts.customer_id WHERE paypulp_customers.customer_id = ($1);",
        [customerInfo.customerId]
      );
      pgClient.end();

      customerInfo = {
        ...customerInfo,
        personalId: dbPersonal.rows[0].personal_id,
      };
      return customerInfo;
    }

    if (customerInfo.accountType === "business") {
      const dbBusiness = await pgClient.query(
        "SELECT business_accounts.* FROM paypulp_customers INNER JOIN business_accounts ON paypulp_customers.customer_id = business_accounts.customer_id WHERE paypulp_customers.customer_id = ($1);",
        [customerInfo.customerId]
      );
      pgClient.end();

      const businessAccountInfo = dataToBusinessAccount(dbBusiness.rows[0]);
      customerInfo = {
        ...customerInfo,
        ...businessAccountInfo,
      };
      return customerInfo;
    }

    return customerInfo;
  };

  static getUserName = async (id) => {
    const pgClient = await newClient();
    const dbRes = await pgClient.query(
      "SELECT first_name FROM paypulp_customers WHERE user_uuid = ($1);",
      [id]
    );
    pgClient.end();
    return dbRes.rows[0];
  };
}

module.exports = UserDataManager;
