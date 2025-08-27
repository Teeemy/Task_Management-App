const jwt = require("jsonwebtoken");

// Authenticate user using JWT from cookie
const authenticate = (req, res, next) => {
  try {
    const token = req.cookies.token; // read JWT from cookie

    if (!token) {
      return res.status(401).json({ message: "Unauthorized, login required" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }

      // Attach user info to request
      req.user = { id: decoded.id, role: decoded.role || "user" };
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = authenticate;

