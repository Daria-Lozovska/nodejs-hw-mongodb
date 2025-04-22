import jwt from "jsonwebtoken";
import createError from "http-errors";
import User from "../models/user.js";

const { ACCESS_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const [type, token] = authHeader.split(" ");
    if (type !== "Bearer" || !token) throw createError(401, "Not authorized");

    const decoded = jwt.verify(token, ACCESS_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) throw createError(401, "Invalid token");

    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      next(createError(401, "Access token expired"));
    } else {
      next(createError(401, err.message));
    }
  }
};

export default authenticate;
