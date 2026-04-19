class productService {
  constructor(productRepo) {
    this.productRepo = productRepo;
  }

  async getAll(page = 1, size = 10) {
    const data = await this.productRepo.getAll(page, size);
    const totalItems = await this.productRepo.countAll();
    const totalPages = Math.ceil(totalItems / size);

    return {
      data, // Mảng sản phẩm
      currentPage: page,
      totalPages,
      totalItems,
    };
  }

  async getAllcategories() {
    return await this.productRepo.getAllcategories();
  }

  async createProduct(data) {
    const { name, price, stock, description, category_id, img } = data;

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
      img: img || null,
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
    const { id, name, price, stock, description, category_id, img } = data;
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
    //kiểm tra có ảnh chưa
    const oldImg = await this.productRepo.getUrlImg(id);
    const finalImg = img ? img : oldImg;

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
      img: finalImg,
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

  async getListProduct(params) {
    let { categoryId, keyword, sort, page = 1, limit = 10 } = params;

    //chuẩn hóa dữ liệu
    if (!page || page < 1) page = 1;
    if (!limit || limit > 50) limit = 10;

    keyword = keyword?.trim();

    const products = await this.productRepo.getListProduct({
      categoryId,
      keyword,
      sort,
      page,
      limit,
    });

    const totalItems = await this.productRepo.countAllForUser({
      categoryId,
      keyword,
    });

    const totalPages = Math.ceil(totalItems / limit);

    return {
      products,
      currentPage: page,
      totalPages,
      totalItems,
    };
  }

  async getSearchProduct(keyword) {
    if (!keyword) {
      return { products: [] };
    }

    const products = await this.productRepo.searchProduct(keyword);

    return {
      products,
    };
  }
}

module.exports = productService;
