const { Client } = require("pg");
require("dotenv").config();

// run file to check connection
const funct1 = async () => {
  const connectionData = {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
  };
  const newClient = new Client(connectionData);
  await newClient.connect();
  const res = await client.query("SELECT $1::text as connected", [
    "Connection to postgres successful!",
  ]);
  console.log(res.rows[0].connected);
  await newClient.end();
};

funct1();
