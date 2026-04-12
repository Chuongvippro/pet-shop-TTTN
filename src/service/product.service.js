class productService {
  constructor(productRepo) {
    this.productRepo = productRepo;
  }

  async getAll() {
    return await this.productRepo.getAll();
  }

  async getAllcategories() {
    return await this.productRepo.getAllcategories();
  }

  async createProduct(data) {
    const { name, price, stock, description, category_id } = data;

    if (!name || !price || !category_id || !stock || !description) {
      throw new Error("Vui lòng nhập đầy đủ thông tin");
    }

    if (isNaN(price) || Number(price) <= 0) {
      throw new Error("Giá phải là số hợp lệ");
    }

    if (stock && isNaN(stock)) {
      throw new Error("Số lượng không hợp lệ");
    }

    //check loại sản phẩm
    const isExist = await this.productRepo.checkCategory(category_id);

    if (!isExist) {
      throw new Error("Loại sản phẩm không tồn tại");
    }

    const newProduct = {
      name: name.trim(),
      price: Number(price),
      stock: Number(stock) || 0,
      description: description ? description.trim() : "",
      category_id: Number(category_id),
      status: "active",
    };
    const result = await this.productRepo.createProduct(newProduct);

    return {
      message: "Thêm sản phẩm thành công",
      data: {
        id: result.insertId,
        ...newProduct,
      },
    };
  }

  async deleteProduct(id) {
    if (!id) throw new Error("Không có id sản phẩm");

    const result = await this.productRepo.deleteProduct(id);
    return result;
  }

  async updateProduct(data) {
    const { id, name, price, stock, description, category_id } = data;
    if (!id) {
      throw new Error("Thiếu id sản phẩm");
    }

    if (isNaN(price) || Number(price) <= 0) {
      throw new Error("Giá phải là số hợp lệ");
    }

    if (stock && isNaN(stock)) {
      throw new Error("Số lượng không hợp lệ");
    }

    //check loại sản phẩm
    const isExist = await this.productRepo.checkCategory(category_id);

    if (!isExist) {
      throw new Error("Loại sản phẩm không tồn tại");
    }

    const updateProduct = {
      name: name.trim(),
      price: Number(price),
      stock: Number(stock) || 0,
      description: description ? description.trim() : "",
      category_id: Number(category_id),
      status: "active",
    };
    const result = await this.productRepo.updateProduct(id, updateProduct);

    return {
      message: "Sửa sản phẩm thành công",
      data: {
        id: result.insertId,
        ...updateProduct,
      },
    };
  }
}

module.exports = productService;
