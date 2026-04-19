require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require('cookie-parser');
const connection = require("./src/config/db");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"src", "view"));
app.use(express.static(path.join(__dirname, "src", "public")));

app.use(cookieParser());
const homeRoute = require("./src/route/home.routes");
const userRoute = require("./src/route/user.route");
const adminRoute = require("./src/route/admin.route");
const authRoute = require("./src/route/auth.route");
app.use("/", homeRoute);
app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/auth", authRoute);


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(8084, () => {
  console.log(`Server running at http://localhost:${process.env.PORT} `);
});

(async () => {
  try {
    const conn = await connection.getConnection();
    console.log("✅ Kết nối MySQL thành công!");
    conn.release();
  } catch (err) {
    console.error("❌ Lỗi kết nối MySQL:", err.message);
  }
})();
