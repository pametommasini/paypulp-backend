const jwt = require('jsonwebtoken');
const newClient = require("../model/newClient");
const CryptoJS = require("crypto-js");
const MD5 = require("crypto-js/md5");


const loginController = async (req, res) => {
  const client = await newClient();
  const { email, password } = req.body;
  const md5Password = CryptoJS.MD5(password).toString();
  const dbClient = await client.query("SELECT * FROM users WHERE email = ($1)", [email]);
  if(dbClient.rows.length === 0){
    return res.status(401).end();
  }
  const dbPassword = dbClient.rows[0].password;
  if( email != dbClient.rows[0].email || md5Password != dbPassword ){
    return res.status(401).end();
  }
  const token = jwt.sign({ email }, process.env.SECRET, {
    algorithm: 'HS256',
    expiresIn: 3000
  })  
  res.json({token})
}
module.exports = loginController;