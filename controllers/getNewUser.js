const  UserManager = require("../model/user");

const getNewUser = async (req, res) => {
    const dbRes = await UserManager.getNewUser(req.body);
    //console.log(req.body)
    res.status(201).json(dbRes);
  }
  
  module.exports = getNewUser;
