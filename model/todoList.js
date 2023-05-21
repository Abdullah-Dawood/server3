const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoListSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    taskName: { type: String, required: true },
    priority: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

todoListSchema.statics.addTasks = async function (
  userId,
  taskName,
  priority,
  dueDate
) {
  if (!userId || !taskName || !priority || !dueDate) {
    throw new Error("All fields are required!");
  }
  dueDate = new Date(dueDate);
  const task = await this.create({
    userId,
    taskName,
    priority,
    dueDate,
  });
  if (!task) {
    throw new Error("Error creating new task!");
  }
  return task;
};

todoListSchema.statics.getTasks = async function (userId) {
  const task = await this.find({ userId })
    .sort({ priority: 1 })
    .populate("userId");
  if (!task) {
    throw new Error("Error creating new task!");
  }
  return task;
};

todoListSchema.statics.updateTasks = async function (
  _id,
  taskName,
  priority,
  dueDate
) {
  if (!_id) {
    throw new Error("Id is required!");
  }
  dueDate = new Date(dueDate);
  const task = await this.find({ _id }).updateOne({
    $set: { taskName, priority, dueDate },
  });

  if (!task) {
    throw new Error("Error creating new task!");
  }
  return task;
};
todoListSchema.statics.updateTaskStatus = async function (_id, userId) {
  if (!_id) {
    throw new Error("Id is required!");
  }
  const task = await this.find({ _id }).updateOne({
    $set: { status: "done" },
  });

  const newtask = await this.find({ userId }).sort({ priority: 1 });
  if (!task) {
    throw new Error("Error creating new task!");
  }
  return newtask;
};

todoListSchema.statics.deleteTasks = async function (_id) {
  if (!_id) {
    throw new Error("Id is required!");
  }
  const task = await this.findOneAndDelete({ _id });
  if (!task) {
    throw new Error("Error creating new task!");
  }
  return task;
};

module.exports = mongoose.model("TodoList", todoListSchema);
