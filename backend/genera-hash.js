const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync('admin123', 6);
console.log(hash);
