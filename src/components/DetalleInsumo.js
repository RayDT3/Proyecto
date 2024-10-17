import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';

const DetalleInsumo = () => {
  const [insumos, setInsumos] = useState([
    { id: 1, ID_INSUMO: 1, NOMBRE: 'Tomate', CANTIDAD: 50, UNIDMED: 'kg', PRECIO: 1.50, LIMIT_DURACION: '2024-10-20', ID_CATEGORIA: 1 },
    { id: 2, ID_INSUMO: 2, NOMBRE: 'Cebolla', CANTIDAD: 30, UNIDMED: 'kg', PRECIO: 0.80, LIMIT_DURACION: '2024-10-25', ID_CATEGORIA: 2 },
    { id: 3, ID_INSUMO: 3, NOMBRE: 'Pescado', CANTIDAD: 20, UNIDMED: 'kg', PRECIO: 15.00, LIMIT_DURACION: '2024-11-01', ID_CATEGORIA: 3 },
    { id: 4, ID_INSUMO: 4, NOMBRE: 'Limón', CANTIDAD: 100, UNIDMED: 'kg', PRECIO: 2.00, LIMIT_DURACION: '2024-10-30', ID_CATEGORIA: 1 },
    { id: 5, ID_INSUMO: 5, NOMBRE: 'Perejil', CANTIDAD: 10, UNIDMED: 'kg', PRECIO: 5.00, LIMIT_DURACION: '2024-11-05', ID_CATEGORIA: 2 },
    { id: 6, ID_INSUMO: 6, NOMBRE: 'Ajo', CANTIDAD: 25, UNIDMED: 'kg', PRECIO: 3.00, LIMIT_DURACION: '2024-10-28', ID_CATEGORIA: 3 },
  ]);

  const { register, handleSubmit, reset } = useForm();
  const [editingIndex, setEditingIndex] = useState(null);

  const onSubmit = (data) => {
    if (editingIndex !== null) {
      const updatedInsumos = [...insumos];
      updatedInsumos[editingIndex] = { id: updatedInsumos[editingIndex].id, ...data };
      setInsumos(updatedInsumos);
      setEditingIndex(null);
    } else {
      setInsumos([...insumos, { id: insumos.length + 1, ...data }]);
    }
    reset();
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    reset(insumos[index]);
  };

  const handleDelete = (index) => {
    setInsumos(insumos.filter((_, i) => i !== index));
  };

  return (
    <div className="container mt-4">
      <h1>Gestión de Detalle de Insumos</h1>
      <button
        className="btn btn-success mb-3"
        data-bs-toggle="modal"
        data-bs-target="#addInsumoModal"
      >
        Agregar Insumo
      </button>

      {/* Formulario Modal */}
      <div
        className="modal fade"
        id="addInsumoModal"
        tabIndex="-1"
        aria-labelledby="addInsumoModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addInsumoModalLabel">
                {editingIndex !== null ? 'Editar Insumo' : 'Agregar Insumo'}
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
                  <label className="form-label">ID Insumo</label>
                  <input
                    {...register('ID_INSUMO', { required: true })}
                    type="number"
                    className="form-control"
                    placeholder="ID del Insumo"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input
                    {...register('NOMBRE', { required: true })}
                    type="text"
                    className="form-control"
                    placeholder="Nombre del Insumo"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Cantidad</label>
                  <input
                    {...register('CANTIDAD', { required: true })}
                    type="number"
                    className="form-control"
                    placeholder="Cantidad"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Unidad de Medida</label>
                  <input
                    {...register('UNIDMED', { required: true })}
                    type="text"
                    className="form-control"
                    placeholder="Unidad de Medida"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Precio</label>
                  <input
                    {...register('PRECIO', { required: true })}
                    type="number"
                    step="0.01"
                    className="form-control"
                    placeholder="Precio"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Límite de Duración</label>
                  <input
                    {...register('LIMIT_DURACION', { required: true })}
                    type="date"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">ID Categoría</label>
                  <input
                    {...register('ID_CATEGORIA', { required: true })}
                    type="number"
                    className="form-control"
                    placeholder="ID de Categoría"
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
            <th>ID Insumo</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Unidad de Medida</th>
            <th>Precio</th>
            <th>Límite de Duración</th>
            <th>ID Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {insumos.map((insumo, index) => (
            <tr key={insumo.id}>
              <td>{insumo.id}</td>
              <td>{insumo.ID_INSUMO}</td>
              <td>{insumo.NOMBRE}</td>
              <td>{insumo.CANTIDAD}</td>
              <td>{insumo.UNIDMED}</td>
              <td>{`S/ ${Number(insumo.PRECIO).toFixed(2)}`}</td> {/* Precio en soles */}
              <td>{new Date(insumo.LIMIT_DURACION).toLocaleDateString()}</td>
              <td>{insumo.ID_CATEGORIA}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEdit(index)}
                  data-bs-toggle="modal"
                  data-bs-target="#addInsumoModal"
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

export default DetalleInsumo;
