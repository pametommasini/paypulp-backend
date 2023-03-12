const LoginManager = require("../../model/loginModel");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const UserDataManager = require("../../model/userData");
const PaymentMethodManager = require("../../model/paymentMethod");
const { UserManager } = require("../../model/user");

const encryptPassword = (password) => {
  return CryptoJS.MD5(password).toString();
}

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const encryptedPassword = encryptPassword(password);

  const dbUser = await UserManager.getUserByEmail(email);
  if (!dbUser) {
    return res.status(401).json("User not found").end();
  }

  const dbPassword = dbUser.password;
  const userUuid = dbUser.userUuid

  if (encryptedPassword != dbPassword) {
    return res.status(401).json("Invalid user or password!").end();
  }

  const dbUserData = await UserDataManager.getCustomerData(userUuid);
  if(!dbUserData){
    return res.status(401).json("User not found!").end();
  }
  console.log(dbUserData)
  const paymentMethods = await PaymentMethodManager.getPaymentMethods(userUuid, {ispreferred: true});
  if(paymentMethods.rows?.length === 0){
    return res.status(401).json("Payment method not found!").end();
  }

  delete dbUser.password
  const userInfo = {
    ...dbUser,
    ...dbUserData,
  };

  const token = jwt.sign({ userUuid }, process.env.SECRET, {
    algorithm: "HS256",
    expiresIn: 3000,
  });
  res.json({ token, userInfo, paymentMethods });
};

module.exports = loginController;
