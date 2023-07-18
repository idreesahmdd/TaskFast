const express = require("express");
const router = express.Router();
const userRouter = require("./users.js");
const todoRouter = require("./todos.js");

router.use("/users", userRouter);
router.use("/todos", todoRouter);

module.exports = router;
