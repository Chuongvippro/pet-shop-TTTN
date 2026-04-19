class authController {
  constructor(authService) {
    this.authService = authService;

    this.refreshToken = this.refreshToken.bind(this);
    this.me = this.me.bind(this);
  }

  async refreshToken(req, res) {
    try {
      const refreshToken = req.cookies?.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({ message: "Không có refresh token!" });
      }

      const result = await this.authService.refresh(refreshToken);

      res.cookie("accessToken", result.accessToken, {
        httpOnly: true,
        maxAge: 5 * 60 * 1000,
      });
      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
      });

      return res.json({ message: "Refresh thành công" });
    } catch (err) {
      console.log(err);
      return res.status(401).json({ message: err.message });
    }
  }

  async me(req, res) {
    try {
      return res.json(req.user);
    } catch (err) {
      return res.status(500).json({
        message: "Lỗi server",
      });
    }
  }
}

module.exports = authController;
