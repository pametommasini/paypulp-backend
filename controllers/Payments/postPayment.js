const PaymentMethodManager = require('../../model/paymentMethod');

const postPayment = async (req, res) => {
    const dbRes = await PaymentMethodManager.postPayment(req.body);
    if(dbRes.rows?.length === 0){
        return res.status(401).json("Insert payment failed!").end();
      }
    res.status(200).json(dbRes);
};

module.exports = postPayment;