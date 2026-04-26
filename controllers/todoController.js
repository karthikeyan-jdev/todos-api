import connectDB from "../config/db.js";
import { todoModel } from "../models/todo.js";

//post
export const postTodos = async (req, res) => {
  await connectDB();

  const { title, description } = req.body;
  // const  age  = parseInt(req.body.age);??
  try {
    // const newTodo = new todoModel({ title, description });
    // await newTodo.save();
    const newTodo = await todoModel.create({
      title,
      description,
      user: req.user.id,
    });

    res.status(201).json(newTodo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to create todo" });
  }
};

//get
export const getTodos = async (req, res) => {
  try {
    await connectDB();

    const todos = await todoModel.find({ user: req.user.id });
    res.json(todos);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

//update
export const updateTodos = async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;
  await connectDB();

  try {
    const updatedTodo = await todoModel.findByIdAndUpdate(
      { _id: id, user: req.user.id },
      { title, description },
      { new: true },
    );
    if (!updatedTodo) {
      res.status(404).json({ error: "Todo not found" });
    }
    res.json(updatedTodo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update todo" });
  }
};

//delete
export const deleteTodos = async (req, res) => {
  const { id } = req.params;
  try {
    await connectDB();

    const deletedTodo = await todoModel.findByIdAndDelete({
      _id: id,
      user: req.user.id,
    });
    if (!deletedTodo) {
      res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json({
      message: "Todo deleted successfully",
      data: deletedTodo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete todo" });
  }
};
