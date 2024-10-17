import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';

const Ceviche = () => {
  const [ceviches, setCeviches] = useState([
    { id: 1, nombre: 'Ceviche Clásico', precio: 15.00 },
    { id: 2, nombre: 'Ceviche Mixto', precio: 20.00 },
    { id: 3, nombre: 'Ceviche de Pulpo', precio: 18.50 },
    { id: 4, nombre: 'Ceviche de Camarones', precio: 22.00 },
    { id: 5, nombre: 'Ceviche de Lenguado', precio: 19.00 },
    { id: 6, nombre: 'Ceviche de Conchas', precio: 25.00 },
  ]);

  const { register, handleSubmit, reset } = useForm();
  const [editingIndex, setEditingIndex] = useState(null);

  const onSubmit = (data) => {
    const precioNum = parseFloat(data.precio); // Convierte el precio a número

    if (editingIndex !== null) {
      const updatedCeviches = [...ceviches];
      updatedCeviches[editingIndex] = { id: updatedCeviches[editingIndex].id, ...data, precio: precioNum }; // Asegúrate de asignar el precio convertido
      setCeviches(updatedCeviches);
      setEditingIndex(null);
    } else {
      setCeviches([...ceviches, { id: ceviches.length + 1, ...data, precio: precioNum }]); // Asegúrate de asignar el precio convertido
    }
    reset();
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    reset(ceviches[index]);
  };

  const handleDelete = (index) => {
    setCeviches(ceviches.filter((_, i) => i !== index));
  };

  return (
    <div className="container mt-4">
      <h1>Gestión de Ceviches</h1>
      <button
        className="btn btn-success mb-3"
        data-bs-toggle="modal"
        data-bs-target="#addCevicheModal"
      >
        Agregar Ceviche
      </button>

      {/* Formulario Modal */}
      <div
        className="modal fade"
        id="addCevicheModal"
        tabIndex="-1"
        aria-labelledby="addCevicheModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addCevicheModalLabel">
                {editingIndex !== null ? 'Editar Ceviche' : 'Agregar Ceviche'}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label className="form-label">Nombre del Ceviche</label>
                  <input
                    {...register('nombre', { required: true })}
                    className="form-control"
                    placeholder="Nombre del Ceviche"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Precio</label>
                  <input
                    {...register('precio', { required: true })}
                    type="number"
                    className="form-control"
                    placeholder="Precio"
                    step="0.01"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  {editingIndex !== null ? 'Editar' : 'Agregar'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla */}
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ceviches.map((ceviche, index) => (
            <tr key={ceviche.id}>
              <td>{ceviche.id}</td>
              <td>{ceviche.nombre}</td>
              <td>{`S/ ${ceviche.precio.toFixed(2)}`}</td> {/* Formato de precio */}
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEdit(index)}
                  data-bs-toggle="modal"
                  data-bs-target="#addCevicheModal"
                >
                  Editar
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(index)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ceviche;
