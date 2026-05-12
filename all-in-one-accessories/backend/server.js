const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// DATA SEMENTARA (ganti database)
let products = [];

// GET
app.get("/api/products", (req, res) => {
  res.json(products);
});

// POST
app.post("/api/products", (req, res) => {
  products.push(req.body);
  res.json({ message: "Produk ditambah!" });
});

// DELETE
app.delete("/api/products/:index", (req, res) => {
  products.splice(req.params.index, 1);
  res.json({ message: "Produk dihapus!" });
});

app.listen(3000, () => {
  console.log("Server jalan di http://localhost:3000");
});