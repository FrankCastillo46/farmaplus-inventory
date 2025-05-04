const connection = require("../db");

const Product = {
  findAll: (cb) => {
    connection.query("SELECT * FROM productos", cb);
  },
  findById: (id, cb) => {
    connection.query("SELECT * FROM productos WHERE id = ?", [id], cb);
  },
  create: (data, cb) => {
    connection.query(
      `INSERT INTO productos 
         (nombre, descripcion, precio, stock, umbral_alerta) 
       VALUES (?, ?, ?, ?, ?)`,
      [data.nombre, data.descripcion, data.precio, data.stock, data.umbral_alerta],
      cb
    );
  },
  update: (id, data, cb) => {
    connection.query(
      `UPDATE productos 
         SET nombre = ?, descripcion = ?, precio = ?, stock = ?, umbral_alerta = ?
       WHERE id = ?`,
      [data.nombre, data.descripcion, data.precio, data.stock, data.umbral_alerta, id],
      cb
    );
  },
  delete: (id, cb) => {
    connection.query("DELETE FROM productos WHERE id = ?", [id], cb);
  },
  findLowStock: (cb) => {
    connection.query(
      "SELECT id, nombre, stock, umbral_alerta FROM productos WHERE stock <= umbral_alerta",
      cb
    );
  },
};

module.exports = Product;
