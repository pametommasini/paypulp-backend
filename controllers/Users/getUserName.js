const UserDataManager = require('../../model/userData');

const getUserName = async (req, res) => {
    const dbRes = await UserDataManager.getUserName(req.params.userUuid);
    res.status(200).json(dbRes);
  }
  
  module.exports = getUserName;