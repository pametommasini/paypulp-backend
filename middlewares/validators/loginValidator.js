const { body } = require('express-validator')

const validateLogin = [
  body('email')
    .exists()
    .withMessage("Email param doesn't exist!")
    .isEmail()
    .withMessage('Incorrect email format!')
    .notEmpty()
    .withMessage('Email param is empty!'),
  body('password')
    .exists()
    .withMessage("Password param doesn't exist!")
    .notEmpty()
    .withMessage('Password param is empty!'),
]

module.exports = { validateLogin }
