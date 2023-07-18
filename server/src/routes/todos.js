const express = require("express");
const router = express.Router();
const TodoController = require("../controllers/todoController.js");
const { authentication, authorization } = require("../middlewares/auth.js");

router.get("/", authentication, TodoController.getAllTodo);
router.get("/:id", authentication, TodoController.getTodoById);
router.post("/", authentication, TodoController.createTodo);
router.put("/:id", authentication, authorization, TodoController.updateTodo);
router.delete("/:id", authentication, authorization, TodoController.deleteTodo);

module.exports = router;
