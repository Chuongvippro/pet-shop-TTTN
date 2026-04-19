class productController {
  constructor(productService) {
    this.productService = productService;

    this.getAllProduct = this.getAllProduct.bind(this);
    this.getAllcategories = this.getAllcategories.bind(this);
    this.createProduct = this.createProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);

    this.getListProduct = this.getListProduct.bind(this);
    this.getSearchProduct = this.getSearchProduct.bind(this);
  }

  async getAllProduct(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const size = parseInt(req.query.size) || 10;

      const result = await this.productService.getAll(page, size);
      return res.json(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async getAllcategories(req, res) {
    try {
      const categories = await this.productService.getAllcategories();
      return res.json(categories);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  }

  async createProduct(req, res) {
    try {
      const data = req.body;
      // lưu path vào data
      if (req.file) {
        data.img = "uploads/" + req.file.filename;
      }
      const result = await this.productService.createProduct(data);

      return res.status(201).json(result);
      // result = { message, data }
    } catch (err) {
      console.log(err);

      return res.status(400).json({
        message: err.message || "Tạo sản phẩm thất bại",
      });
    }
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.body;
      const result = await this.productService.deleteProduct(id);

      return res.status(201).json(result);
      // result = { message, data }
    } catch (err) {
      console.log(err);

      return res.status(400).json({ message: err.message || "Xóa thất bại" });
    }
  }
  async updateProduct(req, res) {
    try {
      const data = req.body;
      if (req.file) {
        data.img = "uploads/" + req.file.filename;
      }

      const result = await this.productService.updateProduct(data);

      return res.status(201).json(result);
      // result = { message, data }
    } catch (err) {
      console.log(err);

      return res.status(400).json({
        message: err.message || "Sửa sản phẩm thất bại",
      });
    }
  }

  //nghiệp vụ user
  async getListProduct(req, res) {
    try {
      const { categoryId, keyword, sort, page, limit } = req.query;

      const result = await this.productService.getListProduct({
        categoryId,
        keyword,
        sort,
        page: Number(page),
        limit: Number(limit),
      });

      return res.json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Lỗi lấy danh sách sản phẩm" });
    }
  }

  //tìm kiếm sản phẩm
  async getSearchProduct(req, res) {
    try {
      const keyword = req.query.keyword;

      const result = await this.productService.getSearchProduct(keyword);
      return res.json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Lỗi tìm kiếm sản phẩm" });
    }
  }
}

module.exports = productController;
