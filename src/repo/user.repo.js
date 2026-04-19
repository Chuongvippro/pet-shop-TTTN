class userRepo {
  constructor(connection) {
    this.connection = connection;
  }

  async signInUser(user) {
    return await this.connection.query(
      `
            insert into users(user_name, email, password, created_at)
            values(?,?,?,?)`,
      [user.user_name, user.email, user.password, user.created_at],
    );
  }

  async findByEmail(email) {
    const [rows] = await this.connection.query(
      `
        select * from users where email = ?`,
      [email],
    );
    return rows.length > 0 ? rows[0] : null;
  }

  async getAll(page = 1, size = 10) {
    const offset = (page - 1) * size;

    const [rows] = await this.connection.query(
      `SELECT * FROM users ORDER BY id LIMIT ? OFFSET ?`,
      [size, offset],
    );
    return rows
  }
  async countAll() {
    const [rows] = await this.connection.query(
      `SELECT COUNT(*) as total FROM users`,
    );
    return rows[0].total;
  }

  async createUser(data) {
    const [result] = await this.connection.query(
      `INSERT INTO users (user_name, email, password, phone, role, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        data.user_name,
        data.email,
        data.password,
        data.phone,
        data.role,
        data.status,
      ],
    );

    return result;
  }

  async deleteUser(id) {
    const [result] = await this.connection.query(
      `DELETE FROM users WHERE id = ?`,
      [id],
    );
    return result;
  }

  async updateUser(id, data) {
    let result;
    if (data.password) {
      const [row] = await this.connection.query(
        `UPDATE users 
       SET user_name = ?, email = ?, password = ?, phone = ?, role = ?, status = ?
       WHERE id = ?`,
        [
          data.user_name,
          data.email,
          data.password,
          data.phone,
          data.role,
          data.status,
          id,
        ],
      );
      result = row;
    } else {
      const [row] = await this.connection.query(
        `UPDATE users 
       SET user_name = ?, email = ?,  phone = ?, role = ?, status = ?
       WHERE id = ?`,
        [data.user_name, data.email, data.phone, data.role, data.status, id],
      );
      result = row;
    }

    return result;
  }

  async findUserById(id) {
    const [rows] = await this.connection.query(
      `
      select * from users where id = ?`,
      [id],
    );
    return rows[0] || null;
  }
}

module.exports = userRepo;
