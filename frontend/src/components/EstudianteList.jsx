import React, { useState } from 'react';

export const EstudianteList = ({ estudiantes, onEdit, onDelete }) => {

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    onDelete(selectedId);
    setShowModal(false);
  };

  return (
    <div>

      <h2 className="section-title">Lista de Estudiantes</h2>

      <table className="modern-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Materia</th>
            <th>Nota 1</th>
            <th>Nota 2</th>
            <th>Promedio</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {estudiantes.map(est => (
            <tr key={est.id}>
              <td>{est.id}</td>
              <td>{est.nombre}</td>
              <td>{est.apellido}</td>
              <td>{est.materia}</td>
              <td>{est.nota1}</td>
              <td>{est.nota2}</td>
              <td>{((Number(est.nota1) + Number(est.nota2)) / 2).toFixed(2)}</td>


              <td className="actions">
                <button className="btn edit-btn" onClick={() => onEdit(est)}>
                  Editar
                </button>

                <button className="btn delete-btn" onClick={() => handleDeleteClick(est.id)}>
                  Eliminar
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>


      {/* MODAL CONFIRMACION */}

      {showModal && (
        <div className="modal-overlay">

          <div className="modal-card">

            <h3>¿Deseas eliminar este estudiante?</h3>

            <div className="modal-buttons">

              <button className="btn secondary" onClick={() => setShowModal(false)}>
                Cancelar
              </button>

              <button className="btn delete-btn" onClick={confirmDelete}>
                Eliminar
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};
