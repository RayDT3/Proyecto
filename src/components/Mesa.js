import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';

const Mesa = () => {
  const [mesas, setMesas] = useState([
    { id: 1, numero: 1, capacidad: 4 },
    { id: 2, numero: 2, capacidad: 2 },
    { id: 3, numero: 3, capacidad: 6 },
  ]);

  const { register, handleSubmit, reset } = useForm();
  const [editingIndex, setEditingIndex] = useState(null);

  const onSubmit = (data) => {
    if (editingIndex !== null) {
      const updatedMesas = [...mesas];
      updatedMesas[editingIndex] = { id: updatedMesas[editingIndex].id, ...data };
      setMesas(updatedMesas);
      setEditingIndex(null);
    } else {
      setMesas([...mesas, { id: mesas.length + 1, ...data }]);
    }
    reset();
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    reset(mesas[index]);
  };

  const handleDelete = (index) => {
    setMesas(mesas.filter((_, i) => i !== index));
  };

  return (
    <div className="container mt-4">
      <h1>Gestión de Mesas</h1>
      <button
        className="btn btn-success mb-3"
        data-bs-toggle="modal"
        data-bs-target="#addMesaModal"
      >
        Agregar Mesa
      </button>

      {/* Formulario Modal */}
      <div
        className="modal fade"
        id="addMesaModal"
        tabIndex="-1"
        aria-labelledby="addMesaModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addMesaModalLabel">
                {editingIndex !== null ? 'Editar Mesa' : 'Agregar Mesa'}
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
                  <label className="form-label">Número</label>
                  <input
                    {...register('numero', { required: true })}
                    type="number"
                    className="form-control"
                    placeholder="Número de Mesa"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Capacidad</label>
                  <input
                    {...register('capacidad', { required: true })}
                    type="number"
                    className="form-control"
                    placeholder="Capacidad"
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
            <th>Número</th>
            <th>Capacidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mesas.map((mesa, index) => (
            <tr key={mesa.id}>
              <td>{mesa.id}</td>
              <td>{mesa.numero}</td>
              <td>{mesa.capacidad}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEdit(index)}
                  data-bs-toggle="modal"
                  data-bs-target="#addMesaModal"
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

export default Mesa;
