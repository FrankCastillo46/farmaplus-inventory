const connection = require('../db');

const User = {
  findByUsername: (username, cb) => {
    connection.query(
      'SELECT * FROM usuarios WHERE nombre_usuario = ?',
      [username],
      cb
    );
  }
};

module.exports = User;
