const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController.js");
const upload = require("../../upload");
const { authentication, authorizationUser } = require("../middlewares/auth.js");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.put("/:id", authentication, authorizationUser, upload.single("avatar"), UserController.updateUser);
router.delete("/:id", authentication, authorizationUser, UserController.deleteUser);

module.exports = router;
