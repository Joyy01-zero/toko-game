const list = document.getElementById("checkout-list");
const totalText = document.getElementById("total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;

cart.forEach(item => {
  total += item.harga;

  const div = document.createElement("div");
  div.className = "item";

  div.innerHTML = `
    <span>${item.nama}</span>
    <span>Rp ${item.harga}</span>
  `;

  list.appendChild(div);
});

totalText.innerText = "Total: Rp " + total;

function checkout() {
  alert("Pembayaran berhasil! 🎉");

  localStorage.removeItem("cart");

  window.location.href = "index.html";
}