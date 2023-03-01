const   ProductManager  = require("../model/product");


const updateProduct = async (req, res) => {
    const updateProduct = {
      productUuid : req.params.productUuid,
      productName : req.body.productName,
      productType : req.body.productType,
      price : req.body.price,
    };
    //console.log("hola", updateProduct)
    try {
    const dbRes = await ProductManager.updateProduct(updateProduct);
    //console.log("holii", updateProduct)
    if(dbRes){
   //console.log("pp", dbRes)
      return res.status(200).json(dbRes);
    }
      return res.status(400).send();
    }
    catch (error) {
      return res.status(500).send();
    }
    
  };
  
  module.exports = updateProduct;