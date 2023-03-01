const  ProductManager = require("../../model/product");

const getAllProducts = async (req, res) => {
    const dbRes = await ProductManager.getAllProducts();
    if(dbRes.rows.length === 0){
      return res.status(401).json("Product not found!").end();
    }
    res.status(200).json(dbRes);
  }
  
  module.exports = getAllProducts;