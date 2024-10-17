import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Cliente from './components/Cliente';
import DetalleInsumo from './components/DetalleInsumo';
import Insumo from './components/Insumo';
import Pedido from './components/Pedido';
import DetallePedido from './components/DetallePedido';
import Mesa from './components/Mesa';
import Ventas from './components/Ventas';
import Proveedores from './components/Proveedores';
import Categoria from './components/Categoria';
import Usuarios from './components/Usuarios';
import Ceviche from './components/Ceviche';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/cliente" element={<Cliente />} />
        <Route path="/detalle-insumo" element={<DetalleInsumo />} />
        <Route path="/insumo" element={<Insumo />} />
        <Route path="/pedido" element={<Pedido />} />
        <Route path="/detalle-pedido" element={<DetallePedido />} />
        <Route path="/mesa" element={<Mesa />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/proveedores" element={<Proveedores />} />
        <Route path="/categoria" element={<Categoria />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/ceviche" element={<Ceviche />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
