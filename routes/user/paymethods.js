const express = require('express')
const router = express.Router()

router.get('/', require('../../controllers/User/PayMethods/getUserPayMethodsContr'))

module.exports = router