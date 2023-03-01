const  UserManager = require("../../model/user");

const deleteUser = async (req, res) => {
    const dbRes = await UserManager.deleteUser(req.params.userUuid);
    if(dbRes.rows.length === 0){
      return res.status(401).json("User not found!").end();
    }
    res.status(204).json(dbRes);
  }
  
  module.exports = deleteUser;
