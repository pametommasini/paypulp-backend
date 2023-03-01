const PaymentMethodManager = require('../../model/paymentMethod');

const deletePayment = async (req, res) => {
    const dbRes = await PaymentMethodManager.deletePayment(req.params.userUuid);
    if(dbRes.rows.length === 0){
        return res.status(401).json("Payment not found!").end();
      }
    res.status(200).json(dbRes);
};

module.exports = deletePayment;