import jwt from "jsonwebtoken";

const { ACCESS_SECRET, REFRESH_SECRET } = process.env;

export const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, ACCESS_SECRET, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (userId, sessionId) => {
  return jwt.sign({ userId, sessionId }, REFRESH_SECRET, {
    expiresIn: "7d",
  });
};
