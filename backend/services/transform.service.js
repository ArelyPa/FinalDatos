// 🔁 PostgreSQL → MongoDB
const transformPostgresToMongo = (row) => {
  return {
    estudianteId: row.id,
    nombre: row.nombre,
    apellido: row.apellido,
    materias: [
      {
        nombre: row.materia,
        nota1: row.nota1,
        nota2: row.nota2
      }
    ],
    ultimaActualizacion: row.ultima_actualizacion
  };
};

// 🔁 MongoDB → PostgreSQL
const transformMongoToPostgres = (doc) => {
  const materia = doc.materias[0]; // regla: se usa la primera materia

  return {
    id: doc.estudianteId,
    nombre: doc.nombre,
    apellido: doc.apellido,
    materia: materia.nombre,
    nota1: materia.nota1,
    nota2: materia.nota2,
    ultima_actualizacion: doc.ultimaActualizacion
  };
};

module.exports = {
  transformPostgresToMongo,
  transformMongoToPostgres
};
