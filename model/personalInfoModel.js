const QueryModel = require("./queryModel")

class PersonalInfo extends QueryModel {
  constructor({
    personalInfoId = null,
    userUuid = null,
    lastName = null,
    phone = null,
    birthDate = null,
    address = null,
    city = null,
    country = null,
    timeZone = null,
    creationTime = null,
  }) {
    super()
    this.personalInfoId = personalInfoId
    this.userUuid = userUuid
    this.lastName = lastName
    this.phone = phone
    this.birthDate = birthDate
    this.address = address
    this.city = city
    this.country = country
    this.timeZone = timeZone
    this.creationTime = creationTime
  }
}

module.exports = { PersonalInfo }
