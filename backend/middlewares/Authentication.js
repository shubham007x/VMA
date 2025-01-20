const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware to authenticate users using JWT tokens
const authenticate = (req, res, next) => {
  // Extract authorization header from the request
  const authorization_header = req.headers.authorization;
  
  // Split the header to get the token (assuming format "Bearer <token>")
  const token = authorization_header?.split(" ")[1];

  // If token is missing, send an error response
  if (!token) {
    return res.status(401).json({ msg: "Authorization token is required" });
  }

  // Verify the token using the secret key
  jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    // If token is invalid or expired, send an error response
    if (err) {
      return res.status(401).json({ msg: "Invalid or expired token" });
    } else {
      // If valid, attach the userId to the request object for further processing
      req.userId = decoded.userId;
      next(); // Proceed to the next middleware or route handler
    }
  });
};

module.exports = { authenticate }; // Export the middleware to use in routes
