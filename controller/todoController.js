const TodoList = require("../model/todoList");

const addTask = async (req, res) => {
  const { userId, taskName, priority, dueDate } = req.body;

  try {
    const task = await TodoList.addTasks(userId, taskName, priority, dueDate);
    res.status(200).json({ task });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
const getTask = async (req, res) => {
  const { userId } = req.params;
  try {
    const task = await TodoList.getTasks(userId);
    res.status(200).json({ task });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const updateTask = async (req, res) => {
  const { _id } = req.params;
  const { taskName, priority, dueDate } = req.body;
  try {
    const task = await TodoList.updateTasks(_id, taskName, priority, dueDate);
    res.status(200).json({ task });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
const updateTaskStatus = async (req, res) => {
  const { _id } = req.params;
  const { userId } = req.body;
  try {
    const task = await TodoList.updateTaskStatus(_id, userId);
    res.status(200).json({ task });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
const deleteTask = async (req, res) => {
  const { _id } = req.params;
  try {
    const task = await TodoList.deleteTasks(_id);
    res.status(200).json({ task });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

module.exports = { addTask, getTask, updateTask, deleteTask, updateTaskStatus };
