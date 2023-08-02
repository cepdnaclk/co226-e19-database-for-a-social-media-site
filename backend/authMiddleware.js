const jwt = require("jsonwebtoken");
const secret = require("./JWTconfig");

// Middleware to check if the token is valid
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, secret.secreteKey); // Replace with your secret key

    // Attach the decoded payload to the request object for later use
    req.user = decoded;

    next(); // Proceed to the next middleware
  } catch (err) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = verifyToken;
