import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import models
import { User } from "../models/userModels.sj";

const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET;

export const registerUser = async (req, res) => {
  try {
    const { username, firstName, lastName, birthDate, email, password, role } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email." });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = new User({
      username,
      firstName,
      lastName,
      birthDate,
      email,
      password: hashedPassword,
      role,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// login users
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, jwtSecret, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// list all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// get users by id
export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error getting user by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// update or edit user profile
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const {
      username,
      firstName,
      lastName,
      birthDate,
      profileImage,
      email,
      password,
      role,
    } = req.body;

    // Check if the user exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update user fields
    existingUser.username = username;
    existingUser.firstName = firstName;
    existingUser.lastName = lastName;
    existingUser.birthDate = birthDate;
    existingUser.profileImage = profileImage;
    existingUser.email = email;
    existingUser.role = role;

    // Hash and update the password if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      existingUser.password = hashedPassword;
    }

    // Save the updated user
    await existingUser.save();

    res.status(200).json({ message: "User updated successfully." });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// delete user profile
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if the user exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // Delete the user
    await existingUser.remove();

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
