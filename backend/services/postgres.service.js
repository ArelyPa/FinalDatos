const pool = require('../config/postgres');

// 🔹 Obtener todos los estudiantes
const getAllEstudiantes = async () => {
  const result = await pool.query(
    'SELECT * FROM estudiantes ORDER BY id'
  );
  return result.rows;
};

// 🔹 Crear estudiante (CRUD)
const createEstudiante = async (data) => {
  const { nombre, apellido, materia, nota1, nota2 } = data;

  const result = await pool.query(
    `INSERT INTO estudiantes
     (nombre, apellido, materia, nota1, nota2)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [nombre, apellido, materia, nota1, nota2]
  );

  return result.rows[0];
};

// 🔹 Actualizar estudiante (CRUD)
const updateEstudiante = async (id, data) => {
  const { nombre, apellido, materia, nota1, nota2 } = data;

  const result = await pool.query(
    `UPDATE estudiantes
     SET nombre=$1, apellido=$2, materia=$3,
         nota1=$4, nota2=$5,
         ultima_actualizacion=CURRENT_TIMESTAMP
     WHERE id=$6
     RETURNING *`,
    [nombre, apellido, materia, nota1, nota2, id]
  );

  return result.rows[0];
};

// 🔹 Eliminar estudiante (CRUD)
const deleteEstudiante = async (id) => {
  await pool.query(
    'DELETE FROM estudiantes WHERE id=$1',
    [id]
  );
  return { message: 'Estudiante eliminado' };
};

// 🔁 UPSERT para sincronización MongoDB → PostgreSQL
const upsertEstudiante = async (data) => {
  const {
    id,
    nombre,
    apellido,
    materia,
    nota1,
    nota2,
    ultima_actualizacion
  } = data;

  const result = await pool.query(
    `
    INSERT INTO estudiantes (id, nombre, apellido, materia, nota1, nota2, ultima_actualizacion)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT (id)
    DO UPDATE SET
      nombre = EXCLUDED.nombre,
      apellido = EXCLUDED.apellido,
      materia = EXCLUDED.materia,
      nota1 = EXCLUDED.nota1,
      nota2 = EXCLUDED.nota2,
      ultima_actualizacion = EXCLUDED.ultima_actualizacion
    WHERE estudiantes.ultima_actualizacion < EXCLUDED.ultima_actualizacion
    RETURNING *;
    `,
    [id, nombre, apellido, materia, nota1, nota2, ultima_actualizacion]
  );

  return result.rows[0];
};

module.exports = {
  getAllEstudiantes,
  createEstudiante,
  updateEstudiante,
  deleteEstudiante,
  upsertEstudiante
};
