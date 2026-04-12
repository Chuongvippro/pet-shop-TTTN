document.addEventListener("DOMContentLoaded", async () => {
  const user = await checkAuth();

  if (!user) {
    console.log("Chưa login hoặc hết hạn");
    return;
  }

  console.log("User:", user);
});