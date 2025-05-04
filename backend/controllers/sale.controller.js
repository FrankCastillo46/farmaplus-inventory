const Sale = require('../models/sale.model');

exports.getAll = (req, res) => {
  Sale.findAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getById = (req, res) => {
  const { id } = req.params;
  Sale.findById(id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (!results.length) return res.status(404).json({ message: 'No encontrado' });
    res.json(results[0]);
  });
};

exports.create = (req, res) => {
  Sale.create(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

exports.update = (req, res) => {
  const { id } = req.params;
  Sale.update(id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Actualizado correctamente' });
  });
};

exports.remove = (req, res) => {
  const { id } = req.params;
  Sale.delete(id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Eliminado correctamente' });
  });
};
