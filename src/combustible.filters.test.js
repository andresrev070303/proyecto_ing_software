import  {ordenarPorCantidad, filtrarPorCombustible} from './estaciones.js';

describe('Ordenamiento de Estaciones', () => {
  it('debe ordenar por cantidad descendente', () => {
    const ordenadas = ordenarPorCantidad();
    
    expect(ordenadas[0].nombre).toBe("Estación Cochabamba"); 
    expect(ordenadas[1].nombre).toBe("Estación San Martín"); 
    expect(ordenadas[5].nombre).toBe("Estación Queru Queru"); 
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
  
    
    it('debe retornar array vacío para "Gas" (tipo válido sin estaciones)', () => {
      const gasStations = filtrarPorCombustible("Gas");
      expect(gasStations.length).toBe(0); 
      expect(gasStations).toEqual([]);
    });
  
    // Test para tipo inválido (ej: "GLP")
    it('debe lanzar error para tipo no reconocido (ej: "GLP")', () => {
      expect(() => filtrarPorCombustible("GLP")).toThrow('Tipo de combustible "GLP" no reconocido');
    });
  });