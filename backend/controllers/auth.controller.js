const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/user.model");

const JWT_SECRET = process.env.JWT_SECRET || "tu_secreto";

exports.login = (req, res) => {
    console.log("Login request body:", req.body);
    const { nombre_usuario, password } = req.body;
  
    User.findByUsername(nombre_usuario, (err, users) => {
      if (err) return res.status(500).json({ error: err });
      if (!users.length) return res.status(400).json({ message: "Usuario no encontrado" });
  
      const user = users[0];
      console.log("Hash en BD:", user.password);
  
      const storedHash = user.password.trim();
      console.log("Hash en BD (trimmed):", `"${storedHash}"`);
  
      const match = bcrypt.compareSync(password, storedHash);
      console.log("Resultado compareSync:", match);
  
      if (!match) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }

    const token = jwt.sign({ id: user.id, role: user.rol }, JWT_SECRET, {
      expiresIn: "8h",
    });
    res.json({ token, role: user.rol, username: user.nombre_usuario });
  });
};
