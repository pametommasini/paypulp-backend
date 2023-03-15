const { body } = require('express-validator')

const locale = ['es-ES']

const lastName = () => {
  return body('lastName')
    .optional()
    .notEmpty()
    .withMessage('Last name param is empty!')
    .isAlpha(locale, { ignore: ' ' })
    .withMessage('Last name only admits letters')
    .trim()
}

const phone = () => {
  return body('phone')
    .optional()
    .notEmpty()
    .withMessage('Phone param is empty!')
    .isInt()
    .withMessage('Phone field must be a number')
    .trim()
}

const birthDate = () => {
  return body('birthDate')
    .optional()
    .notEmpty()
    .withMessage('Birth date param is empty!')
    .isDate()
    .withMessage('Birth date must be a valid date format')
}

const address = () => {
  return body('address')
    .optional()
    .notEmpty()
    .withMessage('Address param is empty!')
    .isAlphanumeric(locale, { ignore: ' ' })
    .withMessage('Address only admits letters and numbers')
    .trim()
}

const city = () => {
  return body('city')
    .optional()
    .notEmpty()
    .withMessage('City param is empty!')
    .isAlpha(locale, { ignore: ' ' })
    .withMessage('City only accept letters')
    .trim()
}

const country = () => {
  return body('country')
    .optional()
    .notEmpty()
    .withMessage('Country param is empty!')
    .isAlpha(locale, { ignore: ' ' })
    .withMessage('Country only accept letters')
    .trim()
}

const timeZone = () => {
  return body('timeZone')
    .optional()
    .notEmpty()
    .withMessage('Time zone param is empty!')
    .isInt()
    .withMessage('Time zone must be a number')
}

const updatePersonalInfoFields = [
  lastName(),
  phone(),
  birthDate(),
  address(),
  city(),
  country(),
  timeZone(),
]

module.exports = updatePersonalInfoFields
