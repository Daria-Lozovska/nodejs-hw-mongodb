const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: 500, message: err.message });
};

export default errorHandler;
