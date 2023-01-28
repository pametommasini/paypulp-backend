const newClient = require("../model/newClient");

const newUser = async (req, res) => {
  try {
    const client = await newClient();
    const queryRes = await client.query(
      "INSERT INTO users (user_uuid, email, account_type) VALUES (($1), ($2), ($3)) RETURNING *",
      [req.body.userUuid, req.body.email, req.body.accountType]
    );
    console.log(queryRes);
    res.status(200).json(queryRes.rows[0]);
  } catch (error) {
      console.error(error);  
  }
};

module.exports = newUser;
