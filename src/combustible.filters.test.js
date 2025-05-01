/* combustible.filters.test.js */
import { ordenarPorCantidad, filtrarPorCombustible } from './estaciones.js';

describe('Ordenamiento de Estaciones', () => {
  it('debe ordenar por cantidad descendente', () => {
    const ordenadas = ordenarPorCantidad();
    
    
    expect(ordenadas[0].nombre).toBe("YPFB Central"); 
    expect(ordenadas[0].cantidadDisponible).toBe(11000);
    
    expect(ordenadas[1].nombre).toBe("YPFB San Antonio"); 
    expect(ordenadas[1].cantidadDisponible).toBe(9200);
    
    expect(ordenadas[9].nombre).toBe("Petrobras Queru Queru");
    expect(ordenadas[9].cantidadDisponible).toBe(4800);
  });
});

describe('Filtrado por Combustible', () => {
  it('debe filtrar solo estaciones Diesel', () => {
    const dieselStations = filtrarPorCombustible("Diesel");
    expect(dieselStations.length).toBe(4); 
    expect(dieselStations.every(e => e.tipoCombustible === "Diesel")).toBe(true);
  });

  it('debe filtrar solo estaciones Normal', () => {
    const normalStations = filtrarPorCombustible("Normal");
    expect(normalStations.length).toBe(3); 
    expect(normalStations.every(e => e.tipoCombustible === "Normal")).toBe(true);
  });

  it('debe filtrar solo estaciones Especial', () => {
    const especialStations = filtrarPorCombustible("Especial");
    expect(especialStations.length).toBe(3);
    expect(especialStations.every(e => e.tipoCombustible === "Especial")).toBe(true);
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