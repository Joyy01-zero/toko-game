const list = document.getElementById("cart-list");
const totalText = document.getElementById("total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;

cart.forEach((item, index) => {
  total += item.harga;

  const div = document.createElement("div");
  div.className = "item";

  div.innerHTML = `
    <span>${item.nama}</span>
    <span>Rp ${item.harga}</span>
    <button onclick="hapus(${index})">❌</button>
  `;

  list.appendChild(div);
});

totalText.innerText = "Total: Rp " + total;

function hapus(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}