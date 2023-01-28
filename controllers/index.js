// const newClient = require("../model/newClient");

const twoHundred = (req, res) => {
  // const client = newClient();
  // const res = client.query("SELECT * FROM users")
  console.log('working')
  res.status(200).json("Working fine!")
};

module.exports = twoHundred;
