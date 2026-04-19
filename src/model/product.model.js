class ProductModel {
  constructor({
    id,
    name,
    description,
    price,
    stock,
    category_id,
    status,
    created_at,
    updated_at,
    img,
  }) {
    this.id = id;
    this.name = name;
    this.description = description;

    this.price = price;
    this.stock = stock;

    this.category_id = category_id;

    this.status = status || "active";

    this.created_at = created_at || new Date();
    this.updated_at = updated_at || new Date();
    this.img = img || null;
  }

  // check còn hàng không
  isInStock() {
    return this.stock > 0;
  }

  // check active không
  isActive() {
    return this.status === "active";
  }

  // giảm stock khi bán
  decreaseStock(quantity = 1) {
    if (this.stock < quantity) {
      throw new Error("Không đủ hàng trong kho");
    }
    this.stock -= quantity;
  }

  // tăng stock (nhập hàng)
  increaseStock(quantity = 1) {
    this.stock += quantity;
  }

  toPublic() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      stock: this.stock,
      category_id: this.category_id,
      status: this.status,
    };
  }
}

module.exports = ProductModel;
