class productController {
  constructor(productService) {
    this.productService = productService;

    this.getAllProduct = this.getAllProduct.bind(this);
    this.getAllcategories = this.getAllcategories.bind(this);
    this.createProduct = this.createProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);


  }
  async getAllProduct(req, res) {
    try {
      const products = await this.productService.getAll();
      return res.json(products);
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
      const result = await this.productService.createProduct(req.body);

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
      const result = await this.productService.updateProduct(req.body);

      return res.status(201).json(result);
      // result = { message, data }
    } catch (err) {
      console.log(err);

      return res.status(400).json({
        message: err.message || "Sửa sản phẩm thất bại",
      });
    }
  }

  
}

module.exports = productController;
