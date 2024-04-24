const { Pool } = require("pg");

const pool = new Pool({
  user: "yourUsername",
  host: "localhost",
  database: "mydatabase",
  password: "yourPassword",
  port: 5432,
});

module.exports = pool;
