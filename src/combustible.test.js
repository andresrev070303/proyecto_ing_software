/* combustible.test.js */
import { obtenerEstaciones } from './estaciones.js';

global.localStorage = {
  store: {},
  getItem(key) { return this.store[key] || null; },
  setItem(key, value) { this.store[key] = value; },
  removeItem(key) { delete this.store[key]; },
  clear() { this.store = {}; }
};

describe('Obtencion de Estaciones', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('debe retornar estaciones con sus respectivas propiedades', () => {
    const estaciones = obtenerEstaciones();

    expect(estaciones[0]).toEqual({
      nombre: "Gulf Norte",
      direccion: "Av. América #1256",
      zona: "Norte",
      combustibles: [
        { tipo: "Normal", cantidad: 8500 }
      ],
      filaEspera: [
        { nombre: "Eduardo Quiroga", placa: "5678GPQ" },
        { nombre: "Juan Perez", placa: "1234ABC" }
      ]
    });
  });

  it('debe contener los tres tipos de combustible', () => {
    const estaciones = obtenerEstaciones();
    const tipos = estaciones.flatMap(e => e.combustibles.map(c => c.tipo));

    expect(tipos).toContain("Normal");
    expect(tipos).toContain("Especial");
    expect(tipos).toContain("Diesel");
  });

  it('debe tener cantidades disponibles mayores a 0', () => {
    const estaciones = obtenerEstaciones();
    estaciones.forEach(estacion => {
      estacion.combustibles.forEach(c => {
        expect(c.cantidad).toBeGreaterThan(0);
      });
    });
  });

  it('debe incluir la propiedad zona en todas las estaciones', () => {
    const estaciones = obtenerEstaciones();
    estaciones.forEach(estacion => {
      expect(estacion).toHaveProperty('zona');
    });
  });
});
