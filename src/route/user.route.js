const express = require("express");
const { sign } = require("jsonwebtoken");
const userRoute = express.Router();
//user
const connection = require("../config/db");
const refreshRepo = require("../repo/refresh.repo");
const userRepo = require("../repo/user.repo");
const userService = require("../service/user.service");
const userController = require("../controller/user.controller");

//sản phẩm
const productRepo = require("../repo/product.repo");
const productService = require("../service/product.service");
const productController = require("../controller/product.controller");
const product_Repo = new productRepo(connection);
const product_Service = new productService(product_Repo);
const product_Controller = new productController(product_Service);

const {
  authMiddleware,
  checkUserLogin,
} = require("../middleware/authMiddleware");

const refresh_repo = new refreshRepo(connection);
const user_repo = new userRepo(connection);
const user_service = new userService(user_repo, refresh_repo);
const user_controller = new userController(user_service);

userRoute.get("/login", (req, res) => {
  res.render("login");
});
userRoute.get("/signIn", (req, res) => {
  res.render("signIn");
});
userRoute.post("/api/signIn", user_controller.signInUser);
userRoute.post("/login", user_controller.loginUser);
userRoute.post("/logout", user_controller.logOut);
userRoute.get("/profile", checkUserLogin, (req, res) => {
  res.render("profile", {
    user: req.user,
  });
});
userRoute.get("/api/profile", checkUserLogin, user_controller.getProfile);
userRoute.get("/getCategories", product_Controller.getAllcategories);
userRoute.get("/product", product_Controller.getListProduct);

userRoute.get("/products", checkUserLogin, (req, res) => {
  const user = req.user || null;

  res.render("listProduct", {
    user,
    name: user ? user.username || user.email : "Khách",
  });
});
userRoute.get("/search",product_Controller.getSearchProduct);
module.exports = userRoute;
