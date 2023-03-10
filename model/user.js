/* create new client (connection to db) function */
const newClient = async () => await require("./newClient")();

/* user model */
class User {
  constructor(
    userId = null,
    userUuid = null,
    email = null,
    accountType = null
  ) {
    this.userId = userId;
    this.userUuid = userUuid;
    this.email = email;
    this.accountType = accountType;
  }
}

/**
 * user methods for db queries
 * 1- create new client for db connection
 * 2- send query to db and store response
 * 3- end client
 * 4- return relevant data
 */
class UserManager {
  static getAllUsers = async () => {
    const pgClient = await newClient();
    const queryRes = await pgClient.query("SELECT * FROM users");
    pgClient.end();
    /*console.log(queryRes)*/
        return queryRes.rows;
  };
  
  static getUser = async (userUuid) => {
    const pgClient = await newClient();
    const queryRes = await pgClient.query(
      "SELECT * FROM users WHERE user_uuid = ($1)", [userUuid]
    );
    pgClient.end();
    return queryRes.rows;
  };

  static deleteUser = async (userUuid) => {
    const pgClient = await newClient();
    const queryRes = await pgClient.query(
      "DELETE FROM users WHERE user_uuid = ($1)",
      [userUuid]
    );
    pgClient.end();
    return queryRes.rows;
  };
};

module.exports = UserManager;
