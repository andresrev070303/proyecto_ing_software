/* combustible.filters.test.js */
import { ordenarPorCantidad, filtrarPorCombustible } from '../utils/combustible.filters.js';

describe('Ordenamiento de Estaciones', () => {
  it('debe ordenar por cantidad descendente', () => {
    const ordenadas = ordenarPorCantidad();

    expect(ordenadas[0].nombre).toBe("YPFB San Antonio");
    expect(ordenadas[0].combustibles[0].cantidad).toBe(920);

    expect(ordenadas[1].combustibles[0].cantidad).toBeGreaterThanOrEqual(ordenadas[2].combustibles[0].cantidad);

    expect(ordenadas[ordenadas.length - 1].combustibles[0].cantidad).toBeLessThanOrEqual(ordenadas[0].combustibles[0].cantidad);
  });
});

describe('Filtrado por Combustible', () => {
  it('debe filtrar solo estaciones Diesel', () => {
    const dieselStations = filtrarPorCombustible("Diesel");
    expect(dieselStations.length).toBe(4); 
    expect(dieselStations.every(e => e.combustibles.some(c => c.tipo === "Diesel"))).toBe(true);
  });

  it('debe filtrar solo estaciones Normal', () => {
    const normalStations = filtrarPorCombustible("Normal");
    expect(normalStations.length).toBe(3); 
    expect(normalStations.every(e => e.combustibles.some(c => c.tipo === "Normal"))).toBe(true);
  });

  it('debe filtrar solo estaciones Especial', () => {
    const especialStations = filtrarPorCombustible("Especial");
    expect(especialStations.length).toBe(3);
    expect(especialStations.every(e => e.combustibles.some(c => c.tipo === "Especial"))).toBe(true);
  });

  it('debe retornar array vacio para "Gas" (tipo valido sin estaciones)', () => {
    const gasStations = filtrarPorCombustible("Gas");
    expect(gasStations.length).toBe(0); 
    expect(gasStations).toEqual([]);
  });

  it('debe lanzar error para tipo no reconocido (ej: "GLP")', () => {
    expect(() => filtrarPorCombustible("GLP")).toThrow('Tipo de combustible "GLP" no reconocido');
  });
});
