const mysql = require('mysql2/promise');
require('dotenv').config();

const connection = mysql.createPool({
   host: 'localhost',
   port: 3306,
   user: process.env.USUARIO_BD || 'root',
   password: process.env.SENHA_BD || '',
   database: 'financeiro'
});

module.exports = connection;
