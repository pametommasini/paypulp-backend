const UserDataManager = require('../../model/userData');

const getUserData = async (req, res) => {
  try {
    const dbRes = await UserDataManager.getUserData(req.userUuid);
    res.status(200).json(dbRes);
  } catch (error) {
    console.error('error',error)
    return res.status(400).json(error);
  }
  }
  
  module.exports = getUserData;