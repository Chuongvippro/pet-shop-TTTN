document.addEventListener("DOMContentLoaded", async () => {
  const user = await checkAuth();

  console.log("User:", user);

  if (!user) {
    console.log("Chưa login hoặc hết hạn");
    return;
  }

  console.log("User:", user);

  loadCategories();
  setUpDropdownEvent();
});

async function loadCategories() {
  const res = await fetch("/user/getCategories");
  const categories = await res.json();

  console.log("Danh mục từ API:", categories);
  const menu = document.getElementById("categoryMenu");

  menu.innerHTML = categories
    .map(
      (c) => `
      <li onclick="handleCategoryClick('${c.id}')">
        ${c.name}
      </li>
  `,
    )
    .join("");
}

async function setUpDropdownEvent() {
  const productDropdown = document.querySelector(".dropdown");
  const categoriesMenu = document.getElementById("categoryMenu");

  productDropdown.addEventListener("click", (e) => {
    e.preventDefault();
    categoriesMenu.classList.toggle("show");
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown")) {
      categoriesMenu.classList.remove("show");
    }
  });
}

function handleCategoryClick(categoryId) {
  const urlParams = new URLSearchParams(window.location.search);

  urlParams.set("categoryId", categoryId);
  urlParams.set("page", 1);

  window.location.href = `/user/products?${urlParams.toString()}`;
}

function debounce(fn, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
async function searchProducts(keyword) {
  const res = await fetch(`/user/search?keyword=${keyword}&limit=5`);

  const data = await res.json();
  console.log(data);
  return data.products;
}
function renderSearchResult(products) {
  const box = document.getElementById("searchResult");

  if (!products.length) {
    box.style.display = "none";
    box.innerHTML = "";
    return;
  }

  box.style.display = "block";

  box.innerHTML = products
    .map(
      (p) => `
        <div class="search-item" onclick="goToProduct('${p.id}')">
          <img src="/${p.img}" alt="${p.name}" />
          <span>${p.name}</span>
        </div>
      `,
    )
    .join("");
}
const searchInput = document.getElementById("searchInput");
const resultBox = document.getElementById("searchResult");

searchInput.addEventListener(
  "input",
  debounce(async (e) => {
    const keyword = e.target.value.trim();

    if (!keyword) {
      resultBox.style.display = "none";
      resultBox.innerHTML = "";
      return;
    }

    const products = await searchProducts(keyword);

    renderSearchResult(products);
  }, 300),
);

document.addEventListener("click", (e) => {
  const menu = document.getElementById("categoryMenu");

  if (!e.target.closest(".dropdown")) {
    menu.classList.remove("show");
  }
});
function handleSearch() {
  const keyword = document.getElementById("searchInput").value;
  const urlParams = new URLSearchParams(window.location.search);

  urlParams.set("keyword", keyword);
  urlParams.set("page", 1);

  window.location.href = `/user/products?${urlParams.toString()}`;
}
