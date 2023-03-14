var express = require('express')
var router = express.Router()

router.get('/', require('../controllers/User/getUser'))

router.get('/profileinfo', require('../controllers/User/getUser'))

module.exports = router

