const { Client } = require("pg");
require("dotenv").config();

getClient = async () => {
  const connectionData = {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
  };
  const newClient = new Client(connectionData);
  await newClient.connect();
  return newClient;
};

module.exports = getClient;
