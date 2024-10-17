import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: 'Usuario 1', email: 'usuario1@ejemplo.com' },
    { id: 2, nombre: 'Usuario 2', email: 'usuario2@ejemplo.com' },
  ]);

  const { register, handleSubmit, reset } = useForm();
  const [editingIndex, setEditingIndex] = useState(null);

  const onSubmit = (data) => {
    if (editingIndex !== null) {
      const updatedUsuarios = [...usuarios];
      updatedUsuarios[editingIndex] = { id: updatedUsuarios[editingIndex].id, ...data };
      setUsuarios(updatedUsuarios);
      setEditingIndex(null);
    } else {
      setUsuarios([...usuarios, { id: usuarios.length + 1, ...data }]);
    }
    reset();
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    reset(usuarios[index]);
  };

  const handleDelete = (index) => {
    setUsuarios(usuarios.filter((_, i) => i !== index));
  };

  return (
    <div className="container mt-4">
      <h1>Gestión de Usuarios</h1>
      <button
        className="btn btn-success mb-3"
        data-bs-toggle="modal"
        data-bs-target="#addUsuarioModal"
      >
        Agregar Usuario
      </button>

      {/* Formulario Modal */}
      <div
        className="modal fade"
        id="addUsuarioModal"
        tabIndex="-1"
        aria-labelledby="addUsuarioModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addUsuarioModalLabel">
                {editingIndex !== null ? 'Editar Usuario' : 'Agregar Usuario'}
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
                  <label className="form-label">Email</label>
                  <input
                    {...register('email', { required: true })}
                    type="email"
                    className="form-control"
                    placeholder="Email"
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
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario, index) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.email}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEdit(index)}
                  data-bs-toggle="modal"
                  data-bs-target="#addUsuarioModal"
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

export default Usuarios;
