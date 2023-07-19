const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController.js");
const upload = require("../../upload");
const { authentication } = require("../middlewares/auth.js");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.put("/:id", authentication, upload.single("avatar"), UserController.updateUser);
router.delete("/:id", authentication, UserController.deleteUser);

module.exports = router;
