const Product = require('../models/product.model');

exports.getLowStock = (req, res) => {
  Product.findLowStock((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};
