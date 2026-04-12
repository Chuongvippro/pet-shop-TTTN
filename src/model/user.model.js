class userModel {
  constructor({
    id,
    user_name,
    email,
    password,
    phone,
    address,
    role,
    status,
    is_deleted,
    create_at,
  }) {
    this.id = id;
    this.user_name = user_name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.address = address;
    this.role = role || "user";
    this.status = status || "active";
    this.is_deleted = is_deleted ?? 0;
    this.create_at = create_at || new Date();
  }
  isOwner(idUser) {
    return this.id === idUser;
  }

  toJWT() {
    return { id: this.id, email: this.email, role: this.role };
  }
}

module.exports = userModel;
