import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import Session from '../models/session.js';
import { generateAccessToken, generateRefreshToken } from '../utils/tokens.js';

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });

    res.status(201).json({ status: 201, message: 'User registered successfully', data: { userId: user._id } });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    const session = await Session.create({ userId: user._id, refreshToken });

    res
      .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
      .cookie('sessionId', session._id.toString(), { httpOnly: true, sameSite: 'strict' })
      .status(200)
      .json({
        status: 200,
        message: 'Successfully logged in an user!',
        data: { accessToken },
      });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    const sessionId = req.cookies.sessionId;
    if (!sessionId) return res.status(400).json({ message: 'No session ID provided' });

    await Session.findByIdAndDelete(sessionId);

    res.clearCookie('refreshToken').clearCookie('sessionId').status(204).send();
  } catch (err) {
    next(err);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.status(401).json({ message: 'No refresh token provided' });

    const session = await Session.findOne({ refreshToken });
    if (!session) return res.status(403).json({ message: 'Invalid session' });

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const accessToken = generateAccessToken(decoded.userId);

    res.status(200).json({
      status: 200,
      message: 'Access token refreshed successfully',
      data: { accessToken },
    });
  } catch (err) {
    next(err);
  }
};
