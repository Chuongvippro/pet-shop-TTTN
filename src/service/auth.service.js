const jwt = require("jsonwebtoken");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");

class authService {
  constructor(refreshRepo) {
    this.refreshRepo = refreshRepo;
  }

  async refresh(refreshToken) {
    let payload;

    try {
      payload = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        throw new Error("Refresh token đã hết hạn");
      }
      throw new Error("Refresh token không hợp lệ");
    }

    const refreshTokenDB = await this.refreshRepo.find(refreshToken);

    if (!refreshTokenDB) {
      throw new Error("Refresh token không tồn tại trong DB");
    }

    const newAccessToken = generateAccessToken(payload);
   


    return {
      accessToken: newAccessToken,
      refreshToken: refreshToken,
    };
  }
}

module.exports = authService;
