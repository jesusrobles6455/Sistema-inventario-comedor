export const initialInventory = [
  { id: 1, name: 'Carne de Res', category: 'carnes', quantity: 45, unit: 'kg', min: 15, status: 'disponible' },
  { id: 2, name: 'Jitomate', category: 'verduras', quantity: 8, unit: 'kg', min: 10, status: 'por_surtir' },
  { id: 3, name: 'Queso Panela', category: 'cremeria', quantity: 0, unit: 'kg', min: 5, status: 'agotado' },
  { id: 4, name: 'Pollo', category: 'carnes', quantity: 20, unit: 'kg', min: 10, status: 'disponible' },
];

export function getStatus(quantity, min) {
  if (quantity === 0) return 'agotado';
  if (quantity <= min) return 'por_surtir';
  return 'disponible';
}

export function updateItem(items, id, quantity, min) {
  return items.map((item) => {
    if (item.id !== id) return item;
    return { ...item, quantity, min, status: getStatus(quantity, min) };
  });
}

export function filterItems(items, category) {
  if (category === 'todas') return items;
  return items.filter((item) => item.category === category);
}
