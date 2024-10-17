import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';

const Ventas = () => {
  const [ventas, setVentas] = useState([
    { id: 1, total: 100, fecha: '2024-10-02' },
    { id: 2, total: 200, fecha: '2024-10-02' },
  ]);

  const { register, handleSubmit, reset } = useForm();
  const [editingIndex, setEditingIndex] = useState(null);

  const onSubmit = (data) => {
    const totalNumber = parseFloat(data.total); // Convertir a número
    if (isNaN(totalNumber)) {
      alert("El total debe ser un número válido."); // Manejo de error
      return;
    }

    if (editingIndex !== null) {
      const updatedVentas = [...ventas];
      updatedVentas[editingIndex] = { id: updatedVentas[editingIndex].id, total: totalNumber, fecha: data.fecha };
      setVentas(updatedVentas);
      setEditingIndex(null);
    } else {
      setVentas([...ventas, { id: ventas.length + 1, total: totalNumber, fecha: data.fecha }]);
    }
    reset();
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    reset(ventas[index]);
  };

  const handleDelete = (index) => {
    setVentas(ventas.filter((_, i) => i !== index));
  };

  return (
    <div className="container mt-4">
      <h1>Gestión de Ventas</h1>
      <button
        className="btn btn-success mb-3"
        data-bs-toggle="modal"
        data-bs-target="#addVentaModal"
      >
        Agregar Venta
      </button>

      {/* Formulario Modal */}
      <div
        className="modal fade"
        id="addVentaModal"
        tabIndex="-1"
        aria-labelledby="addVentaModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addVentaModalLabel">
                {editingIndex !== null ? 'Editar Venta' : 'Agregar Venta'}
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
                  <label className="form-label">Total</label>
                  <input
                    {...register('total', { required: true })}
                    type="number"
                    className="form-control"
                    placeholder="Total"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Fecha</label>
                  <input
                    {...register('fecha', { required: true })}
                    type="date"
                    className="form-control"
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
            <th>Total (S/)</th> {/* Cambié el encabezado para mostrar que es en soles */}
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta, index) => (
            <tr key={venta.id}>
              <td>{venta.id}</td>
              <td>{`S/ ${venta.total.toFixed(2)}`}</td> {/* Formateo del total en soles */}
              <td>{venta.fecha}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEdit(index)}
                  data-bs-toggle="modal"
                  data-bs-target="#addVentaModal"
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

export default Ventas;
