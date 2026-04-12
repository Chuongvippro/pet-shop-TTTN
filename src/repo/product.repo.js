class productRepo {
  constructor(connection) {
    this.connection = connection;
  }

  async getAll() {
    const [rows] = await this.connection.query(`SELECT * FROM products`);
    return rows;
  }

  async getAllcategories() {
    const [rows] = await this.connection.query(`SELECT * FROM categories`);
    return rows;
  }

  async createProduct(data) {
    const [result] = await this.connection.query(
      `INSERT INTO products (name, price, stock, description, category_id, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        data.name,
        data.price,
        data.stock,
        data.description,
        data.category_id,
        data.status,
      ],
    );

    return result;
  }
  async checkCategory(id) {
    const [rows] = await this.connection.query(
      "SELECT id FROM categories WHERE id = ?",
      [id],
    );

    return rows.length > 0;
  }

  async deleteProduct(id) {
    return await this.connection.query(
      `
        delete from products where id = ?`,
      [id],
    );
  }
  async updateProduct(id, data) {
    const [result] = await this.connection.query(
      `
        UPDATE products SET name = ?, price = ?, stock = ?,description = ?,category_id = ?,status = ? WHERE id = ?`,
      [
        data.name,
        data.price,
        data.stock,
        data.description,
        data.category_id,
        data.status,
        id,
      ],
    );
    return result;
  }
}

module.exports = productRepo;
