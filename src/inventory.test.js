import { describe, it, expect } from 'vitest';
import { getStatus, updateItem, filterItems, initialInventory } from './inventory';

describe('getStatus', () => {
  it('marca agotado cuando la cantidad es 0', () => {
    expect(getStatus(0, 5)).toBe('agotado');
  });

  it('marca por surtir cuando la cantidad es menor o igual al mínimo', () => {
    expect(getStatus(8, 10)).toBe('por_surtir');
    expect(getStatus(10, 10)).toBe('por_surtir');
  });

  it('marca disponible cuando la cantidad es mayor al mínimo', () => {
    expect(getStatus(45, 15)).toBe('disponible');
  });
});

describe('updateItem', () => {
  it('actualiza cantidad y recalcula el estado', () => {
    const updated = updateItem(initialInventory, 2, 0, 10);
    expect(updated[1].quantity).toBe(0);
    expect(updated[1].status).toBe('agotado');
  });

  it('no cambia los demás insumos', () => {
    const updated = updateItem(initialInventory, 1, 50, 15);
    expect(updated[2]).toEqual(initialInventory[2]);
  });
});

describe('filterItems', () => {
  it('devuelve todos con la categoría todas', () => {
    expect(filterItems(initialInventory, 'todas')).toHaveLength(4);
  });

  it('filtra por categoría', () => {
    expect(filterItems(initialInventory, 'carnes')).toHaveLength(2);
  });
});