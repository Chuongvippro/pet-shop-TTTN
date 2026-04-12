const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");
class userService {
  constructor(userRepo, refreshRepo) {
    this.userRepo = userRepo;
    this.refreshRepo = refreshRepo;
  }

  async signInUser(user_name, email, password) {
    if (!user_name) {
      return { success: false, message: "Thiếu tên tài khoản" };
    }

    if (!email) {
      return { success: false, message: "Thiếu email" };
    }

    if (!password) {
      return { success: false, message: "Thiếu mật khẩu" };
    }

    const existingUser = await this.userRepo.findByEmail(email);
    if (existingUser) {
      return { success: false, message: "email đã tồn tại" };
    }

    const hassPassword = await bcrypt.hash(password, 10);
    const user = new userModel({
      user_name,
      email,
      password: hassPassword,
    });
    await this.userRepo.signInUser(user);

    return {
      success: true,
      message: "Đăng ký thành công vui lòng quay lại đăng nhập",
    };
  }

  async loginUser(email, password) {
    if (!email) {
      return { success: false, message: "Thiếu email" };
    }

    if (!password) {
      return { success: false, message: "Thiếu mật khẩu" };
    }

    const userData = await this.userRepo.findByEmail(email);
    if (!userData) {
      return { success: false, message: "Email không tồn tại" };
    }

    const match = await bcrypt.compare(password, userData.password);
    if (!match) {
      return { success: false, message: "Sai mật khẩu" };
    }

    if (userData.is_deleted === 1) {
      return { success: false, message: "Tài khoản đã bị xóa" };
    }

    const user = new userModel(userData);
    const accessToken = generateAccessToken(user.toJWT());
    const refreshToken = generateRefreshToken(user.toJWT());

    await this.refreshRepo.save(user.id, refreshToken);

    return {
      success: true,
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        user_name: user.user_name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async logOut(refreshToken) {
    if (!refreshToken) {
      throw new Error("Không có refreshToken");
    }

    return await this.refreshRepo.delete(refreshToken);
  }

  async getAll() {
    return await this.userRepo.getAll();
  }

  async createUser(data) {
    const { user_name, email, password, phone, role } = data;

    if (!user_name || !email || !password) {
      throw new Error("Vui lòng nhập đầy đủ thông tin");
    }

    if (!email.includes("@")) {
      throw new Error("Email không hợp lệ");
    }

    if (password.length < 6) {
      throw new Error("Mật khẩu tối thiểu 6 ký tự");
    }

    const isExist = await this.userRepo.findByEmail(email);
    if (isExist) {
      throw new Error("Email đã tồn tại");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      user_name: user_name.trim(),
      email: email.trim(),
      password: hashedPassword,
      phone: phone ? phone.trim() : "",
      role: role ? role : "user",
      status: "active",
    };

    const result = await this.userRepo.createUser(newUser);

    return {
      message: "Thêm người dùng thành công",
      data: {
        id: result.insertId,
        user_name: newUser.user_name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
      },
    };
  }

  async deleteUser(id) {
    if (!id) throw new Error("Không có id tài khoản");

    const result = await this.userRepo.deleteUser(id);
    return result;
  }

  async updateUser(data) {
    const { id, user_name, email, phone, password, role } = data;
    if (!id) {
      throw new Error("Thiếu id người dùng ");
    }
    if (!user_name || !email) {
      throw new Error("Thiếu thông tin");
    }
    
    const existing = await this.userRepo.findByEmail(email);

    if (existing && existing.id !== id) {
      throw new Error("Email đã tồn tại");
    }

    const updatedData = {
      user_name: user_name.trim(),
      email: email.trim(),
      password: password,
      phone: phone ? phone.trim() : "",
      role: role ? role : "user",
      status: "active",
    };

    if (password) {
      if (password.length < 6) {
        throw new Error("Mật khẩu tối thiểu 6 ký tự");
      }
      updatedData.password = await bcrypt.hash(password, 10);
    }
    const result = await this.userRepo.updateUser(id, updatedData);

    return {
      message: "Sửa tài khoản thành công",
      data: {
        id: result.insertId,
        ...updatedData,
      },
    };
  }
}

module.exports = userService;
