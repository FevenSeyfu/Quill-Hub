import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  profileImage: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["Product Owner", "Scrum Master", "Development Team"],
    required: true,
  },
});

// Hash the password before saving to the database
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  const saltRounds = 10;
  const hash = await bcrypt.hash(user.password, saltRounds);
  user.password = hash;
  next();
});

export const User = mongoose.model("User", userSchema);
