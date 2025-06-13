import mongoose from "mongoose";
import createError from "http-errors";

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(createError(400, "Invalid ID format"));
  }
  next();
};

export default isValidId;
