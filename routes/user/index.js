const express = require('express')
const { persInfoSchema } = require('../../middlewares/validationFields/personalInfoSchema')
const { validateResult } = require('../../middlewares/validators/bodyValid')
const router = express.Router()

router.get('/', require('../../controllers/User/getUser'))

router.get('/personalinfo', require('../../controllers/PersonalInfo/getPersonalInfoController'))

router.patch(
  '/personalinfo',
  persInfoSchema,
  validateResult,
  require('../../controllers/PersonalInfo/updatePersonalInfoController'),
  )
  
  router.post('/sellerinfo', require('../../controllers/SellerInfo/newSellerInfoController'))
  
  router.use('/paymethods', require('./paymethods'))

  router.use('/qrlink', require('./qrlink'))
  
module.exports = router
