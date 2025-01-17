const jwt = require("jsonwebtoken");
require("dotenv").config();
const authenticate = (req, res, next) => {
  const authorization_header = req.headers.authorization;
  const token = authorization_header?.split(" ")[1];

  jwt.verify(token, process.env.Secret_KEY, function (err, decoded) {
    if (err) {
      res.send("Please Login");
    } else {
      //console.log(decoded)
      const userId = decoded.userId;
      req.userId = userId;
      next();
    }
  });
};
module.exports = { authenticate };
