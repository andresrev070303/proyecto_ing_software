let estacionesLista = [
  {
    nombre: "Gulf Norte",
    direccion: "Av. América #1256",
    zona: "Norte",
    combustibles: [
      { tipo: "Normal", cantidad: 850 },
      { tipo: "Diesel", cantidad: 600 }
    ],
    filaEspera: [
      { nombre: "Eduardo Quiroga", placa: "5678GPQ", tipo: "Normal" },
      { nombre: "Juan Perez", placa: "1234ABC", tipo: "Normal" }
    ]
  },
  {
    nombre: "YPFB Cala Cala",
    direccion: "Av. Melchor Pérez #245",
    zona: "Norte",
    combustibles: [
      { tipo: "Especial", cantidad: 720 },
      { tipo: "Diesel", cantidad: 550 }
    ],
    filaEspera: []
  },
  {
    nombre: "Petrobras La Recoleta",
    direccion: "Calle Jordán #321",
    zona: "Norte",
    combustibles: [
      { tipo: "Diesel", cantidad: 680 },
      { tipo: "Normal", cantidad: 900 } 
    ],
    filaEspera: [
      { nombre: "María López", placa: "8921BCD", tipo: "Diesel" },
      { nombre: "Carlos Rivas", placa: "3456FGH", tipo: "Diesel" },
      { nombre: "Lucía Mendoza", placa: "7788JKL", tipo: "Diesel" }
    ]
  },
  {
    nombre: "YPFB San Antonio",
    direccion: "Av. Villazón #789",
    zona: "Sur",
    combustibles: [
      { tipo: "Normal", cantidad: 920 },
      { tipo: "Diesel", cantidad: 700 }
    ],
    filaEspera: [
      { nombre: "Pedro Salazar", placa: "9988MNO", tipo: "Normal" }
    ]
  },
  {
    nombre: "Gulf Terminal",
    direccion: "Av. Panamericana km 5",
    zona: "Sur",
    combustibles: [
      { tipo: "Diesel", cantidad: 550 },
      { tipo: "Especial", cantidad: 400 } 
    ],
    filaEspera: []
  },
  {
    nombre: "Petrobras Queru Queru",
    direccion: "Av. 6 de Agosto #456",
    zona: "Sur",
    combustibles: [
      { tipo: "Especial", cantidad: 480 },
      { tipo: "Diesel", cantidad: 500 }
    ],
    filaEspera: []
  },
  {
    nombre: "YPFB Central",
    direccion: "Plaza Bolívar #123",
    zona: "Cercado",
    combustibles: [
      { tipo: "Normal", cantidad: 110 },
      { tipo: "Diesel", cantidad: 200 }
    ],
    filaEspera: [
      { nombre: "Valeria Torres", placa: "2233XYZ", tipo: "Normal" },
      { nombre: "Andrés Gutiérrez", placa: "1122TUV", tipo: "Normal" },
      { nombre: "Sofía Herrera", placa: "3344QWE", tipo: "Normal" },
      { nombre: "Diego Castro", placa: "5566RTY", tipo: "Normal" }
    ]
  },
  {
    nombre: "Petrobras Muyurina",
    direccion: "Av. Ayacucho #678",
    zona: "Cercado",
    combustibles: [
      { tipo: "Diesel", cantidad: 750 },
      { tipo: "Normal", cantidad: 800 } 
    ],
    filaEspera: []
  },
  {
    nombre: "Gulf Quillacollo",
    direccion: "Av. Blanco Galindo #901",
    zona: "Quillacollo",
    combustibles: [
      { tipo: "Especial", cantidad: 620 },
      { tipo: "Diesel", cantidad: 650 }
    ],
    filaEspera: []
  },
  {
    nombre: "YPFB Quillacollo Centro",
    direccion: "Calle Bolívar #1002",
    zona: "Quillacollo",
    combustibles: [
      { tipo: "Diesel", cantidad: 580 },
      { tipo: "Especial", cantidad: 450 } 
    ],
    filaEspera: [
      { nombre: "Eduardo Quiroga", placa: "5678GPQ", tipo: "Diesel" },
      { nombre: "Juan Perez", placa: "1234ABC", tipo: "Diesel" }
    ]
  },
];
  function agregarEstacion(estacion) {
    if (!estacion.filaEspera) {
      estacion.filaEspera = [];
  }
    estacionesLista.push(estacion);
  }
  
  function agregarAfila(nombreEstacion, datosConductor) {
    const nombreLower = nombreEstacion.toLowerCase();
  
    // Buscar en estaciones mock (estacionesLista)
    let estacion = estacionesLista.find(est => est.nombre.toLowerCase() === nombreLower);
    if (estacion) {
      const nuevaPosicion = estacion.filaEspera.length + 1;
      estacion.filaEspera.push({
        nombre: datosConductor.nombre,
        placa: datosConductor.placa,
        tipo: datosConductor.tipo 
      });
    
      console.log(`Conductor ${datosConductor.nombre} agregado a estación mock "${nombreEstacion}". Posición: ${nuevaPosicion}`);
      return nuevaPosicion;
    }
    
    // Si no está en mock, buscar en localStorage
    try {
      const adicionales = JSON.parse(localStorage.getItem("nuevasEstaciones") || "[]");
      const index = adicionales.findIndex(e => e.nombre.toLowerCase() === nombreLower);
  
      if (index !== -1) {
        estacion = adicionales[index];
        const nuevaPosicion = estacion.filaEspera.length + 1;
  
        estacion.filaEspera.push({
          nombre: datosConductor.nombre,
          placa: datosConductor.placa,
          tipo: datosConductor.tipo
        });
        
  
        adicionales[index] = estacion;
        localStorage.setItem("nuevasEstaciones", JSON.stringify(adicionales));
  
        console.log(`Conductor ${datosConductor.nombre} agregado a estación localStorage "${nombreEstacion}". Posición: ${nuevaPosicion}`);
        return nuevaPosicion;
      }
    } catch (error) {
      console.error("Error al acceder a estaciones del localStorage:", error);
    }
  
    // Si no se encontró en ningún lado
    console.error(`Error: No se encontró la estación "${nombreEstacion}"`);
    return false;
  }
  
  
  function obtenerCantidadCombustible(nombreEstacion) {
    const estacion = estacionesLista.find(est => est.nombre === nombreEstacion);
    if (estacion) {
      return estacion.cantidadDisponible;
    } 
  }
  function agregarCombustibleExistente(nombreEstacion, tipo, cantidad) {
    const nombreLower = nombreEstacion.toLowerCase();
  
    let estacion = estacionesLista.find(est => est.nombre.toLowerCase() === nombreLower);
    let enMock = true;
  
    if (!estacion) {
      const adicionales = JSON.parse(localStorage.getItem("nuevasEstaciones") || "[]");
      estacion = adicionales.find(e => e.nombre.toLowerCase() === nombreLower);
      enMock = false;
  
      if (!estacion) return "Estación no encontrada";
  
      const combustible = estacion.combustibles.find(c => c.tipo === tipo);
      if (!combustible) return `Tipo de combustible "${tipo}" no registrado en esta estación`;
  
      combustible.cantidad += cantidad;
      localStorage.setItem("nuevasEstaciones", JSON.stringify(adicionales));
      return `Se agregó ${cantidad} litros a ${tipo}`;
    }
  
    const combustible = estacion.combustibles.find(c => c.tipo === tipo);
    if (!combustible) return `Tipo de combustible "${tipo}" no registrado en esta estación`;
  
    combustible.cantidad += cantidad;
    return `Se agregó ${cantidad} litros a ${tipo}`;
  }
  
  
  

  export { estacionesLista, agregarEstacion, agregarAfila, obtenerCantidadCombustible, agregarCombustibleExistente};