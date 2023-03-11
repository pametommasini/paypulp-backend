const newClient = async () => await require("./newClient")();

class User {
  constructor(
    userId = null,
    userUuid = null,
    email = null,
    accountType = null,
    password = null,
  ) {
    this.userId = userId;
    this.userUuid = userUuid;
    this.email = email;
    this.accountType = accountType;
    this.password = password;
  }
}

const dataToUser = (dbData) => {
  const user = new User(
    (userId = dbData.user_id),
    (userUuid = dbData.user_uuid),
    (email = dbData.email),
    (accountType = dbData.account_type),
    (password = dbData.password),
  );
  return user;
};

class UserManager {
    static getUserByEmail = async (email) => {
      const pgClient = await newClient();
      try {
        const dbClient = await pgClient.query(
          "SELECT * FROM users WHERE email = ($1)",
          [email]
        );
        pgClient.end();
        if (dbClient.rows.length === 0) return
        const user = dataToUser(dbClient.rows[0])
        console.log(user)
        return user;
      } catch (error) {
        return error;
      }
    };

  // static getAllUsers = async () => {
  //   const pgClient = await newClient();
  //   const queryRes = await pgClient.query("SELECT * FROM users");
  //   pgClient.end();
  //   return queryRes.rows;
  // };

  // static getUser = async (userUuid) => {
  //   const pgClient = await newClient();
  //   const queryRes = await pgClient.query(
  //     "SELECT * FROM users WHERE user_uuid = ($1)",
  //     [userUuid]
  //   );
  //   pgClient.end();
  //   return queryRes.rows;
  // };

  static deleteUser = async (userUuid) => {
    const pgClient = await newClient();
    const queryRes = await pgClient.query(
      "DELETE FROM users WHERE user_uuid = ($1)",
      [userUuid]
    );
    pgClient.end();
    return queryRes.rows;
  };
}

module.exports = { User, UserManager };
