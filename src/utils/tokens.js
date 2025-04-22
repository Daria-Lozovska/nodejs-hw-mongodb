import jwt from "jsonwebtoken";

const { ACCESS_SECRET, REFRESH_SECRET } = process.env;

export const createTokens = (userId) => {
  const accessExpiresIn = "15m";
  const refreshExpiresIn = "30d";

  const accessToken = jwt.sign({ userId }, ACCESS_SECRET, { expiresIn: accessExpiresIn });
  const refreshToken = jwt.sign({ userId }, REFRESH_SECRET, { expiresIn: refreshExpiresIn });

  const accessTokenValidUntil = new Date(Date.now() + 15 * 60 * 1000); // 15m
  const refreshTokenValidUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30d

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  };
};
