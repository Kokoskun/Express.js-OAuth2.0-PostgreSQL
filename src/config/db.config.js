// If migration not found
if (!process.env.DB_DIALECT) {
  require("dotenv").config({ path: "../../.env" });
}
const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  db: process.env.DB_DATABASE_NAME,
  dialect: process.env.DB_DIALECT,
  logging: process.env.NODE_ENV === "local" ? true : false,
  pool: {
    max: 10,
    min: 2
  }
};

module.exports = config;
