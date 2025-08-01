// cors-middleware.js
module.exports = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE"); // Supported HTTP methods
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // Handle preflight requests (important for CORS)
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
};
