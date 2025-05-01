// combustible.test.js
import obtenerEstaciones from './estaciones.js';

describe('Obtención de Estaciones', () => {
  it('debe retornar estaciones con sus respectivas propiedades', () => {
    const estaciones = obtenerEstaciones();
    
    
    expect(estaciones[0]).toEqual({
      nombre: "Estación San Martín",
      dirección: "Av. San Martín #456",
      tipoCombustible: "Normal",
      cantidadDisponible: 7500
    });

    
    expect(estaciones[1]).toEqual({
      nombre: "Estación Prado",
      dirección: "El Prado #789",
      tipoCombustible: "Especial",
      cantidadDisponible: 4200
    });

    expect(estaciones[2]).toEqual({
        nombre: "Estación La Recoleta",
      dirección: "Calle Jordán #321",
      tipoCombustible: "Diesel",
      cantidadDisponible: 6800
      });

      expect(estaciones[3]).toEqual({
        nombre: "Estación Queru Queru",
      dirección: "Av. Queru Queru #101",
      tipoCombustible: "Normal",
      cantidadDisponible: 3000
      });
    
    expect(estaciones.length).toBe(6);
  });

  it('debe contener los tres tipos de combustible', () => {
    const estaciones = obtenerEstaciones();
    const tipos = estaciones.map(e => e.tipoCombustible);
    
    expect(tipos).toContain("Normal");
    expect(tipos).toContain("Especial");
    expect(tipos).toContain("Diesel");
  });

  
});
