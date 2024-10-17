import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';

const DetallePedido = () => {
  const [detallesPedido, setDetallesPedido] = useState([
    { id: 1, plato: 'Ceviche Clásico', cantidad: 2, precio: 30.00 },
    { id: 2, plato: 'Ceviche Mixto', cantidad: 1, precio: 20.00 },
    { id: 3, plato: 'Ceviche de Pulpo', cantidad: 3, precio: 55.50 },
    { id: 4, plato: 'Ceviche de Camarones', cantidad: 1, precio: 22.00 },
    { id: 5, plato: 'Ceviche de Lenguado', cantidad: 2, precio: 38.00 },
    { id: 6, plato: 'Ceviche de Conchas', cantidad: 1, precio: 25.00 },
  ]);

  const { register, handleSubmit, reset } = useForm();
  const [editingIndex, setEditingIndex] = useState(null);

  const onSubmit = (data) => {
    data.precio = parseFloat(data.precio);
    if (editingIndex !== null) {
      const updatedDetallesPedido = [...detallesPedido];
      updatedDetallesPedido[editingIndex] = { id: updatedDetallesPedido[editingIndex].id, ...data };
      setDetallesPedido(updatedDetallesPedido);
      setEditingIndex(null);
    } else {
      setDetallesPedido([...detallesPedido, { id: detallesPedido.length + 1, ...data }]);
    }
    reset();
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    reset(detallesPedido[index]);
  };

  const handleDelete = (index) => {
    setDetallesPedido(detallesPedido.filter((_, i) => i !== index));
  };

  return (
    <div className="container mt-4">
      <h1>Gestión de Detalle de Pedidos</h1>
      <button
        className="btn btn-success mb-3"
        data-bs-toggle="modal"
        data-bs-target="#addDetallePedidoModal"
      >
        Agregar Detalle de Pedido
      </button>

      <div
        className="modal fade"
        id="addDetallePedidoModal"
        tabIndex="-1"
        aria-labelledby="addDetallePedidoModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addDetallePedidoModalLabel">
                {editingIndex !== null ? 'Editar Detalle de Pedido' : 'Agregar Detalle de Pedido'}
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
                  <label className="form-label">Plato</label>
                  <input
                    {...register('plato', { required: true })}
                    className="form-control"
                    placeholder="Plato"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Cantidad</label>
                  <input
                    {...register('cantidad', { required: true })}
                    type="number"
                    className="form-control"
                    placeholder="Cantidad"
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

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Plato</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {detallesPedido.map((detalle, index) => (
            <tr key={detalle.id}>
              <td>{detalle.id}</td>
              <td>{detalle.plato}</td>
              <td>{detalle.cantidad}</td>
              <td>S/ {detalle.precio.toFixed(2)}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEdit(index)}
                  data-bs-toggle="modal"
                  data-bs-target="#addDetallePedidoModal"
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

export default DetallePedido;
