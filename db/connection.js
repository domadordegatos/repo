// ─────────────────────────────────────────────
// Conexion a TiDB usando un pool de mysql2
// Se crea una sola vez y se reutiliza en toda la app
// ─────────────────────────────────────────────
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host    : process.env.DB_HOST,
  port    : Number(process.env.DB_PORT || 4000),
  user    : process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit   : 10,
  queueLimit        : 0,
  ssl: { minVersion: 'TLSv1.2' }
});

module.exports = pool;
