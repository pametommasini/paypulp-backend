const { body } = require('express-validator')

const email = () => {
  return body('email')
    .exists()
    .withMessage("Email param doesn't exist!")
    .isEmail()
    .withMessage('Incorrect email param format!')
    .notEmpty()
    .withMessage('Email param is empty')
}

module.exports = { email }
