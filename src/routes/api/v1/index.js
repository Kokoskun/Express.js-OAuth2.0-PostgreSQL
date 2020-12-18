const express = require("express");
const user = require("./user");
const tokens = require("../../../components/v1/token/token.controller.js");
const middlewareToken = require("../../../middlewares/token");
const router = express.Router();
router.use("/user", middlewareToken.verify, user);
router.post("/token", tokens.sign);
module.exports = router;
