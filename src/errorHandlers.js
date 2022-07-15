export const notFoundHandler = (req, res, next) => {
  res.status(404); // set status code to 404
  next(new Error("route not found!❌")); // send to error handler
};

export const errorHandler = (err, req, res, next) => {
  // set status code to 500 if its 200 or if its not set
  if (res.statusCode === 200 || !res.statusCode) res.status(500);
  res.json({ message: err.message });
};
