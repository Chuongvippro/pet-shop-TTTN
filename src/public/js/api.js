  let isRefreshing = false;
  let failedQueue = [];
  const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
    failedQueue = [];
  };

  async function callAPI(url, options = {}) {
    let res = await fetch(url, {
      ...options,
      credentials: "include",
    });

    if (res.status === 401 && url !== "/auth/refresh") {
      console.log("Access hết hạn, thử refresh...");

      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(async () => {
            return await fetch(url, { ...options, credentials: "include" });
          })
          .catch(() => {
            return res;
          });
      }

      isRefreshing = true;

      try {
        const refreshRes = await fetch("/auth/refresh", {
          method: "POST",
          credentials: "include",
        });

        if (!refreshRes.ok) {
          console.log("Không có refresh token → chưa login");
          return res;
        }
        processQueue(null, true);

        // gọi lại request ban đầu trogn trường hợp lần 1 fail
        res = await fetch(url, {
          ...options,
          credentials: "include",
        });
      } catch (err) {
        processQueue(err, null);
      }finally {
        isRefreshing = false;
      }
      return res;
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
