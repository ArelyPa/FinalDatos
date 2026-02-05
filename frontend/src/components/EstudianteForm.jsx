import React, { useState, useEffect } from 'react';

export const EstudianteForm = ({ estudiante, onSave, onCancel }) => {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    materia: '',
    nota1: '',
    nota2: ''
  });

  useEffect(() => {
    if (estudiante) {
      setForm(estudiante);
    } else {
      setForm({ nombre: '', apellido: '', materia: '', nota1: '', nota2: '' });
    }
  }, [estudiante]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div>
      <h2>{estudiante ? 'Editar Estudiante' : 'Agregar Estudiante'}</h2>
      <form onSubmit={handleSubmit}>
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
        <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange} required />
        <input name="materia" placeholder="Materia" value={form.materia} onChange={handleChange} required />
        <input type="number" name="nota1" placeholder="Nota 1" value={form.nota1} onChange={handleChange} required />
        <input type="number" name="nota2" placeholder="Nota 2" value={form.nota2} onChange={handleChange} required />
        <button type="submit">{estudiante ? 'Actualizar' : 'Crear'}</button>
        {estudiante && <button type="button" onClick={onCancel}>Cancelar</button>}
      </form>
    </div>
  );
};
