const { validationResult } = require('express-validator')

const loginValid = (req, res, next) => {
  try {
    validationResult(req).throw()
    return next()
  } catch (err) {
    res.status(400).send({ errors: 'invalid email or password' })
  }
}

module.exports = { loginValid }
