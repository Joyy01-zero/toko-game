function register() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || !password) {
    alert("Isi semua data!");
    return;
  }

  // Default user
  let role = "user";

  // Kalau username admin → jadi admin
  if (username === "admin") {
    role = "admin";
  }

  const user = { username, password, role };

  localStorage.setItem("user", JSON.stringify(user));

  alert("Register berhasil!");
  window.location.href = "login.html";
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Belum ada akun!");
    return;
  }

  if (username === user.username && password === user.password) {
    alert("Login berhasil 🎉");

    localStorage.setItem("isLogin", true);
    localStorage.setItem("role", user.role);

    window.location.href = "index.html";
  } else {
    alert("Username / Password salah!");
  }
}