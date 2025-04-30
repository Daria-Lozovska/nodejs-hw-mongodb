import bcrypt from "bcryptjs";
import createError from "http-errors";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const register = async ({ name, email, password }) => {
  const userExists = await User.findOne({ email });
  if (userExists) throw createError(409, "Email in use");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword }); // password
  return user;
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw createError(401, "Email or password is wrong");
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  user.token = token;
  await user.save();

  return { token };
};
