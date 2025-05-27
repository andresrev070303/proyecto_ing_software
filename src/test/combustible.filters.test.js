/* combustible.filters.test.js */
import { ordenarPorCantidad, filtrarPorCombustible } from '../utils/combustible.filters.js';



describe('Filtrado por Combustible', () => {
  it('debe filtrar solo estaciones que tengan "Diesel"', () => {
    const dieselStations = filtrarPorCombustible("Diesel");

    expect(dieselStations.length).toBe(0); // Todas las estaciones tienen "Diesel"
    expect(dieselStations.every(e => e.combustibles.some(c => c.tipo === "Diesel"))).toBe(true);
  });

  it('debe filtrar solo estaciones que tengan "Normal"', () => {
    const normalStations = filtrarPorCombustible("Normal");

    expect(normalStations.length).toBe(0); // Gulf Norte, YPFB San Antonio, YPFB Central, Petrobras Muyurina, Petrobras La Recoleta
    expect(normalStations.every(e => e.combustibles.some(c => c.tipo === "Normal"))).toBe(true);
  });

  it('debe filtrar solo estaciones que tengan "Especial"', () => {
    const especialStations = filtrarPorCombustible("Especial");

    expect(especialStations.length).toBe(0); // YPFB Cala Cala, Petrobras Queru Queru, Gulf Quillacollo, YPFB Quillacollo Centro
    expect(especialStations.every(e => e.combustibles.some(c => c.tipo === "Especial"))).toBe(true);
  });

  it('debe retornar array vacío para "Gas" (tipo válido sin estaciones)', () => {
    const gasStations = filtrarPorCombustible("Gas");
    expect(gasStations.length).toBe(0);
    expect(gasStations).toEqual([]);
  });

  it('debe lanzar error para tipo no reconocido (ej: "GLP")', () => {
    expect(() => filtrarPorCombustible("GLP")).toThrow('Tipo de combustible "GLP" no reconocido');
  });
});