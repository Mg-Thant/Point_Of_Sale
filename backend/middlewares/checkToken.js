const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkToken = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
  
    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided or invalid format",
      });
    }
  
    const token = authHeader.split(" ")[1];
  
    if (!token) {
      return res.status(401).json({
        message: "Token is missing",
      });
    }
    const isMatched = jwt.verify(token, process.env.JWT_KEY);
    req.userId = isMatched.userID;
    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
    return res.status(500).json({
      message: "Internal server error",
    });
  }
  
};

module.exports = checkToken;
