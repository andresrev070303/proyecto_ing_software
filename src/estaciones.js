const estacionesLista = [
    {
      nombre: "Estación Principal",
      dirección: "Avenida Libertad 123",
      tipoCombustible: "Normal",
      cantidadDisponible: 5000 // litros
    }
  ];
  
  // Función para obtener estaciones
  export default function obtenerEstaciones() {
    return estacionesLista;
  }