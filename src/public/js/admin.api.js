async function createProduct(data) {
  try {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    formData.append("category_id", data.category_id);
    formData.append("description", data.description);

    if (data.file) {
      formData.append("img", data.file);
    }

    const res = await fetch("/admin/create/product", {
      method: "POST",
      body: formData,
    });

    const text = await res.text();

    let result;

    //call back tránh lỗi
    try {
      result = JSON.parse(text);
    } catch {
      throw new Error("Server không trả JSON");
    }

    if (!res.ok) {
      throw new Error(result.message || "Cập nhậ thất bại");
    }

    return result;
  } catch (err) {
    console.error("Lỗi cập nhật:", err.message);
    alert(err.message);
  }
}
async function deleteProduct(id) {
  try {
    const res = await fetch("/admin/delete/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const text = await res.text();

    let result;

    //call back tránh lỗi
    try {
      result = JSON.parse(text);
    } catch {
      throw new Error("Server không trả JSON");
    }

    if (!res.ok) {
      throw new Error(result.message || "Xóa thất bại");
    }

    loadSection("products");
  } catch (err) {
    console.error("Lỗi xoá:", err.message);
    alert(err.message);
  }
}

async function updateProduct(data) {
  try {
    const formData = new FormData();

    formData.append("id", data.id);
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    formData.append("category_id", data.category_id);
    formData.append("description", data.description);

    if (data.file) {
      formData.append("img", data.file);
    }

    const res = await fetch("/admin/update/product", {
      method: "POST",
      body: formData,
    });

    const text = await res.text();

    let result;

    //call back tránh lỗi
    try {
      result = JSON.parse(text);
    } catch {
      throw new Error("Server không trả JSON");
    }

    if (!res.ok) {
      throw new Error(result.message || "Cập nhậ thất bại");
    }

    return result;
  } catch (err) {
    console.error("Lỗi cập nhật:", err.message);
    alert(err.message);
  }
}

//user
async function createUser(data) {
  try {
    const res = await fetch("/admin/create/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const text = await res.text();

    let result;
    try {
      result = JSON.parse(text);
    } catch {
      throw new Error("Server không trả JSON");
    }

    if (!res.ok) {
      throw new Error(result.message || "Tạo sản phẩm thất bại");
    }

    return result;
  } catch (err) {
    console.error("Lỗi create:", err.message);
    throw err;
  }
}
async function deleteUser(id) {
  try {
    const res = await fetch("/admin/delete/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const text = await res.text();

    let result;

    //call back tránh lỗi
    try {
      result = JSON.parse(text);
    } catch {
      throw new Error("Server không trả JSON");
    }

    if (!res.ok) {
      throw new Error(result.message || "Xóa thất bại");
    }

    loadSection("users");
  } catch (err) {
    console.error("Lỗi xoá:", err.message);
    alert(err.message);
  }
}

async function updateUser(data) {
  try {
    const res = await fetch("/admin/update/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const text = await res.text();

    let result;

    //call back tránh lỗi
    try {
      result = JSON.parse(text);
    } catch {
      throw new Error("Server không trả JSON");
    }

    if (!res.ok) {
      throw new Error(result.message || "Cập nhật thất bại");
    }

    return result;
  } catch (err) {
    console.error("Lỗi cập nhật:", err.message);
    alert(err.message);
  }
}
