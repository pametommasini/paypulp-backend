const {
  email,
  password,
  accountType,
  firstName,
  lastName,
  phone,
  birthDate,
  timeZone,
  securityQuestion,
  securityQuestionAnswer,
  address,
  city,
} = require('./authFields')

const signupValidFields = [
  email(),
  password(),
  accountType(),
  firstName(),
  lastName(),
  phone(),
  birthDate(),
  address(),
  city(),
  timeZone(),
  securityQuestion(),
  securityQuestionAnswer(),
]

module.exports = { signupValidFields }
