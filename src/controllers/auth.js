import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createError from "http-errors";
import User from "../models/user.js";

const { ACCESS_SECRET, REFRESH_SECRET } = process.env;

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) throw createError(409, "Email already in use");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ status: 201, message: "User registered", data: { id: newUser._id } });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw createError(401, "Email or password is wrong");
    }

    const payload = { userId: user._id };
    const accessToken = jwt.sign(payload, ACCESS_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });

    res.status(200).json({ status: 200, message: "Login successful", data: { accessToken, refreshToken } });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  res.status(204).json({ message: "Logged out successfully" });
};

export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw createError(401, "Refresh token required");

    const payload = jwt.verify(refreshToken, REFRESH_SECRET);
    const accessToken = jwt.sign({ userId: payload.userId }, ACCESS_SECRET, { expiresIn: "15m" });

    res.status(200).json({ accessToken });
  } catch (err) {
    next(createError(401, "Invalid or expired refresh token"));
  }
};
