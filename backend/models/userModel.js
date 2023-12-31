import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    profileImage: { type: String },
    userName: { type: String, required: true , unique :true},
    email: { type: String, required: true, unique :true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
