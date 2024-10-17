import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';

const Insumo = () => {
  const [insumos, setInsumos] = useState([
    { id: 1, nombre: 'Pescado', unidad: 'Kg' },
    { id: 2, nombre: 'Limón', unidad: 'Unidades' },
    { id: 3, nombre: 'Cebolla', unidad: 'Kg' },
  ]);

  const { register, handleSubmit, reset } = useForm();
  const [editingIndex, setEditingIndex] = useState(null);

  const unidades = [
    'Kg',
    'Unidades',
    'Litros',
    'Gramos',
    'Tazas',
    'Cucharadas',
    'Piezas',
    'Porciones',
    'Cajas',
    'Paquetes',
    'Botellas',
  ];

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
      <h1>Gestión de Insumos</h1>
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
                  <label className="form-label">Nombre</label>
                  <input
                    {...register('nombre', { required: true })}
                    className="form-control"
                    placeholder="Nombre"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Unidad</label>
                  <select
                    {...register('unidad', { required: true })}
                    className="form-select"
                  >
                    <option value="">Selecciona una unidad</option>
                    {unidades.map((unidad, index) => (
                      <option key={index} value={unidad}>
                        {unidad}
                      </option>
                    ))}
                  </select>
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
            <th>Unidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {insumos.map((insumo, index) => (
            <tr key={insumo.id}>
              <td>{insumo.id}</td>
              <td>{insumo.nombre}</td>
              <td>{insumo.unidad}</td>
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

export default Insumo;
