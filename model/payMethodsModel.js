const QueryModel = require("./queryModel")

class PayMethod extends QueryModel {
  constructor(
    payMethodId = null,
    paymentMethodUuid = null,
    userUuid = null,
    cardNumber = null,
    cardOwnerName = null,
    cardExpiryDate = null,
    cardCvv = null,
  ) {
    this.payMethodId = payMethodId;
    this.paymentMethodUuid = paymentMethodUuid;
    this.userUuid = userUuid;
    this.cardNumber = cardNumber;
    this.cardOwnerName = cardOwnerName;
    this.cardExpiryDate = cardExpiryDate;
    this.cardCvv = cardCvv;
  }
}

module.exports = PayMethod;
