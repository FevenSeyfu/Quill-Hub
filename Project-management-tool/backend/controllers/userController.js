import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import models
import { User } from "../models/userModels.js";

const saltRounds = 10;

export const registerUser = async (req, res) => {
  try {
    const {
      username,
      firstName,
      lastName,
      birthDate,
      email,
      password,
      role,
      isAdmin,
    } = req.body;

    // first check if admin
    const requesterIsAdmin = req.user && req.user.isAdmin;
    // if admin allow to assign role
    if (isAdmin && !requesterIsAdmin) {
      return res.status(403).json({ message: "Only admins can assign roles." });
    }
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
    const user = await User.create(newUser);
        return res.status(201)
        .json({
            message:'User registered Successfully!',success: true, 
            user:user,
            token: generateToken(user._id)
        });
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
    res.status(201).json({
        id:user._id,
        username:user.username,
        firstName:user.firstName,
        lastName:user.lastName,
        birthDate:user.birthDate,
        email:user.email,
        role:user.role,
        token: generateToken(user._id),
        message:'Signed in Successfully!',success: true,
    });
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
      isAdmin,
    } = req.body;
    // check if admin
    const requesterIsAdmin = req.user && req.user.isAdmin || req.user.role === 'admin';
    //check if requester is logged in user
    const updatingOwnProfile = req.user && req.user._id.toString() === userId;

    // only allow admins to change role and user can only update their own profile
    if ((isAdmin || role) && !requesterIsAdmin && !updatingOwnProfile) {
      return res
        .status(403)
        .json({ message: "Permission denied to update roles." });
    }

    // Check if the user exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found." });
    }

   // Update specific fields using Mongoose's update method
   const updateFields = {};
   if (username) updateFields.username = username;
   if (firstName) updateFields.firstName = firstName;
   if (lastName) updateFields.lastName = lastName;
   if (birthDate) updateFields.birthDate = birthDate;
   if (profileImage) updateFields.profileImage = profileImage;
   if (email) updateFields.email = email;
   if (role) updateFields.role = role;

    // Hash and update the password if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      existingUser.password = hashedPassword;
    }

    // updated user
    await User.updateOne({ _id: userId }, { $set: updateFields });


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

    // Check if the requester is an admin
    const requesterIsAdmin = req.user && req.user.isAdmin;

    // Check if the user being deleted is the requester
    const deletingOwnProfile = req.user && req.user._id.toString() === userId;

    // Only allow admins to delete users, and users to delete their own profiles
    if (!requesterIsAdmin && !deletingOwnProfile) {
      return res.status(403).json({ message: 'Permission denied to delete user.' });
    }

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

// Generate Token

const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '30d',
    })
}