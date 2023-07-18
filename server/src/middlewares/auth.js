const jwt = require("jsonwebtoken");
const prisma = require("../helpers/prisma.js");

async function authentication(req, res, next) {
  const { access_token } = req.headers;

  if (access_token) {
    try {
      const decode = jwt.verify(access_token, process.env.JWT_SECRET);
      const { id, email } = decode;
      const user = await prisma.User.findUnique({ where: { id: +id } });
      if (!user) {
        next({ name: "ErrorNotFound" });
      } else {
        req.loggedUser = {
          id: user.id,
          email: user.email,
          avatar: user.avatar
        };
        next();
      }
    } catch (err) {
      next({ name: "JWTerror" });
    }
  } else {
    next({ name: "Unauthenticated" });
  }
}

async function authorization(req, res, next) {
  const { id, email } = req.loggedUser;
  const todoId = req.params.id;

  const todo = await prisma.Todo.findUnique({ where: { id: +todoId } });
  if (todo) {
    if (id === todo.userId) {
      next();
    } else {
      next({ name: "Unauthorized" });
    }
  } else {
    next({ name: "ErrorNotFound" });
  }
}

async function authorizationUser(req, res, next) {
  const { id } = req.loggedUser;
  const userId = req.params.id;

  const user = await prisma.User.findUnique({ where: { id: +userId } });
  if (user) {
    if (id === user.id) {
      next();
    } else {
      next({ name: "Unauthorized" });
    }
  } else {
    next({ name: "ErrorNotFound" });
  }
}

module.exports = {
  authentication,
  authorization,
  authorizationUser
};
