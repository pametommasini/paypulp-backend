const UserManager = require("../model/user");

const getUser = async (req, res) => {
  const dbRes = await UserManager.getUser(req.params.userUuid);
  res.status(200).json(dbRes);
}

module.exports = getUser;