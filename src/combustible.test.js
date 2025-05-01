/* combustible.test.js */
import {obtenerEstaciones} from './estaciones.js';

describe('Obtencion de Estaciones', () => {
  it('debe retornar estaciones con sus respectivas propiedades', () => {
    const estaciones = obtenerEstaciones();
    
    expect(estaciones[0]).toEqual({
      nombre: "Estacion San Martin",
      direccion: "Av. San Martin #456",
      tipoCombustible: "Normal",
      cantidadDisponible: 7500
    });

    expect(estaciones[1]).toEqual({
      nombre: "Estacion Prado",
      direccion: "El Prado #789",
      tipoCombustible: "Especial",
      cantidadDisponible: 4200
    });

    expect(estaciones[2]).toEqual({
      nombre: "Estacion La Recoleta",
      direccion: "Calle Jordan #321",
      tipoCombustible: "Diesel",
      cantidadDisponible: 6800
    });

    expect(estaciones[3]).toEqual({
      nombre: "Estacion Queru Queru",
      direccion: "Av. Queru Queru #101",
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

  it('debe tener cantidades disponibles mayores a 0', () => {
    const estaciones = obtenerEstaciones();
    estaciones.forEach(estacion => {
      expect(estacion.cantidadDisponible).toBeGreaterThan(0);
    });
  });
});