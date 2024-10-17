import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';

const Proveedores = () => {
  const [proveedores, setProveedores] = useState([
    { id: 1, nombre: 'Proveedores 1', contacto: 'contacto1@ejemplo.com' },
    { id: 2, nombre: 'Proveedores 2', contacto: 'contacto2@ejemplo.com' },
  ]);

  const { register, handleSubmit, reset } = useForm();
  const [editingIndex, setEditingIndex] = useState(null);

  const onSubmit = (data) => {
    if (editingIndex !== null) {
      const updatedProveedores = [...proveedores];
      updatedProveedores[editingIndex] = { id: updatedProveedores[editingIndex].id, ...data };
      setProveedores(updatedProveedores);
      setEditingIndex(null);
    } else {
      setProveedores([...proveedores, { id: proveedores.length + 1, ...data }]);
    }
    reset();
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    reset(proveedores[index]);
  };

  const handleDelete = (index) => {
    setProveedores(proveedores.filter((_, i) => i !== index));
  };

  return (
    <div className="container mt-4">
      <h1>Gestión de Proveedores</h1>
      <button
        className="btn btn-success mb-3"
        data-bs-toggle="modal"
        data-bs-target="#addProveedorModal"
      >
        Agregar Proveedor
      </button>

      {/* Formulario Modal */}
      <div
        className="modal fade"
        id="addProveedorModal"
        tabIndex="-1"
        aria-labelledby="addProveedorModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addProveedorModalLabel">
                {editingIndex !== null ? 'Editar Proveedor' : 'Agregar Proveedor'}
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
                  <label className="form-label">Contacto</label>
                  <input
                    {...register('contacto', { required: true })}
                    type="email"
                    className="form-control"
                    placeholder="Contacto"
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
            <th>Contacto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((proveedor, index) => (
            <tr key={proveedor.id}>
              <td>{proveedor.id}</td>
              <td>{proveedor.nombre}</td>
              <td>{proveedor.contacto}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEdit(index)}
                  data-bs-toggle="modal"
                  data-bs-target="#addProveedorModal"
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

export default Proveedores;
