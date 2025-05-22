let estacionesLista = [
    // Zona Norte (3 estaciones)
    {
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
    },
    {
      nombre: "YPFB Cala Cala",
      direccion: "Av. Melchor Pérez #245",
      tipoCombustible: "Especial",
      cantidadDisponible: 7200,
      zona: "Norte",
      filaEspera: []
    },
    {
      nombre: "Petrobras La Recoleta",
      direccion: "Calle Jordán #321",
      tipoCombustible: "Diesel",
      cantidadDisponible: 6800,
      zona: "Norte",
      filaEspera: [
        {
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
        }
      ]
    },
  
    // Zona Sur (3 estaciones)
    {
      nombre: "YPFB San Antonio",
      direccion: "Av. Villazón #789",
      tipoCombustible: "Normal",
      cantidadDisponible: 9200,
      zona: "Sur",
      filaEspera: [
        {
          nombre: "Pedro Salazar",
          placa: "9988MNO"
        }
      ]
    },
    {
      nombre: "Gulf Terminal",
      direccion: "Av. Panamericana km 5",
      tipoCombustible: "Diesel",
      cantidadDisponible: 5500,
      zona: "Sur",
      filaEspera: []
    },
    {
      nombre: "Petrobras Queru Queru",
      direccion: "Av. 6 de Agosto #456",
      tipoCombustible: "Especial",
      cantidadDisponible: 4800,
      zona: "Sur",
      filaEspera: []
    },
  
    // Cercado (2 estaciones)
    {
      nombre: "YPFB Central",
      direccion: "Plaza Bolívar #123",
      tipoCombustible: "Normal",
      cantidadDisponible: 11000,
      zona: "Cercado",
      filaEspera: [
        {
          nombre: "Valeria Torres",
          placa: "2233XYZ"
        },
        {
          nombre: "Andrés Gutiérrez",
          placa: "1122TUV"
        },
        {
          nombre: "Sofía Herrera",
          placa: "3344QWE"
        },
        {
          nombre: "Diego Castro",
          placa: "5566RTY"
        }
      ]
    },
    {
      nombre: "Petrobras Muyurina",
      direccion: "Av. Ayacucho #678",
      tipoCombustible: "Diesel",
      cantidadDisponible: 7500,
      zona: "Cercado",
      filaEspera: []
    },
  
    // Quillacollo (2 estaciones)
    {
      nombre: "Gulf Quillacollo",
      direccion: "Av. Blanco Galindo #901",
      tipoCombustible: "Especial",
      cantidadDisponible: 6200,
      zona: "Quillacollo",
      filaEspera: []
    },
    {
      nombre: "YPFB Quillacollo Centro",
      direccion: "Calle Bolívar #1002",
      tipoCombustible: "Diesel",
      cantidadDisponible: 5800,
      zona: "Quillacollo",
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
    }
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
        placa: datosConductor.placa
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
          placa: datosConductor.placa
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

  export { estacionesLista, agregarEstacion, agregarAfila, obtenerCantidadCombustible};