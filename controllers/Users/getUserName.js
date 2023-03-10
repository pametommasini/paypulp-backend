const UserDataManager = require('../../model/userData');

const getUserName = async (req, res) => {
    const dbRes = await UserDataManager.getUserName(req.params.userUuid);
    if(dbRes.rows?.length === 0){
      return res.status(401).json("User not found!").end();
    }
    res.status(200).json(dbRes);
  }
  
  module.exports = getUserName;