const  ProductManager = require("../../model/product");

const getAllProducts = async (req, res) => {
    const dbRes = await ProductManager.getAllProducts();
    res.status(200).json(dbRes);
  }
  
  module.exports = getAllProducts;