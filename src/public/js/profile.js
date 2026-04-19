document.addEventListener("DOMContentLoaded", async () => {
  const user = await getProfile();

  if (!user) return;

  renderProfile(user);
});

async function getProfile() {
  const res = await fetch("/user/api/profile");

  if (res.status === 401) {
    alert("Chưa đăng nhập");
    window.location.href = "/";
    return null;
  }

  return await res.json();
}

function renderProfile(user) {
  document.getElementById("username").innerText = user.username;
  document.getElementById("email").innerText = user.email;
  document.getElementById("phone").innerText = user.phone || "Chưa có";
  document.getElementById("role").innerText = user.role;
}