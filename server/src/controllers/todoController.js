const prisma = require("../helpers/prisma.js");

class TodoController {
  static getAllTodo = async (req, res, next) => {
    const DEFAULT_LIMIT = 5;
    const DEFAULT_PAGE = 1;
    try {
      let { limit, page } = req.query;
      limit = limit ? limit : DEFAULT_LIMIT;
      page = page ? page : DEFAULT_PAGE;

      const offset = (+page - 1) * +limit;

      const count = await prisma.Todo.count({ where: { userId: req.loggedUser.id } });
      const todo = await prisma.Todo.findMany({
        where: { userId: req.loggedUser.id },
        take: +limit,
        skip: offset,
        orderBy: {
          id: "asc"
        }
      });

      res.status(200).json({ data: todo, currentPage: +page, totalPages: Math.ceil(count / +limit) });
    } catch (err) {
      next(err);
    }
  };

  static getTodoById = async (req, res, next) => {
    const { id } = req.params;
    try {
      const todo = await prisma.Todo.findUnique({ where: { id: +id, userId: req.loggedUser.id } });
      if (!todo) {
        return next({ name: "ErrorNotFound" });
      }
      res.status(200).json(todo);
    } catch (err) {
      next(err);
    }
  };

  static createTodo = async (req, res, next) => {
    const { title, description, dueDate, dueTime } = req.body;

    try {
      const todo = await prisma.Todo.create({
        data: {
          title,
          description,
          dueDate,
          dueTime,
          userId: +req.loggedUser.id
        }
      });

      res.status(201).json({ msg: "Created Todo Successfully", data: todo });
    } catch (err) {
      next(err);
    }
  };

  static updateTodo = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, description, dueDate, dueTime } = req.body;

      const todo = await prisma.Todo.update({
        where: { id: +id },
        data: {
          title,
          description,
          dueDate,
          dueTime
        }
      });

      res.status(201).json({ msg: "Updated Successfully", data: todo });
    } catch (err) {
      next(err);
    }
  };

  static updateStatusTodo = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const todo = await prisma.Todo.update({
        where: { id: +id },
        data: {
          status
        }
      });

      res.status(201).json({ msg: "Updated Successfully", data: todo });
    } catch (err) {
      next(err);
    }
  };

  static deleteTodo = async (req, res, next) => {
    try {
      const { id } = req.params;

      await prisma.Todo.delete({ where: { id: +id } });

      res.status(200).json({ msg: "Deleted Successfully" });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = TodoController;
