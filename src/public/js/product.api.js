document.addEventListener("DOMContentLoaded", async () => {
  const user = await checkAuth();

  console.log("User:", user);

  if (!user) {
    console.log("Chưa login hoặc hết hạn");
    return;
  }

  console.log("User:", user);

  //lấy điều kiện category/keyword/sort trên url
  const urlParams = new URLSearchParams(window.location.search);
  state.categoryId = urlParams.get("categoryId") || null;
  state.keyword = urlParams.get("keyword") || null;
  state.sort = urlParams.get("sort") || null;
  state.page = parseInt(urlParams.get("page")) || 1;

  getListProduct();
});
const state = {
  categoryId: null,
  keyword: null,
  sort: null,
  page: 1,
  limit: 10,
};
function selectCategory(id) {
  state.categoryId = id;
  state.page = 1;
  getListProduct();
}
function selectKeyWord(keyWord) {
  state.keyword = keyWord;
  state.page = 1;
  getListProduct();
}
async function getListProduct() {
  const params = new URLSearchParams();

  if (state.categoryId) params.append("categoryId", state.categoryId);
  if (state.keyword) params.append("keyword", state.keyword);
  if (state.sort) params.append("sort", state.sort);

  params.append("page", state.page);
  params.append("limit", state.limit);

  // const urlParams = new URLSearchParams(window.location.search);
  // window.history.pushState({}, "", "?" + urlParams.toString());

  const url = "/user/product?" + params.toString();

  const res = await fetch(url);
  const result = await res.json();
  console.log(result.products);

  renderProducts(result.products);
  renderPagination(result.totalPages);
}

function renderProducts(products) {
  const container = document.getElementById("productContainer");
  if (!container) return;
  container.innerHTML = products
    .map(
      (p) => `
      <div class="product-card">
        <h3>${p.name}</h3>
        <img 
          src="/${p.img}" 
          alt="${p.name}" 
          style="width:150px; height:150px; object-fit:cover;"
        />
        <p>${p.price}đ</p>
      </div>
    `,
    )
    .join("");
}

function renderPagination(totalPages) {
  const pagination = document.getElementById("pagination");

  let html = "";

  for (let i = 1; i <= totalPages; i++) {
    html += `
      <button 
        style="margin: 0 5px; padding: 6px 12px; border: 1px solid #ff6b81; border-radius: 4px; cursor: pointer; 
               ${i === state.page ? "background-color: #ff6b81; color: white; font-weight: bold;" : "background-color: white; color: #ff6b81;"}"
        onclick="changePage(${i})"
      >
        ${i}
      </button>
    `;
  }

  pagination.innerHTML = html;
}

function changePage(page) {
  state.page = page;
  getListProduct();
}
