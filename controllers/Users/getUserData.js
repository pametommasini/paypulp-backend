const PaymentMethodManager = require("../../model/paymentMethod");
const UserDataManager = require("../../model/userData");

const getUserData = async (req, res) => {
  let resData = {};

  try {
    const userInfo = await UserDataManager.getUserData(req.userUuid);
    resData = { userInfo };
  } catch (error) {
    console.error("error", error);
    return res.status(400).json(error);
  }

  const paymentMethods = await PaymentMethodManager.getPaymentMethods(
    userUuid,
    { ispreferred: true }
  );
  if(paymentMethods.rows.length === 0){
    return res.status(401).json("Payment not found!").end();
  }

  resData = { ...resData, paymentMethods: paymentMethods };
  res.status(200).json(resData);
};

module.exports = getUserData;
