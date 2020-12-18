const express = require("express");
const users = require("../../../../components/v1/user/user.controller.js");

const router = express.Router();
// Create a new User
router.post("/", users.create);

// Retrieve all User
router.get("/", users.findAll);

// Retrieve a single User with id
router.get("/:id", users.findOne);

// Update a User with id
router.put("/:id", users.update);

// Delete a Tutorial with id
router.delete("/:id", users.delete);

// Create a new User
router.delete("/", users.deleteAll);
module.exports = router;
