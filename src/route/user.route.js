const express = require("express");
const { sign } = require("jsonwebtoken");
const userRoute = express.Router();


const connection = require("../config/db");
const refreshRepo = require("../repo/refresh.repo");
const userRepo = require("../repo/user.repo");
const userService = require("../service/user.service");
const userController = require("../controller/user.controller");
const { authMiddleware } = require("../middleware/authMiddleware");

const refresh_repo = new refreshRepo(connection);
const user_repo = new userRepo(connection);
const user_service = new userService(user_repo, refresh_repo);
const user_controller = new userController(user_service);

userRoute.get("/login", (req, res) => {
  res.render("login");
});
userRoute.get("/signIn",(req, res)=>{
    res.render("signIn");
});
userRoute.post("/api/signIn", user_controller.signInUser);
userRoute.post("/login", user_controller.loginUser);
userRoute.post("/logout", user_controller.logOut);

module.exports = userRoute;