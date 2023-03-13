const { body } = require('express-validator')
const { email } = require('../validationFields')


const locale = ['es-ES']

const validateSignup = [
  body('email')
    .exists()
    .withMessage("Email param doesn't exist!")
    .isEmail()
    .withMessage('Incorrect email param format!')
    .notEmpty()
    .withMessage('Email param is empty'),
  body('password')
    .exists()
    .withMessage("Password param doesn't exist!")
    .notEmpty()
    .withMessage('Password param is empty')
    .isLength({ min: 0, max: 40 })
    .withMessage('Password must contain at least 8 characters')
    .isStrongPassword()
    .withMessage('Password must include: upper and lower case letters, numbers and special characters'),
  body('accountType')
    .exists()
    .withMessage("Account type param doesn't exist!")
    .notEmpty()
    .withMessage('Account type param is empty!')
    .isAlpha()
    .withMessage('Account type only admits alphabetic characters'),
  body('firstName')
    .exists()
    .withMessage("First name param doesn't exist!")
    .notEmpty()
    .withMessage('First name param is empty!')
    .isAlpha(locale, { ignore: ' ' })
    .withMessage('First name only admits alphabetic characters'),
  body('lastName')
    .exists()
    .withMessage("Last name param doesn't exist!")
    .notEmpty()
    .withMessage('Last name param is empty!')
    .isAlpha(locale, { ignore: ' ' })
    .withMessage('Last name only admits alphabetic characters'),
  body('phone')
    .exists()
    .withMessage("Phone param doesn't exist!")
    .notEmpty()
    .withMessage('Phone param is empty!')
    .isInt()
    .withMessage('Phone field must be a number'),
  body('birthDate')
    .exists()
    .withMessage("Birth date param doesn't exist!")
    .notEmpty()
    .withMessage('Birth date param is empty!')
    .isDate()
    .withMessage('Birth date must be a valid date format'),
  body('address')
    .exists()
    .withMessage("Address param doesn't exist!")
    .notEmpty()
    .withMessage('Address param is empty!'),
  body('city')
    .exists()
    .withMessage("City param doesn't exist!")
    .notEmpty()
    .withMessage('City param is empty!')
    .isAlphanumeric(locale, { ignore: ' ' })
    .withMessage('Address only accept alphabetic characters and numbers'),
  body('timeZone')
    .exists()
    .withMessage("Time zone param doesn't exist!")
    .notEmpty()
    .withMessage('Time zone param is empty!')
    .isInt()
    .withMessage('Time zone must be a number'),
  body('securityQuestion')
    .exists()
    .withMessage("Security question param doesn't exist!")
    .notEmpty()
    .withMessage('Security question param is empty!')
    .isAlpha(locale, { ignore: '? ' })
    .withMessage('Security question only admits alphabetic characters'),
  body('securityQuestionAnswer')
    .exists()
    .withMessage("Security question answer param doesn't exist!")
    .notEmpty()
    .withMessage('Security question answer param is empty!')
    .isAlpha(locale, { ignore: '? ' })
    .withMessage('Security question answer only admits alphabetic characters'),
]

module.exports = { validateSignup }
