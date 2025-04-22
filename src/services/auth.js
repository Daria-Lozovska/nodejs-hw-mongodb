import bcrypt from "bcryptjs";
import createError from "http-errors";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Session from "../models/session.js";
import { createTokens } from "../utils/tokens.js";

const { REFRESH_SECRET } = process.env; 

export const register = async ({ name, email, password }) => {
  const userExists = await User.findOne({ email });
  if (userExists) throw createError(409, "Email in use");

  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashPassword });
  return user;
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw createError(401, "Email or password is wrong");
  }

  await Session.deleteMany({ userId: user._id });

  const { accessToken, refreshToken, accessTokenValidUntil, refreshTokenValidUntil } =
    createTokens(user._id);

  await Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });

  return { accessToken, refreshToken };
};

export const refresh = async (token) => {
  const payload = jwt.verify(token, REFRESH_SECRET);
  const session = await Session.findOne({ refreshToken: token });
  if (!session) throw createError(401, "Invalid session");

  const userId = payload.userId;
  await Session.deleteMany({ userId });

  const { accessToken, refreshToken, accessTokenValidUntil, refreshTokenValidUntil } =
    createTokens(userId);

  await Session.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });

  return { accessToken, newRefreshToken: refreshToken };
};

export const logout = async (refreshToken) => {
  await Session.deleteOne({ refreshToken });
};
