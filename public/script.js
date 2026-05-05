const estado = document.getElementById('estado');
const tbody = document.querySelector('#tablaInasistencias tbody');

function setEstado(mensaje, esError = false) {
  estado.textContent = mensaje;
  estado.style.color = esError ? '#b91c1c' : '#374151';
}

function limpiarTabla() {
  tbody.innerHTML = '';
}

function formatearFecha(valor) {
  if (!valor) return '';
  const fecha = new Date(valor);
  if (Number.isNaN(fecha.getTime())) return String(valor);
  return fecha.toISOString().split('T')[0];
}

function renderTabla(rows) {
  limpiarTabla();

  if (!rows.length) {
    setEstado('Consulta exitosa, pero no hay registros para mostrar.');
    return;
  }

  rows.forEach((row) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${row.id_estudiante ?? ''}</td>
      <td>${row.nombre_estudiante ?? ''}</td>
      <td>${row.grado ?? ''}</td>
      <td>${formatearFecha(row.fecha)}</td>
      <td>${row.asunto ?? ''}</td>
      <td>${row.acudiente ?? ''}</td>
      <td>${row.celular ?? ''}</td>
    `;
    tbody.appendChild(tr);
  });

  setEstado(`Se cargaron ${rows.length} registros.`);
}

async function cargarInasistencias() {
  setEstado('Consultando registros de inasistencia...');

  try {
    const response = await fetch('/api/inasistencias');
    const payload = await response.json();

    if (!response.ok || !payload.success) {
      throw new Error(payload.message || 'Error al consultar /api/inasistencias');
    }

    renderTabla(payload.data || []);
  } catch (error) {
    limpiarTabla();
    setEstado(`Error al cargar datos: ${error.message}`, true);
  }
}

// ── Al cargar la pagina: traer datos de la BD
document.addEventListener('DOMContentLoaded', cargarInasistencias);
