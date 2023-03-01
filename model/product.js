const newClient = async () => await require("./newClient")();

class  product {
    constructor(
        productId = null,
        productUuid = null,
        businessId = null,
        productName = null,
        productType = null,
        productDescription = null,
        image = null,
        price = null
    ) {
      this.productId = productId;
      this.productUuid = productUuid;
      this.businessId = businessId;
      this.productName = productName;
      this.productType = productType;
      this.productDescription = productDescription;
      this.image = image;
      this.price = price;
    }
  }

    class ProductManager {
    static getAllProducts = async () => {
        const pgClient = await newClient();
        const queryRes = await pgClient.query (
         "SELECT * FROM products"
        );
        pgClient.end();  
        return queryRes.rows;
    };

    static getProduct = async (productUuid) => {
        const pgClient = await newClient();
        const queryRes = await pgClient.query (
            "SELECT * FROM products WHERE product_uuid = ($1)", [productUuid]
        );
        pgClient.end();  
        return queryRes.rows;
    };

    static updateProduct = async (changeProduct) =>{
        const pgClient = await newClient ();
        const queryRes = await pgClient.query (
            "UPDATE products SET product_name= $1, product_type= $2, price= $3  WHERE product_uuid=$4", [changeProduct.productName, changeProduct.productType, changeProduct.price, changeProduct.productUuid]
        );
        pgClient.end(); 
        if(!queryRes){
            return null;
        }
        return queryRes.rows;
    }; 

    static createNewProduct = async (newProduct) => {
        const pgClient = await newClient();
        const queryRes = await pgClient.query (
            "INSERT INTO products (product_uuid, business_id, product_name, product_type, product_description, image, price) VALUES (($1), ($2), ($3), ($4), ($5), ($6), ($7)) RETURNING*",
            [newProduct.productUuid, newProduct.businessId, newProduct.productName, newProduct.productType, newProduct.productDescription, newProduct.image, newProduct.price]
        );
        pgClient.end();  
        return queryRes.rows[0];    
    };
    
  }

  module.exports = ProductManager;