const jwt = require("jsonwebtoken");
const prisma = require("../helpers/prisma.js");

async function authentication(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const access_token = authHeader.split(" ")[1];
    try {
      const decode = jwt.verify(access_token, process.env.JWT_SECRET);
      const { id, email, avatar } = decode;

      req.loggedUser = {
        id: id,
        email: email,
        avatar: avatar
      };
      next();
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

module.exports = {
  authentication,
  authorization
};
