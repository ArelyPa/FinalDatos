const express = require('express');
const router = express.Router();

const { getAllEstudiantes, upsertEstudiante } = require('../services/postgres.service');
const { getAllEstudiantesMongo, upsertEstudianteMongo } = require('../services/mongo.service');
const { transformPostgresToMongo } = require('../services/transform.service');

/**
 * 🔁 PostgreSQL → MongoDB
 */
router.post('/postgres-to-mongo', async (req, res) => {
  try {
    const estudiantes = await getAllEstudiantes();

    for (const est of estudiantes) {
      const doc = transformPostgresToMongo(est);
      await upsertEstudianteMongo(doc);
    }

    res.json({
      mensaje: 'Sincronización PostgreSQL → MongoDB completada',
      total: estudiantes.length,
      fecha: new Date()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * 🔁 MongoDB → PostgreSQL
 */
router.post('/mongo-to-postgres', async (req, res) => {
  try {
    const estudiantesMongo = await getAllEstudiantesMongo();

    for (const doc of estudiantesMongo) {
      const data = {
        id: doc.estudianteId,
        nombre: doc.nombre,
        apellido: doc.apellido,
        materia: doc.materias[0].nombre,
        nota1: doc.materias[0].nota1,
        nota2: doc.materias[0].nota2,
        ultima_actualizacion: doc.ultimaActualizacion
      };

      await upsertEstudiante(data);
    }

    res.json({
      mensaje: 'Sincronización MongoDB → PostgreSQL completada',
      total: estudiantesMongo.length,
      fecha: new Date()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
