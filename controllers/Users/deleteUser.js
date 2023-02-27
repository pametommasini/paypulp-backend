const  UserManager = require("../../model/user");

const deleteUser = async (req, res) => {
    const dbRes = await UserManager.deleteUser(req.params.userUuid);
    //console.log(req.body)
    res.status(204).json(dbRes);
  }
  
  module.exports = deleteUser;
