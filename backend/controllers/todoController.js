import asyncHandler from "express-async-handler";
import Todo from "../models/todoModel.js";
import sanitize from "mongo-sanitize";

const getTodos = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user; // Assuming req.user is set by authentication middleware
    const data = await Todo.findOne({ user: sanitize(_id) });

    if (data) {
      res.status(200).json({
        _id: data._id,
        todos: data.todos.length > 0 ? data.todos : [],
      });
    } else {
      res.status(200).json({ todos: [] });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

const createTodo = asyncHandler(async (req, res) => {
  const { title, description, status } = req.body;
  const { _id } = req.user;

  if (!title) {
    res.status(400);
    throw new Error("Title is required");
  }

  const todoList = await Todo.findOne({ user: sanitize(_id) });

  if (todoList) {
    todoList.todos.push({
      title,
      description,
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await todoList.save();
    res.status(201).json(todoList);
  } else {
    const newTodoList = new Todo({
      user: _id,
      todos: [
        {
          title,
          description,
          status,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    });

    const createdTodoList = await newTodoList.save();
    res.status(201).json(createdTodoList);
  }
});

const updateTodo = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { todoId, title, description, status } = req.body;

  const todoList = await Todo.findOne({ user: sanitize(_id) });

  if (todoList) {
    const todo = todoList.todos.id(todoId);

    if (todo) {
      todo.title = title || todo.title;
      todo.description = description || todo.description;
      todo.status = status !== undefined ? status : todo.status;
      todo.updatedAt = new Date();

      await todoList.save();
      res.status(200).json(todo);
    } else {
      res.status(404);
      throw new Error("Todo not found");
    }
  } else {
    res.status(404);
    throw new Error("Todo list not found");
  }
});

const deleteTodo = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const todoId = req.params.id;

  const todoList = await Todo.findOne({ user: sanitize(_id) });

  if (todoList) {
    const todo = todoList.todos.id(todoId);

    if (todo) {
      todo.remove();
      await todoList.save();
      res.status(200).json({ message: "Todo removed" });
    } else {
      res.status(404);
      throw new Error("Todo not found");
    }
  } else {
    res.status(404);
    throw new Error("Todo list not found");
  }
});

export { getTodos, createTodo, updateTodo, deleteTodo };
