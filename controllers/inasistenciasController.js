// ─────────────────────────────────────────────
// Controlador de inasistencias
// Aqui van todas las consultas SQL y la logica
// de cada accion: listar, agregar, etc.
// ─────────────────────────────────────────────
const pool = require('../db/connection');

// GET /api/inasistencias
// Lista todos los registros ordenados por id
async function listar(req, res) {
  try {
    const [filas] = await pool.query(`
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
    `);

    res.json({ success: true, data: filas });
  } catch (error) {
    console.error('listar():', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

// POST /api/inasistencias
// Recibe los datos del formulario y los inserta en la BD
async function agregar(req, res) {
  const { nombre_estudiante, grado, fecha, asunto, acudiente, celular } = req.body;

  // Validacion basica: todos los campos son requeridos
  if (!nombre_estudiante || !grado || !fecha || !asunto || !acudiente || !celular) {
    return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
  }

  try {
    // Como id_estudiante no es AUTO_INCREMENT, calculamos el siguiente id
    const [[{ maxId }]] = await pool.query(
      'SELECT COALESCE(MAX(id_estudiante), 0) AS maxId FROM registro_inasistencias_estudiantes'
    );
    const nuevoId = maxId + 1;

    const [resultado] = await pool.query(
      `INSERT INTO registro_inasistencias_estudiantes
         (id_estudiante, nombre_estudiante, grado, fecha, asunto, acudiente, celular)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nuevoId, nombre_estudiante, grado, fecha, asunto, acudiente, celular]
    );

    res.status(201).json({ success: true, id_insertado: resultado.insertId });
  } catch (error) {
    console.error('agregar():', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { listar, agregar };
