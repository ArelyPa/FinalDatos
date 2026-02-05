const connectMongo = require('../config/mongo');

// 🔹 Obtener colección estudiantes
const getCollection = async () => {
  const db = await connectMongo();
  return db.collection('estudiantes');
};

// 🔹 Obtener todos los documentos
const getAllEstudiantesMongo = async () => {
  const collection = await getCollection();
  return await collection.find().toArray();
};

// 🔁 Insertar o actualizar estudiante (UPSERT)
const upsertEstudianteMongo = async (estudiante) => {
  const collection = await getCollection();

  await collection.updateOne(
    { estudianteId: estudiante.estudianteId },
    { $set: estudiante },
    { upsert: true }
  );

  return estudiante;
};

module.exports = {
  getAllEstudiantesMongo,
  upsertEstudianteMongo
};
