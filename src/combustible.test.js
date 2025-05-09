/* combustible.test.js */
import { obtenerEstaciones } from './estaciones.js';

// Simulación de localStorage para entorno Node
global.localStorage = {
  store: {},
  getItem(key) {
    return this.store[key] || null;
  },
  setItem(key, value) {
    this.store[key] = value;
  },
  removeItem(key) {
    delete this.store[key];
  },
  clear() {
    this.store = {};
  }
};

describe('Obtencion de Estaciones', () => {
  beforeEach(() => {
    localStorage.clear(); // Asegura que no haya datos agregados
  });

  it('debe retornar estaciones con sus respectivas propiedades', () => {
    const estaciones = obtenerEstaciones();
    
    expect(estaciones[0]).toEqual({
      nombre: "Gulf Norte",
      direccion: "Av. América #1256",
      tipoCombustible: "Normal",
      cantidadDisponible: 8500,
      zona: "Norte",
      filaEspera: [
        {
          nombre: "Eduardo Quiroga",
          placa: "5678GPQ"
        },
        {
          nombre: "Juan Perez",
          placa: "1234ABC"
        }
      ]
    });

    expect(estaciones[1]).toEqual({
      nombre: "YPFB Cala Cala",
      direccion: "Av. Melchor Pérez #245",
      tipoCombustible: "Especial",
      cantidadDisponible: 7200,
      zona: "Norte",
      filaEspera: []
    });

    expect(estaciones[2]).toEqual({
      nombre: "Petrobras La Recoleta",
      direccion: "Calle Jordán #321",
      tipoCombustible: "Diesel",
      cantidadDisponible: 6800,
      zona: "Norte",
      filaEspera: [{
        nombre: "María López",
        placa: "8921BCD"
      },
      {
        nombre: "Carlos Rivas",
        placa: "3456FGH"
      },
      {
        nombre: "Lucía Mendoza",
        placa: "7788JKL"
      }]
    });

    expect(estaciones[3]).toEqual({
      nombre: "YPFB San Antonio",
      direccion: "Av. Villazón #789",
      tipoCombustible: "Normal",
      cantidadDisponible: 9200,
      zona: "Sur",
      filaEspera: [{
        nombre: "Pedro Salazar",
        placa: "9988MNO"
      }]
    });
    
    expect(estaciones.length).toBe(10); // Sin contar añadidos del localStorage
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

  it('debe incluir la propiedad zona en todas las estaciones', () => {
    const estaciones = obtenerEstaciones();
    estaciones.forEach(estacion => {
      expect(estacion).toHaveProperty('zona');
    });
  });
});
