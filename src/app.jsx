import React, { useState } from 'react';
import { initialInventory, updateItem, filterItems } from './inventory';

function App() {
  const [inventory, setInventory] = useState(initialInventory);
  const [filterCategory, setFilterCategory] = useState('todas');
  const [editId, setEditId] = useState(1);
  const [editQuantity, setEditQuantity] = useState(45);
  const [editMin, setEditMin] = useState(15);
  const [error, setError] = useState('');

  const filteredItems = filterItems(inventory, filterCategory);

  const handleQuantityChange = (id, newQuantity) => {
    const qty = Number(newQuantity);
    if (Number.isNaN(qty) || qty < 0) return;
    setInventory((prev) => {
      const current = prev.find((item) => item.id === id);
      return updateItem(prev, id, qty, current.min);
    });
  };

  const handleEditSelect = (id) => {
    const item = inventory.find((entry) => entry.id === id);
    setEditId(id);
    setEditQuantity(item.quantity);
    setEditMin(item.min);
    setError('');
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const qty = Number(editQuantity);
    const min = Number(editMin);
    if (Number.isNaN(qty) || Number.isNaN(min) || qty < 0 || min < 0) {
      setError('La cantidad y el mínimo deben ser números y no pueden ser negativos.');
      return;
    }
    setError('');
    setInventory((prev) => updateItem(prev, editId, qty, min));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'disponible':
        return <span style={{ color: 'green', fontWeight: 'bold' }}>✓ Disponible</span>;
      case 'por_surtir':
        return <span style={{ color: 'orange', fontWeight: 'bold' }}>⚠ Por Surtir</span>;
      case 'agotado':
        return <span style={{ color: 'red', fontWeight: 'bold' }}>✕ Agotado</span>;
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Sistema de Gestión de Inventarios - Comedor Industrial</h1>

      <div style={{ marginBottom: '20px', padding: '10px', background: '#f4f4f4', borderRadius: '5px' }}>
        <label htmlFor="filtro-categoria"><strong>Filtrar por categoría (Dashboard): </strong></label>
        <select id="filtro-categoria" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="todas">Todas</option>
          <option value="carnes">Carnes</option>
          <option value="verduras">Verduras</option>
          <option value="cremeria">Cremería</option>
        </select>
      </div>

      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%', marginBottom: '20px' }}>
        <thead>
          <tr style={{ background: '#e0e0e0' }}>
            <th>Insumo</th>
            <th>Categoría</th>
            <th>Cantidad Actual</th>
            <th>Estado (Indicador Visual)</th>
            <th>Actualizar Stock</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.category.toUpperCase()}</td>
              <td>{item.quantity} {item.unit}</td>
              <td>{getStatusBadge(item.status)}</td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  style={{ width: '70px' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handleEditSubmit} style={{ padding: '10px', background: '#f4f4f4', borderRadius: '5px' }}>
        <h3>Editar insumo</h3>
        <label htmlFor="editar-insumo"><strong>Insumo: </strong></label>
        <select id="editar-insumo" value={editId} onChange={(e) => handleEditSelect(Number(e.target.value))}>
          {inventory.map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>
        <br /><br />
        <label htmlFor="editar-cantidad"><strong>Cantidad: </strong></label>
        <input id="editar-cantidad" type="number" value={editQuantity} onChange={(e) => setEditQuantity(e.target.value)} style={{ width: '70px' }} />
        <label htmlFor="editar-minimo" style={{ marginLeft: '10px' }}><strong>Mínimo: </strong></label>
        <input id="editar-minimo" type="number" value={editMin} onChange={(e) => setEditMin(e.target.value)} style={{ width: '70px' }} />
        <button type="submit" style={{ marginLeft: '10px' }}>Guardar</button>
        {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
      </form>
    </div>
  );
}

export default App;
