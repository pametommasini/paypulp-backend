const  ProductManager = require("../../model/product");

const createNewProduct = async (req, res) => {
    const dbRes = await ProductManager.createNewProduct(req.body);
    res.status(201).json(dbRes);
    if(dbRes.rows.length === 0){
      return res.status(401).json("Insert product failed!").end();
    }
  }
  
  module.exports = createNewProduct;