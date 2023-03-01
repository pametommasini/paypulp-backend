const UserDataManager = require('../../model/userData');

const getUserData = async (req, res) => {
    const dbRes = await UserDataManager.getUserData(req.userUuid);
    res.status(200).json(dbRes);
  }
  
  module.exports = getUserData;