const prisma = require("../helpers/prisma.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class UserController {
  static register = async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const findUser = await prisma.User.findUnique({
        where: { email: email }
      });

      if (!findUser) {
        const user = await prisma.User.create({
          data: {
            name,
            email,
            password: hashedPassword
          }
        });

        delete user.password;

        res.status(200).json({ message: "Register Successfully.", data: user });
      } else {
        return next({ name: "EmailAlreadyExists" });
      }
    } catch (err) {
      next(err);
    }
  };

  static login = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const findUser = await prisma.User.findUnique({
        where: { email: email }
      });

      if (!findUser) {
        return next({ name: "InvalidEmail" });
      }

      const passwordMatch = await bcrypt.compare(password, findUser.password);
      if (!passwordMatch) {
        return next({ name: "WrongPassword" });
      }

      const token = jwt.sign({ id: findUser.id, email: findUser.email }, process.env.JWT_SECRET);

      delete findUser.password;
      return res.status(200).json({ token, user: findUser });
    } catch (err) {
      next(err);
    }
  };

  static getAllUsers = async (req, res, next) => {
    try {
      const user = await prisma.User.findMany({
        orderBy: {
          id: "asc"
        }
      });

      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };

  static getUserById = async (req, res, next) => {
    const { id } = req.params;

    try {
      const user = await prisma.User.findUnique({ where: { id: +id } });

      if (!user) {
        next({ name: "ErrorNotFound" });
      } else {
        res.json(user);
      }
    } catch (err) {
      next(err);
    }
  };

  static updateUser = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, password } = req.body;
      // const hashedPassword = await bcrypt.hash(password, 10);
      let fileName = "";

      if (req.file === undefined) {
        const existingUser = await prisma.User.findUnique({
          where: { id: +id }
        });
        fileName = existingUser.avatar;

        await prisma.User.update({
          where: { id: +id },
          data: {
            name
          }
        });
      } else {
        const avatar = req.file.path;
        fileName = `http://localhost:4000/${avatar}`;

        await prisma.User.update({
          where: { id: +id },
          data: {
            name,
            avatar: fileName
          }
        });
      }
      res.status(200).json({ msg: "Updated User Successfully." });
    } catch (err) {
      next(err);
    }
  };

  static deleteUser = async (req, res, next) => {
    try {
      const { id } = req.params;
      await prisma.User.delete({ where: { id: +id } });

      res.status(200).json({ msg: `Deleted User with id : ${id} Successfully.` });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = UserController;
