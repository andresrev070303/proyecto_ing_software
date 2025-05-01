// combustible.test.js (ruta corregida)
import obtenerEstaciones from './estaciones.js';  // <-- ¡Agrega el punto (./)!

describe('Obtención de Estaciones', () => {
    it('debe retornar estaciones con sus respectivas propiedades', () => {
        const estaciones = obtenerEstaciones();
        expect(estaciones[0]).toEqual({
          nombre: "Estación Principal",
          dirección: "Avenida Libertad 123",
          tipoCombustible: "Normal",
          cantidadDisponible: 5000
        });
      });
    
});