const express = require("express");
const cors = require("cors");
const connection = require("./db");
const productRoutes = require("./routes/product.routes");
const saleRoutes = require("./routes/sale.routes");
const alertRoutes = require("./routes/alert.routes");
const authRoutes = require("./routes/auth.routes");
const { protect, admin } = require("./middleware/auth.middleware");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json()); // Esto permite leer JSON en req.body
app.use(express.urlencoded({ extended: true })); // Opcional: para formularios

app.use("/api/productos", productRoutes);
app.use("/api/ventas", saleRoutes);
app.use("/api/alertas", alertRoutes);
app.use("/api/auth", authRoutes);

// Protege las rutas de productos: solo admin puede crear/editar/borrar
app.use(
  "/api/productos",
  protect,
  (req, res, next) => {
    if (req.method !== "GET" && req.user.role !== "admin") {
      return res.status(403).json({ message: "Solo admin" });
    }
    next();
  },
  require("./routes/product.routes")
);

// Ventas puede cualquiera autenticado
app.use("/api/ventas", protect, require("./routes/sale.routes"));

// Alertas y Dashboard (GET) puede cualquiera autenticado
app.use("/api/alertas", protect, require("./routes/alert.routes"));

app.get("/", (req, res) => {
  res.send("API Farmaplus funcionando");
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
