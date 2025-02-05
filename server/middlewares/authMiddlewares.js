const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = (roles) => {
  return async (req, res, next) => {
    try {
      let token = req.headers.authorization;

      if (!token) {
        return res
          .status(401)
          .json({ message: "Authorization token is required!" });
      }

      if (token && token.startsWith("Bearer")) {
        // token = token.slice(7);
        token = token.split(" ")[1];
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ message: "you do not have access!" });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

module.exports = authMiddleware;
