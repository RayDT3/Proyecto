import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';

const Cliente = () => {
  const [clientes, setClientes] = useState([
    { id: 1, nombre: 'Juan', apellido: 'Pérez', dni: '12345678' },
    { id: 2, nombre: 'María', apellido: 'Gómez', dni: '23456789' },
    { id: 3, nombre: 'Luis', apellido: 'Martínez', dni: '34567890' },
    { id: 4, nombre: 'Ana', apellido: 'López', dni: '45678901' },
    { id: 5, nombre: 'Pedro', apellido: 'Díaz', dni: '56789012' },
    { id: 6, nombre: 'Sofía', apellido: 'Castillo', dni: '67890123' },
  ]);

  const { register, handleSubmit, reset } = useForm();
  const [editingIndex, setEditingIndex] = useState(null);

  const onSubmit = (data) => {
    if (editingIndex !== null) {
      const updatedClientes = [...clientes];
      updatedClientes[editingIndex] = { id: updatedClientes[editingIndex].id, ...data };
      setClientes(updatedClientes);
      setEditingIndex(null);
    } else {
      setClientes([...clientes, { id: clientes.length + 1, ...data }]);
    }
    reset();
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    reset(clientes[index]);
  };

  const handleDelete = (index) => {
    setClientes(clientes.filter((_, i) => i !== index));
  };

  return (
    <div className="container mt-4">
      <h1>Gestión de Clientes</h1>
      <button
        className="btn btn-success mb-3"
        data-bs-toggle="modal"
        data-bs-target="#addClienteModal"
      >
        Agregar Cliente
      </button>

      {/* Formulario Modal */}
      <div
        className="modal fade"
        id="addClienteModal"
        tabIndex="-1"
        aria-labelledby="addClienteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addClienteModalLabel">
                {editingIndex !== null ? 'Editar Cliente' : 'Agregar Cliente'}
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
                  <label className="form-label">Nombre</label>
                  <input
                    {...register('nombre', { required: true })}
                    className="form-control"
                    placeholder="Nombre"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Apellido</label>
                  <input
                    {...register('apellido', { required: true })}
                    className="form-control"
                    placeholder="Apellido"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">DNI</label>
                  <input
                    {...register('dni', { required: true })}
                    className="form-control"
                    placeholder="DNI"
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
            <th>Apellido</th>
            <th>DNI</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente, index) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.apellido}</td>
              <td>{cliente.dni}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEdit(index)}
                  data-bs-toggle="modal"
                  data-bs-target="#addClienteModal"
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

export default Cliente;
