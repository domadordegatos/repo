// ─────────────────────────────────────────────
// Rutas de inasistencias
// Solo mapea URLs a funciones del controlador
// ─────────────────────────────────────────────
const express    = require('express');
const router     = express.Router();
const controller = require('../controllers/inasistenciasController');

// GET  /api/inasistencias  → listar todos
router.get('/', controller.listar);

// POST /api/inasistencias  → agregar uno nuevo
router.post('/', controller.agregar);

module.exports = router;
