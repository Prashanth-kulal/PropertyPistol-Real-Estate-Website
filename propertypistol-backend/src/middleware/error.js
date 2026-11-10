const ApiError = require("../utils/ApiError");
const env = require("../config/env");

const notFound = (req, _res, next) => next(ApiError.notFound(`Route ${req.method} ${req.originalUrl} not found`));

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, _req, res, _next) => {
  let status = err.status || 500;
  let message = err.message || "Internal server error";
  let details = err.details;

  if (err.name === "ValidationError" && err.errors) {
    status = 400; message = "Validation failed";
    details = Object.values(err.errors).map((e) => ({ field: e.path, message: e.message }));
  } else if (err.name === "CastError") {
    status = 400; message = `Invalid ${err.path}`;
  } else if (err.code === 11000) {
    status = 409; message = "Duplicate value: " + Object.keys(err.keyValue || {}).join(", ");
  }
  if (status >= 500) {
    console.error("[error]", err);
    if (env.isProd) message = "Internal server error";
  }
  res.status(status).json({ success: false, message, ...(details ? { details } : {}) });
};

module.exports = { notFound, errorHandler };
