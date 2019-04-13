module.exports = throwError = (code, errorType, errorMessage) => error => {
  if (!error) error = new Error(errorMessage || "Default Error");
  if (errorMessage) error.message = errorMessage || "Default Error";
  error.code = code || error.errorCode || error.code || 400;
  error.errorType = errorType || error.errorType || "Default Error Type";
  throw error;
};

module.exports = throwIf = (fn, code, errorType, errorMessage) => result => {
  if (fn(result)) {
    return throwError(code, errorType, errorMessage)();
  }
  return result;
};

module.exports = sendSuccess = (res, message) => data => {
  res.status(200).json({ type: "success", message, data });
};

module.exports = returnResults = () => data => {
  return data;
};

module.exports = sendError = (res, code, message) => error => {
  try {
    res.status(code || error.code).json({
      type: "error",
      message: message || error.message,
      error
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      type: "error",
      message: "Issue in Error Handling",
      err
    });
  }
};
