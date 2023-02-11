const UserManager = require("../model/user");

const getAllUsers = async (req, res) => {
  const dbRes = await UserManager.getAllUsers();
  res.status(200).json(dbRes);
}

module.exports = getAllUsers;