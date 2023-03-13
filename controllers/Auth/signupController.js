const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const { v4: uuidv4 } = require("uuid");
const { SignupManager } = require("../../model/signupModel");
const { UserManager } = require("../../model/user");
const BusinessAccountsManager = require("../../model/businessAccounts");

const signupController = async (req, res) => {
  const userUuid = uuidv4();
  const {
    email,
    password,
    accountType,
    businessName = null,
  } = req.body;

  const encryptedPassword = CryptoJS.MD5(password).toString();

  const dbUserByEmail = await UserManager.getUserByEmail(email);
  if (dbUserByEmail?.email === email)
    return res.status(400).json("Email already in use").end();

  if (accountType === "business") {
    const dbBusiness = await BusinessAccountsManager.getBusinessByName(
      businessName
    );
    if (dbBusiness?.businessName === businessName)
      return res.status(400).json("Business name already in use").end();
  }

  const dbUser = await SignupManager.insertUser(
    email,
    accountType,
    userUuid,
    encryptedPassword
  );
  if (!dbUser.rows) {
    return res.status(500).json("Signup failed in data base!").end();
  }

  //creation time
  const today = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const creationTime = today.toLocaleString("en-US", options);

  const dbCustomer = await SignupManager.insertCustomer(
    userUuid,
    req.body,
    creationTime
  );
  if (!dbUser.rows) {
    return res.status(401).json("Signup failed in data base!").end();
  }

  let dbPersonalAccount;
  if (dbUser?.rows[0].account_type === "personal") {
    dbPersonalAccount = await SignupManager.insertPersonalAccount(
      dbCustomer.rows[0].customer_id
    );
    if (!dbUser.rows) {
      return res.status(500).json("Insert personal account failed");
    }
  }

  if (dbUser?.rows[0].account_type === "business") {
    dbPersonalAccount = await SignupManager.insertBusinessAccount(
      dbCustomer.rows[0].customer_id,
      req.body
    );
    const dbCode = parseInt(dbPersonalAccount.code);
    if (dbCode === 23505)
      return res.status(400).json("Business name already in use");
    if (!dbPersonalAccount) {
      return res.status(500).json("Insert business account failed");
    }
  }

  const userInfo = {
    email: dbUser.rows[0].email,
    accountType: dbUser.rows[0].account_type,
    firstName: dbCustomer.rows[0].first_name,
    lastName: dbCustomer.rows[0].last_name,
    phone: dbCustomer.rows[0].phone,
    birthDate: dbCustomer.rows[0].birth_date,
    adress: dbCustomer.rows[0].adress,
    city: dbCustomer.rows[0].city,
    country: dbCustomer.rows[0].country,
    timeZone: dbCustomer.rows[0].time_zone,
    creationTime: creationTime,
    payMethodId: null,
    payMethodUuid: null,
    personalId: null,
    isPreferred: null,
    cardNumber: null,
    cardName: null,
    cardType: null,
    cardExpiryDate: null,
    cardSecurityCode: null,
  };

  const token = jwt.sign({ userUuid }, process.env.SECRET, {
    algorithm: "HS256",
    expiresIn: 3000,
  });
  res.status(200).json({ token, userInfo });
};

module.exports = signupController;
