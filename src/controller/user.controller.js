class userController {
  constructor(userService) {
    this.userService = userService;

    this.signInUser = this.signInUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.logOut = this.logOut.bind(this);
    this.getAllAccount = this.getAllAccount.bind(this);
    this.getProfile = this.getProfile.bind(this);

    this.createUser = this.createUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  async signInUser(req, res) {
    try {
      const { username, email, password } = req.body;
      const result = await this.userService.signInUser(
        username,
        email,
        password,
      );

      console.log(result);

      return res.render("signIn", {
        message: result.message,
        success: result.success,
      });
    } catch (e) {
      return res.render("signIn", {
        message: e.message,
        success: false,
      });
    }
  }

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      const result = await this.userService.loginUser(email, password);

      if (!result.success) {
        return res.status(400).json({
          message: result.message,
        });
      }
      res.cookie("accessToken", result.accessToken, {
        httpOnly: true,
        maxAge: 5 * 60 * 1000,
      });

      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.json({
        message: "Đăng nhập thành công",
        data: {
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
          user: result.user,
        },
      });
    } catch (err) {
      console.error("Lỗi đăng nhập:", err);
      return res.status(500).json({ message: "Lỗi server" });
    }
  }

  async logOut(req, res) {
    try {
      const refreshToken = req.cookies?.refreshToken;
      console.log("Logout API đang chạy");
      await this.userService.logOut(refreshToken);

      //xóa token trong cookies
      res.clearCookie("refreshToken");
      res.clearCookie("accessToken");

      return res.json({ message: "logout success" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: e.message });
    }
  }

  async getAllAccount(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const size = parseInt(req.query.size) || 10;

      const users = await this.userService.getAll(page, size);
      return res.json(users);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async createUser(req, res) {
    try {
      const result = await this.userService.createUser(req.body);

      return res.status(201).json(result);
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: err.message || "Tạo người dùng thất bại",
      });
    }
  }

  async updateUser(req, res) {
    try {
      const result = await this.userService.updateUser(req.body);

      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: err.message || "Cập nhật người dùng thất bại",
      });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.body;

      const result = await this.userService.deleteUser(id);

      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: err.message || "Xóa người dùng thất bại",
      });
    }
  }

  async getProfile(req, res) {
    try {
      if (!req.user) return res.status(401).json({ message: "Chưa đăng nhập" });

      const user = await this.userService.getProfile(req.user.id);
      return res.json(user);
    } catch (err) {
      if (err.message === "USER_NOT_FOUND") {
        return res.status(404).json({ message: "Không tìm thấy user" });
      }

      console.log(err);
      return res.status(500).json({ message: "Lỗi lấy thông tin cá nhân" });
    }
  }
}
module.exports = userController;
