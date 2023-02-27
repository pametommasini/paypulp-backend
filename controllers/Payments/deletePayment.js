const PaymentMethodManager = require('../../model/paymentMethod');

const deletePayment = async (req, res) => {
    const dbRes = await PaymentMethodManager.deletePayment(req.params.userUuid);
    res.status(200).json(dbRes);
};

module.exports = deletePayment;