import React, { useState } from 'react';

const initialInventory = [
  { id: 1, name: 'Carne de Res', category: 'carnes', quantity: 45, unit: 'kg', min: 15, status: 'disponible' },
  { id: 2, name: 'Jitomate', category: 'verduras', quantity: 8, unit: 'kg', min: 10, status: 'por_surtir' },
  { id: 3, name: 'Queso Panela', category: 'cremeria', quantity: 0, unit: 'kg', min: 5, status: 'agotado' },
  { id: 4, name: 'Pollo', category: 'carnes', quantity: 20, unit: 'kg', min: 10, status: 'disponible' },
];

function App() {
  const [inventory, setInventory] = useState(initialInventory);
  const [filterCategory, setFilterCategory] = useState('todas');

  const handleQuantityChange = (id, newQuantity) => {
    const qty = Number(newQuantity);
    setInventory(prev =>
      prev.map(item => {
        if (item.id === id) {
          let updatedStatus = 'disponible';
          if (qty === 0) updatedStatus = 'agotado';
          else if (qty <= item.min) updatedStatus = 'por_surtir';
          return { ...item, quantity: qty, status: updatedStatus };
        }
        return item;
      })
    );
  };

  const filteredItems = filterCategory === 'todas' 
    ? inventory 
    : inventory.filter(item => item.category === filterCategory);

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

      {/* HU-02: Dashboard de Consulta con Filtros */}
      <div style={{ marginBottom: '20px', padding: '10px', background: '#f4f4f4', borderRadius: '5px' }}>
        <label><strong>Filtrar por categoría (Dashboard): </strong></label>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="todas">Todas</option>
          <option value="carnes">Carnes</option>
          <option value="verduras">Verduras</option>
          <option value="cremeria">Cremería</option>
        </select>
      </div>

      {/* HU-01: Tabla de Captura e Indicadores Visuales para Almacenista */}
      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
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
    </div>
  );
}

export default App;
