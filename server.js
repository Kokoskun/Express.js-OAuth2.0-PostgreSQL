require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const server = express();
const rateLimit = require("express-rate-limit");
const routes = require("./src/routes");

// Import middlewares
const middlewares = require("./src/middlewares");

// Import environments
const env = process.env.NODE_ENV || "production";

// rate-limiter should be applied to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
//  apply to all requests
server.use(limiter);

const corsOptions = {
  origin: "http://localhost:8081"
};
server.use(cors(corsOptions));

// parse requests of content-type - application/json
server.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: true }));

const db = require("./src/models");
db.sequelize.sync();

// route
server.use("/", routes);

server.use(middlewares.errorHandler);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Service is listening on Port ${PORT} as ${env} mode`);
});
