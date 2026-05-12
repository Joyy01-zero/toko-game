// DEBUG (biar tau ke-load atau nggak)
console.log("MAIN JS KELOAD");

// AMBIL ELEMENT (AMAN)
const container = document.getElementById("product-list");
const searchInput = document.getElementById("search");

// DATA PRODUK (PASTI ADA)
let products = JSON.parse(localStorage.getItem("produk")) || [
  { nama: "Mouse Gaming RGB", harga: 150000, gambar: "https://via.placeholder.com/200" },
  { nama: "Keyboard Mechanical", harga: 350000, gambar: "https://via.placeholder.com/200" },
  { nama: "Headset Gaming", harga: 250000, gambar: "https://via.placeholder.com/200" }
];

// SIMPAN KE LOCAL (BIAR TETAP ADA)
localStorage.setItem("produk", JSON.stringify(products));

// ================= TAMPIL PRODUK =================
function tampilProduk(data) {
  if (!container) return; // ⬅️ biar gak error kalau element gak ada

  container.innerHTML = "";

  data.forEach(p => {
    const card = `
      <div class="card">
        <img src="${p.gambar}">
        <h3>${p.nama}</h3>
        <p>Rp ${p.harga}</p>

        <button onclick='addToCart("${p.nama}", ${p.harga}, "${p.gambar}")'>
          Tambah
        </button>
      </div>
    `;

    container.innerHTML += card;
  });
}

// ================= SEARCH (AMAN) =================
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();

    const filtered = products.filter(p =>
      p.nama.toLowerCase().includes(keyword)
    );

    tampilProduk(filtered);
  });
}

// ================= ADD TO CART =================
function addToCart(nama, harga, gambar) {
  console.log("DITAMBAH:", nama); // debug

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({ nama, harga, gambar });

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();

  alert(nama + " ditambahkan ke keranjang!");
}

// ================= CART COUNTER =================
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const el = document.getElementById("cart-count");
  if (el) {
    el.innerText = cart.length;
  }
}

// ================= LOGOUT =================
function logout() {
  localStorage.removeItem("isLogin");
  localStorage.removeItem("role");

  alert("Logout berhasil!");
  window.location.href = "login.html";
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  tampilProduk(products);

  // efek fade
  document.body.style.opacity = 0;
  setTimeout(() => {
    document.body.style.transition = "0.5s";
    document.body.style.opacity = 1;
  }, 100);
});