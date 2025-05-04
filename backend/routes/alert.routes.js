const express = require('express');
const router = express.Router();
const ctrl   = require('../controllers/alert.controller');

router.get('/', ctrl.getLowStock);

module.exports = router;
