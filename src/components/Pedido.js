import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';

const Pedido = () => {
  const [pedidos, setPedidos] = useState([
    { id: 1, ID_CLIENTE: 1, FECHA_PEDIDO: '2024-10-02', ID_MESA: 1, ESTADO: 'Pendiente' },
    { id: 2, ID_CLIENTE: 2, FECHA_PEDIDO: '2024-10-03', ID_MESA: 2, ESTADO: 'Completado' },
    { id: 3, ID_CLIENTE: 1, FECHA_PEDIDO: '2024-10-04', ID_MESA: 3, ESTADO: 'Pendiente' },
    { id: 4, ID_CLIENTE: 3, FECHA_PEDIDO: '2024-10-05', ID_MESA: 1, ESTADO: 'Cancelado' },
    { id: 5, ID_CLIENTE: 2, FECHA_PEDIDO: '2024-10-06', ID_MESA: 4, ESTADO: 'Pendiente' },
    { id: 6, ID_CLIENTE: 3, FECHA_PEDIDO: '2024-10-07', ID_MESA: 5, ESTADO: 'Completado' },
  ]);

  const { register, handleSubmit, reset } = useForm();
  const [editingIndex, setEditingIndex] = useState(null);

  const onSubmit = (data) => {
    if (editingIndex !== null) {
      const updatedPedidos = [...pedidos];
      updatedPedidos[editingIndex] = { id: updatedPedidos[editingIndex].id, ...data };
      setPedidos(updatedPedidos);
      setEditingIndex(null);
    } else {
      setPedidos([...pedidos, { id: pedidos.length + 1, ...data }]);
    }
    reset();
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    reset(pedidos[index]);
  };

  const handleDelete = (index) => {
    setPedidos(pedidos.filter((_, i) => i !== index));
  };

  return (
    <div className="container mt-4">
      <h1>Gestión de Pedidos</h1>
      <button
        className="btn btn-success mb-3"
        data-bs-toggle="modal"
        data-bs-target="#addPedidoModal"
      >
        Agregar Pedido
      </button>

      {/* Formulario Modal */}
      <div
        className="modal fade"
        id="addPedidoModal"
        tabIndex="-1"
        aria-labelledby="addPedidoModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addPedidoModalLabel">
                {editingIndex !== null ? 'Editar Pedido' : 'Agregar Pedido'}
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
                  <label className="form-label">Cliente</label>
                  <input
                    {...register('ID_CLIENTE', { required: true })}
                    type="number"
                    className="form-control"
                    placeholder="ID Cliente"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Mesa</label>
                  <input
                    {...register('ID_MESA', { required: true })}
                    type="number"
                    className="form-control"
                    placeholder="Número de Mesa"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Fecha</label>
                  <input
                    {...register('FECHA_PEDIDO', { required: true })}
                    type="date"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Estado</label>
                  <select
                    {...register('ESTADO', { required: true })}
                    className="form-control"
                  >
                    <option value="">Seleccione un estado</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Completado">Completado</option>
                    <option value="Cancelado">Cancelado</option>
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
            <th>Cliente</th>
            <th>Fecha</th>
            <th>ID Mesa</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido, index) => (
            <tr key={pedido.id}>
              <td>{pedido.id}</td>
              <td>{pedido.ID_CLIENTE}</td>
              <td>{pedido.FECHA_PEDIDO}</td>
              <td>{pedido.ID_MESA}</td>
              <td>{pedido.ESTADO}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEdit(index)}
                  data-bs-toggle="modal"
                  data-bs-target="#addPedidoModal"
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

export default Pedido;
