class productRepo {
  constructor(connection) {
    this.connection = connection;
  }

  async getAll(page = 1, size = 10) {
    const offset = (page - 1) * size;

    const [rows] = await this.connection.query(
      `SELECT * FROM products ORDER BY id LIMIT ? OFFSET ?`,
      [size, offset],
    );

    return rows;
  }
  //Đếm tất cả sản phẩm
  async countAll() {
    const [rows] = await this.connection.query(
      `SELECT COUNT(*) as total FROM products`,
    );
    return rows[0].total;
  }

  async getAllcategories() {
    const [rows] = await this.connection.query(`SELECT * FROM categories`);
    return rows;
  }

  async createProduct(data) {
    const [result] = await this.connection.query(
      `INSERT INTO products (name, price, stock, description, category_id, status, img)
       VALUES (?, ?, ?, ?, ?, ?,?)`,
      [
        data.name,
        data.price,
        data.stock,
        data.description,
        data.category_id,
        data.status,
        data.img,
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
        UPDATE products SET name = ?, price = ?, stock = ?,description = ?,category_id = ?,status = ?, img = ? WHERE id = ?`,
      [
        data.name,
        data.price,
        data.stock,
        data.description,
        data.category_id,
        data.status,
        data.img,
        id,
      ],
    );
    return result;
  }

  async getUrlImg(id) {
    const [rows] = await this.connection.query(
      `select img from products where id = ?`,
      [id],
    );
    return rows[0] || null;
  }

  //đếm tất cả sản phẩm theo điều kiện đưa vào
  async countAllForUser({ categoryId, keyword }) {
    let sql = "SELECT COUNT(*) as total FROM products";
    let conditions = [];
    let params = [];

    if (categoryId) {
      conditions.push("category_id = ?");
      params.push(categoryId);
    }

    if (keyword) {
      conditions.push("name LIKE ?");
      params.push(`%${keyword}%`);
    }

    if (conditions.length > 0) {
      sql += " WHERE " + conditions.join(" AND ");
    }

    const [rows] = await this.connection.query(sql, params);
    return rows[0].total;
  }

  async getListProduct({ categoryId, keyword, sort, page = 1, limit = 10 }) {
    const offset = (page - 1) * limit;

    let sql = "SELECT * FROM products";
    let conditions = [];
    let params = [];

    //loại sản phẩm
    if (categoryId) {
      conditions.push("category_id = ?");
      params.push(categoryId);
    }

    //từ khóa
    if (keyword) {
      conditions.push("name LIKE ?");
      params.push(`%${keyword}%`);
    }

    if (conditions.length > 0) {
      sql += " WHERE " + conditions.join(" AND ");
    }

    //lọc
    if (sort === "price_asc") sql += " ORDER BY price ASC";
    else if (sort === "price_desc") sql += " ORDER BY price DESC";
    else sql += " ORDER BY id DESC";

    //phân trang
    sql += " LIMIT ? OFFSET ?";
    params.push(limit, offset);

    const [rows] = await this.connection.query(sql, params);

    return rows;
  }

  async searchProduct(keyword) {
    const [rows] = await this.connection.query(
      "SELECT * FROM products WHERE name LIKE ? LIMIT 5",
      [`%${keyword}%`],
    );
    return rows;
  }
}

module.exports = productRepo;
