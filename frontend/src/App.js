import React, { useState, useEffect } from 'react';
import {
  getEstudiantes,
  createEstudiante,
  updateEstudiante,
  deleteEstudiante,
  syncPostgresToMongo,
  syncMongoToPostgres
} from './api/estudiantesApi';

import { EstudianteList } from './components/EstudianteList';
import { EstudianteForm } from './components/EstudianteForm';
import { SyncButtons } from './components/SyncButtons';
import './App.css';

function App() {

  const [estudiantes, setEstudiantes] = useState([]);
  const [editEstudiante, setEditEstudiante] = useState(null);

  const fetchData = async () => setEstudiantes(await getEstudiantes());

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (data) => {

    if (data.id) {
      await updateEstudiante(data.id, data);
      alert('Se editó correctamente');
    } else {
      await createEstudiante(data);
      alert('Se creó correctamente');
    }

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

  <>
    <header>
      <h1>Gestión de Estudiantes</h1>
      <p>Administración y sincronización de datos</p>
    </header>

    <main>

      <div className="card">
        <SyncButtons
          onSyncPGtoMongo={handleSyncPGtoMongo}
          onSyncMongoToPG={handleSyncMongoToPG}
        />
      </div>

      <div className="card">
        <EstudianteForm
          estudiante={editEstudiante}
          onSave={handleSave}
          onCancel={() => setEditEstudiante(null)}
        />
      </div>

      <div className="card">
        <EstudianteList
          estudiantes={estudiantes}
          onEdit={setEditEstudiante}
          onDelete={handleDelete}
        />
      </div>

    </main>
  </>
);
}

export default App;
