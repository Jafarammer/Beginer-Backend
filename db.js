const Pool = require("pg").Pool;
const connection = new Pool({
  user: "jafarammer",
  host: "localhost",
  database: "sweet_food",
  password: "admin",
  port: 5432,
});
module.exports = connection;
