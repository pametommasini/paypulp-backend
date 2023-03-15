const { SellerInfo } = require("../../model/sellerInfoModel")

const newSellerInfo = async (req, res) => {
  const inputSellerName = req.body.sellerName

  const dbSellerName = await SellerInfo.selectBy('sellerInfo', 'sellerName', inputSellerName)

  if (dbSellerName) return res.status(400).json({ error: 'Name taken. Sorry'})

  const newSellerInfo = {
    userUuid: req.userUuid,
    sellerName: req.body.sellerName,
    category: req.body.category,
    storeAddress: req.body.storeAddress,
    storeAddressAddInfo: req.body.storeAddressAddInfo,
  }

  try {
    const dbRes = await SellerInfo.insertData('sellerInfo', newSellerInfo)

    return res.status(200).json(dbRes)
  } catch (error) {
    // console.log(error)
    if (error.code === '23505') return res.status(400).json({ error: 'This user already has seller info stored'})
    const message = 'An error occurred while processing your request'
    return res.status(500).json({ error: message })
  }
}

module.exports = newSellerInfo