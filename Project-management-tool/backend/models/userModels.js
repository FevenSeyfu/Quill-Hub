import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["Product Owner", "Scrum Master", "Development Team"],
    required: true,
  },
});

export const User = mongoose.model("User", userSchema);
