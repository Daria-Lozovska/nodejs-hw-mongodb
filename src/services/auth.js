import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import Session from '../models/session.js';
import { generateToken } from '../utils/tokens.js';

export const register = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw createHttpError(409, 'Email in use');

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ name, email, password: hashedPassword });

  return { id: newUser._id, name: newUser.name, email: newUser.email };
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw createHttpError(401, 'Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw createHttpError(401, 'Invalid credentials');

  await Session.deleteMany({ userId: user._id });

  const accessToken = generateToken();
  const refreshToken = generateToken();
  const accessTokenValidUntil = new Date(Date.now() + 15 * 60 * 1000);
  const refreshTokenValidUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  await Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });

  return { accessToken, refreshToken };
};

export const refresh = async (refreshToken) => {
  const session = await Session.findOne({ refreshToken });
  if (!session || session.refreshTokenValidUntil < Date.now()) {
    throw createHttpError(401, 'Invalid refresh token');
  }

  await Session.deleteOne({ _id: session._id });

  const accessToken = generateToken();
  const newRefreshToken = generateToken();
  const accessTokenValidUntil = new Date(Date.now() + 15 * 60 * 1000);
  const refreshTokenValidUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  await Session.create({
    userId: session.userId,
    accessToken,
    refreshToken: newRefreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });

  return { accessToken, refreshToken: newRefreshToken };
};

export const logout = async (refreshToken) => {
  await Session.findOneAndDelete({ refreshToken });
};