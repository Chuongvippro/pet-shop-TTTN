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

  async getAll() {
    const [rows] = await this.connection.query(`SELECT * FROM users`);
    return rows;
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
}

module.exports = userRepo;
