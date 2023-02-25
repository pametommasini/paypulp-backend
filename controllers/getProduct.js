const  ProductManager = require("../model/product");

const getProduct = async (req, res) => {
    const dbRes = await ProductManager.getProduct(req.params.productUuid);
    res.status(200).json(dbRes);
  }
  
  module.exports = getProduct;