var express = require('express')
var router = express.Router()

router.get('/', require('../controllers/User/getUser'))

router.get('/personalinfo', require('../controllers/PersonalInfo/getPersonalInfo'))

router.post('/sellerinfo', require('../controllers/SellerInfo/newSellerInfo'))

module.exports = router

