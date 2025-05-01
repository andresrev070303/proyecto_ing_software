/* combustible.filters.test.js */
import { ordenarPorCantidad, filtrarPorCombustible } from './estaciones.js';

describe('Ordenamiento de Estaciones', () => {
  it('debe ordenar por cantidad descendente', () => {
    const ordenadas = ordenarPorCantidad();
    
    expect(ordenadas[0].nombre).toBe("Estacion Cochabamba"); 
    expect(ordenadas[1].nombre).toBe("Estacion San Martin"); 
    expect(ordenadas[5].nombre).toBe("Estacion Queru Queru"); 
  });
});

describe('Filtrado por Combustible', () => {
  // Tests para tipos existentes (Diesel, Normal, Especial y Gas)
  it('debe filtrar solo estaciones Diesel', () => {
    const dieselStations = filtrarPorCombustible("Diesel");
    expect(dieselStations.length).toBe(2);
    expect(dieselStations.every(e => e.tipoCombustible === "Diesel")).toBe(true);
  });

  it('debe filtrar solo estaciones Normal', () => {
    const normalStations = filtrarPorCombustible("Normal");
    expect(normalStations.length).toBe(2);
    expect(normalStations.every(e => e.tipoCombustible === "Normal")).toBe(true);
  });

  it('debe filtrar solo estaciones Especial', () => {
    const especialStations = filtrarPorCombustible("Especial");
    expect(especialStations.length).toBe(2);
    expect(especialStations.every(e => e.tipoCombustible === "Especial")).toBe(true);
  });

  it('debe retornar array vacio para "Gas" (tipo valido sin estaciones)', () => {
    const gasStations = filtrarPorCombustible("Gas");
    expect(gasStations.length).toBe(0); 
    expect(gasStations).toEqual([]);
  });

  // Test para tipo invalido (ej: "GLP")
  it('debe lanzar error para tipo no reconocido (ej: "GLP")', () => {
    expect(() => filtrarPorCombustible("GLP")).toThrow('Tipo de combustible "GLP" no reconocido');
  });
});