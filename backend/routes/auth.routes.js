const express   = require('express');
const { body }  = require('express-validator');
const router    = express.Router();
const ctrl      = require('../controllers/auth.controller');

router.post(
  '/login',
  body('nombre_usuario').notEmpty(),
  body('password').notEmpty(),
  ctrl.login
);

module.exports = router;
