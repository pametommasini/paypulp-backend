const QueryModel = require('./queryModel')

class Transaction extends QueryModel {
  constructor(
    transactionId = null,
    sellerUuid = null,
    buyerUuid = null,
    paymentMethodUuid = null,
    totalAmount = null,
    dateTime = null,
    userCompleted = null,
    wentThrough = null,
    transactionTime = null,
    geolocation = null,
  ) {
    this.transactionId = transactionId
    this.sellerUuid = sellerUuid
    this.buyerUuid = buyerUuid
    this.paymentMethodUuid = paymentMethodUuid
    this.totalAmount = totalAmount
    this.dateTime = dateTime
    this.userCompleted = userCompleted
    this.wentThrough = wentThrough
    this.transactionTime = transactionTime
    this.geolocation = geolocation
  }
}

module.exports = Transaction
