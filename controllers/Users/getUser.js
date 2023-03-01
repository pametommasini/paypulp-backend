const UserManager = require("../../model/user");

const getUser = async (req, res) => {
  const dbRes = await UserManager.getUser(req.params.userUuid);
  if(dbRes.rows.length === 0){
    return res.status(401).json("User not found!").end();
  }
  res.status(200).json(dbRes);
}

module.exports = getUser;