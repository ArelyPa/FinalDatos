const BASE_URL = 'http://localhost:3001/api';

// 🔹 Estudiantes CRUD
export const getEstudiantes = async () => {
  const res = await fetch(`${BASE_URL}/estudiantes`);
  return res.json();
};

export const createEstudiante = async (data) => {
  const res = await fetch(`${BASE_URL}/estudiantes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const updateEstudiante = async (id, data) => {
  const res = await fetch(`${BASE_URL}/estudiantes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const deleteEstudiante = async (id) => {
  const res = await fetch(`${BASE_URL}/estudiantes/${id}`, {
    method: 'DELETE'
  });
  return res.json();
};

// 🔹 Sincronización
export const syncPostgresToMongo = async () => {
  const res = await fetch(`${BASE_URL}/sync/postgres-to-mongo`, {
    method: 'POST'
  });
  return res.json();
};

export const syncMongoToPostgres = async () => {
  const res = await fetch(`${BASE_URL}/sync/mongo-to-postgres`, {
    method: 'POST'
  });
  return res.json();
};
