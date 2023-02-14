const  ProductManager = require("../model/product");

const createNewProduct = async (req, res) => {
    const dbRes = await ProductManager.createNewProduct(req.body);
    res.status(201).json(dbRes);
  }
  
  module.exports = createNewProduct;