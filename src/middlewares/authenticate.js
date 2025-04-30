import jwt from "jsonwebtoken";
import createError from "http-errors";

const { ACCESS_SECRET } = process.env;

export default (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.replace("Bearer ", "");
    if (!token) throw createError(401, "Not authorized");

    const payload = jwt.verify(token, ACCESS_SECRET);
    req.user = { _id: payload.userId };
    next();
  } catch (err) {
    next(createError(401, "Invalid or expired token"));
  }
};
