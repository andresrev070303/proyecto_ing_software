const estacionesLista = [
    {
      nombre: "Estación San Martín",
      dirección: "Av. San Martín #456",
      tipoCombustible: "Normal",
      cantidadDisponible: 7500 // litros
    },
    {
      nombre: "Estación Prado",
      dirección: "El Prado #789",
      tipoCombustible: "Especial",
      cantidadDisponible: 4200
    },
    {
      nombre: "Estación La Recoleta",
      dirección: "Calle Jordán #321",
      tipoCombustible: "Diesel",
      cantidadDisponible: 6800
    },
    {
      nombre: "Estación Queru Queru",
      dirección: "Av. Queru Queru #101",
      tipoCombustible: "Normal",
      cantidadDisponible: 3000
    },
    {
      nombre: "Estación Cochabamba",
      dirección: "Av. América #555",
      tipoCombustible: "Especial",
      cantidadDisponible: 9000
    },
    {
      nombre: "Estación Cala Cala",
      dirección: "Calle Cala Cala #222",
      tipoCombustible: "Diesel",
      cantidadDisponible: 5500
    }
  ];
  
  export default function obtenerEstaciones() {
    return estacionesLista;
  }
  
  export function ordenarPorCantidad() {
    return [...estacionesLista].sort((a, b) => b.cantidadDisponible - a.cantidadDisponible);
  }
  

  


  

 