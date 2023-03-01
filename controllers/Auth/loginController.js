const LoginManager = require("../../model/loginModel");
const jwt = require("jsonwebtoken");
const newClient = require("../../model/newClient");
const CryptoJS = require("crypto-js");
const UserDataManager = require("../../model/userData");

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const md5Password = CryptoJS.MD5(password).toString();

  const dbEmail = await LoginManager.compareEmail(email);
  if (dbEmail.rows.length === 0) {
    return res.status(401).json("User not found!").end();
  }
  const dbPassword = dbEmail.rows[0].password;
  const userUuid = dbEmail.rows[0].user_uuid;
  if (email != dbEmail.rows[0].email || md5Password != dbPassword) {
    return res.status(401).json("Invalid user or password!").end();
  }

  const dbUserData = await UserDataManager.getUserData(userUuid);

  // const dbName = await LoginManager.getName(userUuid);

  const userInfo = {
    email: dbEmail.rows[0].email,
    userUuid: dbEmail.rows[0].user_uuid,
    accountType: dbEmail.rows[0].account_type,
    ...dbUserData,
    // ...dbName || null,
    // firstName: dbName.rows[0].first_name,
    // payMethodId: dbName.rows[0].pay_method_id || null,
    // payMethodUuid: dbName.rows[0].pay_method_uuid || null,
    // personalId: dbName.rows[0].personal_id || null,
    // isPreferred: dbName.rows[0].is_preferred || null,
    // cardNumber: dbName.rows[0].card_number || null,
    // cardName: dbName.rows[0].card_name || null,
    // cardType: dbName.rows[0].card_type || null,
    // cardExpiryDate: dbName.rows[0].card_expiry_date || null,
    // cardSecurityCode: dbName.rows[0].card_security_code || null
  };

  const token = jwt.sign({ userUuid }, process.env.SECRET, {
    algorithm: "HS256",
    expiresIn: 3000,
  });
  res.json({ token, userInfo });
};

module.exports = loginController;
