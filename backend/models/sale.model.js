const connection = require('../db');

const Sale = {
  findAll: (cb) => {
    connection.query('SELECT * FROM ventas', cb);
  },
  findById: (id, cb) => {
    connection.query('SELECT * FROM ventas WHERE id = ?', [id], cb);
  },
  create: (data, cb) => {
    // 1) Inserta la venta
    connection.query(
      'INSERT INTO ventas (producto_id, cantidad, total, fecha) VALUES (?, ?, ?, ?)',
      [data.producto_id, data.cantidad, data.total, data.fecha],
      (err, result) => {
        if (err) return cb(err);

        // 2) Actualiza el stock del producto
        connection.query(
          'UPDATE productos SET stock = stock - ? WHERE id = ?',
          [data.cantidad, data.producto_id],
          updateErr => {
            if (updateErr) return cb(updateErr);
            cb(null, result);
          }
        );
      }
    );
  },
  update: (id, data, cb) => {
    connection.query(
      'UPDATE ventas SET producto_id = ?, cantidad = ?, total = ?, fecha = ? WHERE id = ?',
      [data.producto_id, data.cantidad, data.total, data.fecha, id],
      cb
    );
  },
  delete: (id, cb) => {
    connection.query('DELETE FROM ventas WHERE id = ?', [id], cb);
  },
};

module.exports = Sale;