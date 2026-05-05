const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const APP_PORT = Number(process.env.APP_PORT || 3000);

const dbConfig = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 4000),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    minVersion: 'TLSv1.2'
  }
};

const pool = mysql.createPool(dbConfig);

app.use(express.static('public'));

app.get('/api/health-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 AS ok');
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('Error en /api/health-db:', error.message);
    res.status(500).json({
      success: false,
      message: 'No se pudo conectar a TiDB',
      error: error.message
    });
  }
});

app.get('/api/inasistencias', async (req, res) => {
  try {
    const query = `
      SELECT
        id_estudiante,
        nombre_estudiante,
        grado,
        fecha,
        asunto,
        acudiente,
        celular
      FROM registro_inasistencias_estudiantes
      ORDER BY id_estudiante ASC
    `;

    const [rows] = await pool.query(query);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error en /api/inasistencias:', error.message);
    res.status(500).json({
      success: false,
      message: 'No se pudieron consultar las inasistencias',
      error: error.message
    });
  }
});

app.listen(APP_PORT, () => {
  console.log(`Servidor listo en http://localhost:${APP_PORT}`);
});
