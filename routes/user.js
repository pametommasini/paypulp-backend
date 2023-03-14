var express = require('express')
var router = express.Router()
const { validatePayment } = require('../middlewares/paymentValidator')
const dbConnect = require('../model/newClient')

// // User data
// router.get('/userdata', require('../controllers/Users/getCustomerData'));

// router.delete('/:userUuid', require("../controllers/Users/deleteUser"));

// // payment methods
// router.get('/paymentmethods', require('../controllers/Payments/getPayment'));

// router.post('/paymentmethods', validatePayment, require('../controllers/Payments/postPayment'));

// router.delete('/:userUuid/paymentmethods', require('../controllers/Payments/deletePayment'));

// get single user by Uuid - TEST
router.get('/', async (req, res) => {
  const client = await dbConnect()

  const dbRes = await client.query('SELECT * FROM users')
  client.end()

  return res.status(200).json(dbRes.rows[0])
})

module.exports = router

