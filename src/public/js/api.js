
async function callAPI(url, options = {}) {
  let res = await fetch(url, {
    ...options,
    credentials: "include",
  });

  if (res.status === 401 && url !== "/auth/refresh") {
    console.log("Access hết hạn, thử refresh...");

    const refreshRes = await fetch("/auth/refresh", {
      method: "POST",
      credentials: "include",
    });

    if (!refreshRes.ok) {
      console.log("Không có refresh token → chưa login");
      return res; 
    }

    // gọi lại request ban đầu trogn trường hợp lần 1 fail
    res = await fetch(url, {
      ...options,
      credentials: "include",
    });
  }

  return res;
}
async function logout() {
  await fetch("/user/logout", {
    method: "POST",
    credentials: "include",
  });
  window.location.href = "/";
}


//check login 
async function checkAuth() {
  try {
    const res = await callAPI("/auth/me");
    if (!res.ok) return false;
    const user = await res.json();
    return user;
  } catch {
    return false;
  }
}

function goHome() {
  window.location.href = "/";
}