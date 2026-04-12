async function loadSection(type, event) {
  const box = document.getElementById("content-box");
  try {
    const res = await fetch(`/admin/${type}`);

    if (!res.ok) {
      throw new Error("Module không tồn tại");
    }
    const data = await res.json();

    if (type === "products") {
      let html = `
      <div class="table-header">
        <h2>Danh sách sản phẩm</h2>
        <button class="btn-add" onclick="openAddProduct()">
          + Thêm sản phẩm
        </button>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
    `;

      data.forEach((p) => {
        html += `
        <tr>
          <td>${p.id}</td>
          <td>${p.name}</td>
          <td>${p.price}</td>
          <td>${p.stock ?? 0}</td>
          <td>${p.status}</td>
          <td>
            <button class="btn-edit" onclick='openAddProduct(${JSON.stringify(p)})'>
              Sửa
            </button>
            <button class="btn-delete" onclick="deleteProduct(${p.id})">
              Xóa
            </button>
          </td>
        </tr>
      `;
      });

      html += `
        </tbody>
      </table>
    `;

      box.innerHTML = html;
    }

    if (type === "users") {
      let html = `
    <div class="table-header">
      <h2>Danh sách người dùng</h2>
      <button class="btn-add" onclick="openAddUser()">
        + Thêm người dùng
      </button>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
  `;

      data.forEach((u) => {
        html += `
      <tr>
        <td>${u.id}</td>
        <td>${u.user_name}</td>
        <td>${u.email}</td>
        <td>${u.phone ?? ""}</td>
        <td>
          <button class="btn-edit" onclick='openAddUser(${JSON.stringify(u)})'>
            Sửa
          </button>
          <button class="btn-delete" onclick="deleteUser(${u.id})">
            Xóa
          </button>
          <button class="btn-view" onclick="viewUser(${u.id})">
            Xem
          </button>
        </td>
      </tr>
    `;
      });

      html += `
      </tbody>
    </table>
  `;

      box.innerHTML = html;
    }
  } catch (err) {
    box.innerHTML = `
      <h2>⚠️ ${err.message}</h2>
      <p>Module này hiện không khả dụng</p>
    `;
  }
}
//tạo sản phẩm mới/xóa sản phẩm
let editProductId = null;
async function openAddProduct(product = null) {
  document.getElementById("product-modal").classList.add("show");
  const title = document.querySelector("#product-modal h2");

  //lấy tất cả loại sản phẩm
  const res = await fetch("/admin/categories");
  const categories = await res.json();
  const select = document.getElementById("category");
  let html = `<option value="">-- Chọn loại --</option>`;

  categories.forEach((c) => {
    html += `<option value="${c.id}">${c.name}</option>`;
  });

  if (product) {
    editProductId = product.id;
    title.innerText = "Sửa sản phẩm";

    document.getElementById("name").value = product.name;
    document.getElementById("price").value = product.price;
    document.getElementById("stock").value = product.stock;
    document.getElementById("description").value = product.description;
    document.getElementById("category").value = product.category_id;
  } else {
    title.innerText = "Thêm sản phẩm";

    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("stock").value = "";
    document.getElementById("category").value = "";

    editProductId = null;
  }
  select.innerHTML = html;
}
function closeModal() {
  document.getElementById("product-modal").classList.remove("show");
}

async function submitProduct() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const stock = document.getElementById("stock").value;
  const category_id = document.getElementById("category").value;
  const description = document.getElementById("description").value;
  const messageBox = document.getElementById("form-message");

  try {
    let res;
    if (editProductId) {
      res = await updateProduct({
        id: editProductId,
        name,
        price,
        stock,
        description,
        category_id,
      });
    } else {
      res = await createProduct({
        name,
        price,
        stock,
        description,
        category_id,
      });
    }
    messageBox.innerText = res.message;
    messageBox.className = "form-message success";

    setTimeout(() => {
      closeModal();
      loadSection("products");
      messageBox.innerText = "";
    }, 1000);
  } catch (err) {
    messageBox.innerText = err.message;
    messageBox.className = "form-message error";
  }
}

//thêm/xóa/sửa user(account)
let editUserId = null;
async function openAddUser(user = null) {
  document.getElementById("user-modal").classList.add("show");
  const title = document.querySelector("#user-modal h2");
  checkRoleUI();

  if (user) {
    editUserId = user.id;
    title.innerText = "Sửa người dùng";

    document.getElementById("user_name").value = user.user_name;
    document.getElementById("email").value = user.email;
    document.getElementById("phone").value = user.phone ?? "";
    document.getElementById("password").value = "";
  } else {
    title.innerText = "Thêm người dùng";

    document.getElementById("user_name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("password").value = "";
    editUserId = null;
  }
}
function checkRoleUI() {
  const user = JSON.parse(localStorage.getItem("user") || "null");


  const roleGroup = document.getElementById("role-group");

  if (!user || user.role !== "admin") {
    roleGroup.style.display = "none";
  } else {
    roleGroup.style.display = "block";
  }
}

function closeUserModal() {
  document.getElementById("user-modal").classList.remove("show");
}

async function submitUser() {
  const user_name = document.getElementById("user_name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  const messageBox = document.getElementById("user-form-message");

  try {
    let res;

    if (editUserId) {
      res = await updateUser({
        id: editUserId,
        user_name,
        email,
        phone,
        password,
        role,
      });
    } else {
      res = await createUser({
        user_name,
        email,
        phone,
        password,
        role,
      });
    }

    messageBox.innerText = res.message;
    messageBox.className = "form-message success";

    setTimeout(() => {
      closeUserModal();
      loadSection("users");
      messageBox.innerText = "";
    }, 1000);
  } catch (err) {
    messageBox.innerText = err.message;
    messageBox.className = "form-message error";
  }
}
