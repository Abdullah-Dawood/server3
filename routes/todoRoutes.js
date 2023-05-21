const express = require("express");
const {
  addTask,
  getTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
} = require("../controller/todoController");
const router = express.Router();

router.post("/addTask", addTask);

router.get("/getTasks/:userId", getTask);

router.patch("/updateTask/:_id", updateTask);

router.patch("/updateTaskStatus/:_id", updateTaskStatus);

router.delete("/deleteTask/:_id", deleteTask);

module.exports = router;
