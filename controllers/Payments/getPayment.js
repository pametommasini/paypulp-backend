const PaymentMethodManager = require('../../model/paymentMethod');

const getPayments = async (req, res) => {
    const params = Object.keys(req.query).length > 0 ? req.query : null;
    const dbRes = await PaymentMethodManager.getPaymentMethods(req.userUuid, params);
    res.status(200).json(dbRes);
};

module.exports = getPayments;

