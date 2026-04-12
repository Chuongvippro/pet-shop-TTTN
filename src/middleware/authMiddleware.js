const jwt = require("jsonwebtoken");
const connection = require("../config/db");

function authMiddleware(req, res, next) {
  const token = req.cookies?.accessToken;
  if (!token) {
    return res.status(401).json({ message: "Chưa đăng nhập" });
  }

  try {
    const payload = jwt.verify(token, process.env.ACCESS_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token hết hạn hoặc không hợp lệ" });
  }
}

function checkUserLogin(req, res, next) {
  const token = req.cookies?.accessToken;
  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const payload = jwt.verify(token, process.env.ACCESS_SECRET);
    req.user = payload;
  } catch (err) {
    req.user = null;
  }

  next();
}

function isAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: "Chưa đăng nhập" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Không có quyền" });
  }

  next();
}

module.exports = { authMiddleware, checkUserLogin, isAdmin };
