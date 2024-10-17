import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';

const Categoria = () => {
  const [categorias, setCategorias] = useState([
    { id: 1, categoria: 'Mariscos' },
    { id: 2, categoria: 'Carnes' },
    { id: 3, categoria: 'Bebidas' },
    { id: 4, categoria: 'Postres' },
    { id: 5, categoria: 'Entradas' },
    { id: 6, categoria: 'Pescados' },
  ]);

  const { register, handleSubmit, reset } = useForm();
  const [editingIndex, setEditingIndex] = useState(null);

  const onSubmit = (data) => {
    if (editingIndex !== null) {
      const updatedCategorias = [...categorias];
      updatedCategorias[editingIndex] = data;
      setCategorias(updatedCategorias);
      setEditingIndex(null);
    } else {
      setCategorias([...categorias, { id: categorias.length + 1, ...data }]);
    }
    reset();
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    reset(categorias[index]);
  };

  const handleDelete = (index) => {
    setCategorias(categorias.filter((_, i) => i !== index));
  };

  return (
    <div className="container mt-4">
      <h1>Gestión de Categorías</h1>
      <button
        className="btn btn-success mb-3"
        data-bs-toggle="modal"
        data-bs-target="#addCategoryModal"
      >
        Agregar Categoría
      </button>

      {/* Formulario Modal */}
      <div
        className="modal fade"
        id="addCategoryModal"
        tabIndex="-1"
        aria-labelledby="addCategoryModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addCategoryModalLabel">
                {editingIndex !== null ? 'Editar Categoría' : 'Agregar Categoría'}
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
                  <label className="form-label">Nombre de la Categoría</label>
                  <input
                    {...register('categoria', { required: true })}
                    className="form-control"
                    placeholder="Nombre de la Categoría"
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
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((cat, index) => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>{cat.categoria}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEdit(index)}
                  data-bs-toggle="modal"
                  data-bs-target="#addCategoryModal"
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

export default Categoria;
