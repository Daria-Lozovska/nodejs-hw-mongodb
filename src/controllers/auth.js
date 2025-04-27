import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createError from "http-errors";
import User from "../models/user.js";

const { ACCESS_SECRET } = process.env;

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) throw createError(409, "Email already in use");

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash });

    res.status(201).json({
      status: 201,
      message: "User registered successfully",
      data: { email: user.email },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) throw createError(401, "Invalid credentials");

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) throw createError(401, "Invalid credentials");

    const token = jwt.sign({ userId: user._id }, ACCESS_SECRET, { expiresIn: "1h" });
    user.token = token;
    await user.save();

    res.status(200).json({
      status: 200,
      message: "Login successful",
      token,
      user: { email: user.email },
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) throw createError(401, "Not authorized");

    user.token = null;
    await user.save();

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const currentUser = async (req, res, next) => {
  try {
    const { email } = req.user;
    res.status(200).json({
      status: 200,
      data: { email },
    });
  } catch (err) {
    next(err);
  }
};
