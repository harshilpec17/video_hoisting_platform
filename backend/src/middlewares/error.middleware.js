const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  if (
    err.name === "MongooseServerSelectionError" ||
    err.message?.includes(
      "Could not connect to any servers in your MongoDB Atlas cluster"
    )
  ) {
    return res.status(503).json({ message: "Database Connection Error" });
  }
  res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors || [],
  });
};

export { errorHandler };
