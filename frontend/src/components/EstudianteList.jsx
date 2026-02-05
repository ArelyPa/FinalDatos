import React from 'react';

export const EstudianteList = ({ estudiantes, onEdit, onDelete }) => {
  return (
    <div>
      <h2>Lista de Estudiantes</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Materia</th>
            <th>Nota 1</th>
            <th>Nota 2</th>
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
              <td>
                <button onClick={() => onEdit(est)}>Editar</button>
                <button onClick={() => onDelete(est.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
