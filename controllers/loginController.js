const jwt = require('jsonwebtoken');
const newClient = require("../model/newClient");
const CryptoJS = require("crypto-js");

const loginController = async (req, res) => {
  const client = await newClient();
  const { email, password } = req.body;
  const md5Password = CryptoJS.MD5(password).toString();
  const dbClient = await client.query("SELECT * FROM users WHERE email = ($1)", [email]);
  const userEmail = dbClient.rows[0].email;
  const userUuid = dbClient.rows[0].user_uuid;
  const accountType = dbClient.rows[0].account_type;
  const dbRes = await client.query("SELECT first_name FROM paypulp_costumers WHERE user_uuid = ($1);", [userUuid]);
  if(dbClient.rows.length === 0){
    return res.status(401).json("User not found!").end();
  }
  const dbPassword = dbClient.rows[0].password;
  if( email != dbClient.rows[0].email || md5Password != dbPassword ){
    return res.status(401).json("Invalid user or password!").end();
  }
  const token = jwt.sign({ email }, process.env.SECRET, {
    algorithm: 'HS256',
    expiresIn: 3000
  })
  res.json({token, dbRes, userUuid, userEmail, accountType, });
}
module.exports = loginController;