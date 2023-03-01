const PaymentMethodManager = require('../../model/paymentMethod');

const getPayments = async (req, res) => {
    const dbRes = await PaymentMethodManager.getPayments(req.userUuid, req.query);
    res.status(200).json(dbRes);
};

module.exports = getPayments;

