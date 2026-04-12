const express = require("express");
const authRoute = express.Router();
const { authMiddleware, checkUserLogin } = require("../middleware/authMiddleware");

const connection = require("../config/db");
const refreshRepo = require("../repo/refresh.repo");
const authService = require("../service/auth.service");
const authController = require("../controller/auth.controller");

const refresh_repo = new refreshRepo(connection);
const auth_service = new authService(refresh_repo);
const auth_controller = new authController(auth_service);

authRoute.post("/refresh", auth_controller.refreshToken);
authRoute.get("/me", authMiddleware, auth_controller.me);

module.exports = authRoute;