const PaymentMethodManager = require('../model/paymentMethod');

const postPayment = async (req, res) => {
    const dbRes = await PaymentMethodManager.postPayment(req.body);
    res.status(200).json(dbRes);
};

module.exports = postPayment;