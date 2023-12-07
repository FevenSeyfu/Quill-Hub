import mongoose from "mongoose";

const sprintSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  duration: { type: Number, required: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});

export const Sprint = mongoose.model("Sprint", sprintSchema);
