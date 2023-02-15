const PaymentMethodManager = require('../model/paymentMethod');

const getPayments = async (req, res) => {
    console.log(req.params.userUuid)
    const dbRes = await PaymentMethodManager.getPayments(req.query, req.params.userUuid);
    res.status(200).json(dbRes);
};

module.exports = getPayments;

