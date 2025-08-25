const jwt = require("jsonwebtoken");

// Authenticate user using JWT from cookie
const authenticate = (req, res, next) => {
  console.log("Cookies:", req.cookies);
  const token = req.cookies.token; // read JWT from cookie
  if (!token) return res.status(401).json({ message: "Unauthorized, login required" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid or expired token" });

    // Attach user info to request
    req.user = { id: decoded.id, role: decoded.role };
    next();
  });
};

module.exports = authenticate;
