const Product = require('../models/product.model');

exports.getAll = (req, res) => {
  Product.findAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getById = (req, res) => {
  const { id } = req.params;
  Product.findById(id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (!results.length) return res.status(404).json({ message: 'No encontrado' });
    res.json(results[0]);
  });
};

exports.create = (req, res) => {
  const data = req.body;
  Product.create(data, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, ...data });
  });
};

exports.update = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  Product.update(id, data, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Actualizado correctamente' });
  });
};

exports.remove = (req, res) => {
  const { id } = req.params;
  Product.delete(id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Eliminado correctamente' });
  });
};
