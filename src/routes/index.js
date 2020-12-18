const express = require("express");
const apiVersion1 = require("./api/v1");
const outputResponse = require("../utils/output.response");
const router = express.Router();

router.use("/api/v1", apiVersion1);
router.get("/", (req, res) => {
  return outputResponse.ok(res, { message: "Welcome to PN Service" });
});
// Catch all none existing route
router.use((req, res, next) => {
  if (!req.route) return outputResponse.notFound(res, null, "Route Not Found");
  next();
});

module.exports = router;
