const express = require("express");
const homeRoute = express.Router();
const { checkUserLogin } = require("../middleware/authMiddleware");
const jwt = require("jsonwebtoken");

homeRoute.get("/", checkUserLogin,(req, res) => {
  const user = req.user || null;

  res.render("home", {
    user,
    name: user ? (user.username || user.email) : "Khách"
  });
});

module.exports = homeRoute;
