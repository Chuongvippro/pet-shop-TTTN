const express = require("express");
const adminRoute = express.Router();
const {
  authMiddleware,
  checkUserLogin,
  isAdmin,
} = require("../middleware/authMiddleware");

const connection = require("../config/db");
const productRepo = require("../repo/product.repo");
const productService = require("../service/product.service");
const productController = require("../controller/product.controller");
const userRepo = require("../repo/user.repo");
const userService = require("../service/user.service");
const userController = require("../controller/user.controller");

const product_Repo = new productRepo(connection);
const user_Repo = new userRepo(connection);
const product_Service = new productService(product_Repo);
const user_Service = new userService(user_Repo);
const product_Controller = new productController(product_Service);
const user_Controller = new userController(user_Service);

adminRoute.get("/", checkUserLogin, (req, res) => {
  res.render("admin", { user: req.user });
});

adminRoute.get("/products", product_Controller.getAllProduct);
adminRoute.get("/users", user_Controller.getAllAccount);
adminRoute.get("/categories", product_Controller.getAllcategories);
adminRoute.post("/create/product", product_Controller.createProduct);
adminRoute.post("/delete/product", product_Controller.deleteProduct);
adminRoute.post("/update/product", product_Controller.updateProduct);
adminRoute.post(
  "/create/user",
  authMiddleware,
  isAdmin,
  user_Controller.createUser,
);
adminRoute.post(
  "/delete/user",
  authMiddleware,
  isAdmin,
  user_Controller.deleteUser,
);
adminRoute.post(
  "/update/user",
  authMiddleware,
  isAdmin,
  user_Controller.updateUser,
);

module.exports = adminRoute;
