import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">Cevicheria La Red</a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          
          <li className="nav-item dropdown">
            <button
              className="nav-link dropdown-toggle btn btn-link"
              id="navbarDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Gestión
            </button>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li><Link className="dropdown-item" to="/cliente">Cliente</Link></li>
              <li><Link className="dropdown-item" to="/detalle-insumo">Detalle Insumo</Link></li>
              <li><Link className="dropdown-item" to="/insumo">Insumo</Link></li>
              <li><Link className="dropdown-item" to="/pedido">Pedido</Link></li>
              <li><Link className="dropdown-item" to="/detalle-pedido">Detalle Pedido</Link></li>
              <li><Link className="dropdown-item" to="/mesa">Mesa</Link></li>
              <li><Link className="dropdown-item" to="/ventas">Ventas</Link></li>
            </ul>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/proveedores">Proveedores</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/categoria">Categoría</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/usuarios">Usuarios</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/ceviche">Ceviche</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;