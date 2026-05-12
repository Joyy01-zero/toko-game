document.addEventListener("DOMContentLoaded", () => {

  const role = localStorage.getItem("role");

  // 🔒 Proteksi admin
  if (role !== "admin") {
    alert("Akses ditolak! Khusus admin ❌");
    window.location.href = "index.html";
    return;
  }

  const list = document.getElementById("list-produk");

  // 🔄 AMBIL DATA DARI SERVER
  function loadProduk() {
    fetch("http://localhost:3000/api/products")
      .then(res => res.json())
      .then(data => {
        tampilProduk(data);
      });
  }

  // 🎯 TAMPILKAN PRODUK
  function tampilProduk(data) {
    list.innerHTML = "";

    data.forEach((p, index) => {
      const div = document.createElement("div");

      div.innerHTML = `
        <div class="card">
          <img src="${p.gambar}" width="100">
          <p>${p.nama} - Rp ${p.harga}</p>
          <button onclick="hapus(${index})">Hapus</button>
        </div>
      `;

      list.appendChild(div);
    });
  }

  // ➕ TAMBAH PRODUK KE SERVER
  window.tambahProduk = function () {
    const nama = document.getElementById("nama").value;
    const harga = parseInt(document.getElementById("harga").value);
    const gambar = document.getElementById("gambar").value;

    if (!nama || !harga || !gambar) {
      alert("Isi semua data!");
      return;
    }

    fetch("http://localhost:3000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nama, harga, gambar })
    })
    .then(res => res.json())
    .then(() => {
      alert("Produk ditambah!");
      loadProduk();

      // reset form
      document.getElementById("nama").value = "";
      document.getElementById("harga").value = "";
      document.getElementById("gambar").value = "";
    });
  };

  // 🗑️ HAPUS PRODUK DARI SERVER
  window.hapus = function (index) {
    fetch(`http://localhost:3000/api/products/${index}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(() => {
      alert("Produk dihapus!");
      loadProduk();
    });
  };

  // 🚀 INIT
  loadProduk();

});