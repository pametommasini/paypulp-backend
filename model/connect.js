const { Client } = require("pg");
require("dotenv").config();

// run file to check connection
(async () => {
  const connectionData = {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE_V2,
  };
  const newClient = new Client(connectionData);
  await newClient.connect();
  console.log(newClient)
  const res = await newClient.query("SELECT $1::text as connected", [
    "Connection to postgres successful!",
  ]);
  await newClient.end();
})();
