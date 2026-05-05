// ─────────────────────────────────────────────
// app.js — Punto de entrada del servidor
// Solo configura Express y registra las rutas
// ─────────────────────────────────────────────
const express = require('express');
require('dotenv').config();

const inasistenciasRoutes = require('./routes/inasistencias');

const app      = express();
const APP_PORT = Number(process.env.APP_PORT || 3000);

// Permite recibir JSON en el body de las peticiones (POST)
app.use(express.json());

// Sirve los archivos de la carpeta public/ como sitio web
app.use(express.static('public'));

// Rutas de la API
app.use('/api/inasistencias', inasistenciasRoutes);

app.listen(APP_PORT, () => {
  console.log(`Servidor listo en http://localhost:${APP_PORT}`);
});
