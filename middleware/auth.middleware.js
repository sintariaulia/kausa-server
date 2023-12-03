const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  verifyToken: (req, res, next) => {
    const authHeader = req.headers['authorization'];  // get token headers JWT
    const token = authHeader && authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET;
    // check token
    if (!token) {
      return res.status(401).json({ message: 'Access denied. Please Login To Your Account!' });
    }
    // verify token
    jwt.verify(token, secret, (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Unauthorized - Invalid token.' });
      req.user = decoded;
      next();
    });
  },
  authorizeRoles: (roles) => {
    // role : admin, kasir, user
    return (req, res, next) => {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];
      const secret = process.env.JWT_SECRET;
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }
      try {
        const decoded = jwt.verify(token, secret);
        const { role } = decoded;
        if (!roles.includes(role)) {
          return res.status(403).json({ message: "Unauthorized" });
        }
        req.user = decoded; // Menyimpan data user pada objek req
        next();
      } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Invalid token" });
      }
    };
  },
};