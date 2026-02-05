import React, { useState, useEffect } from 'react';
import { getEstudiantes, createEstudiante, updateEstudiante, deleteEstudiante, syncPostgresToMongo, syncMongoToPostgres } from './api/estudiantesApi';
import { EstudianteList } from './components/EstudianteList';
import { EstudianteForm } from './components/EstudianteForm';
import { SyncButtons } from './components/SyncButtons';

function App() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [editEstudiante, setEditEstudiante] = useState(null);

  const fetchData = async () => setEstudiantes(await getEstudiantes());

  useEffect(() => { fetchData(); }, []);

  const handleSave = async (data) => {
    if (data.id) await updateEstudiante(data.id, data);
    else await createEstudiante(data);
    setEditEstudiante(null);
    fetchData();
  };

  const handleDelete = async (id) => {
    await deleteEstudiante(id);
    fetchData();
  };

  const handleSyncPGtoMongo = async () => {
    await syncPostgresToMongo();
    alert('Sincronización PostgreSQL → MongoDB completada');
  };

  const handleSyncMongoToPG = async () => {
    await syncMongoToPostgres();
    fetchData(); 
    alert('Sincronización MongoDB → PostgreSQL completada');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Gestión de Estudiantes</h1>
      <SyncButtons onSyncPGtoMongo={handleSyncPGtoMongo} onSyncMongoToPG={handleSyncMongoToPG} />
      <EstudianteForm estudiante={editEstudiante} onSave={handleSave} onCancel={() => setEditEstudiante(null)} />
      <EstudianteList estudiantes={estudiantes} onEdit={setEditEstudiante} onDelete={handleDelete} />
    </div>
  );
}

export default App;
