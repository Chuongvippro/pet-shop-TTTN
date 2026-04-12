class refreshRepo {
  constructor(connection) {
    this.connection = connection;
  }

  async save(userId, token) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await this.connection.query(
      "INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)",
      [userId, token, expiresAt],
    );
  }

  async find(token) {
    const [rows] = await this.connection.query(
      "SELECT * FROM refresh_tokens WHERE token = ?",
      [token],
    );
    return rows[0];
  }

  async delete(token) {
    await this.connection.query("DELETE FROM refresh_tokens WHERE token = ?", [
      token,
    ]);
  }
}

module.exports = refreshRepo;
