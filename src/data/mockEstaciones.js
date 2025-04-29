let estacionesLista = [
    // Zona Norte (3 estaciones)
    {
      nombre: "Gulf Norte",
      direccion: "Av. América #1256",
      tipoCombustible: "Normal",
      cantidadDisponible: 8500,
      zona: "Norte",
      filaEspera: []
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
      filaEspera: []
    },
  
    // Zona Sur (3 estaciones)
    {
      nombre: "YPFB San Antonio",
      direccion: "Av. Villazón #789",
      tipoCombustible: "Normal",
      cantidadDisponible: 9200,
      zona: "Sur",
      filaEspera: []
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
      filaEspera: []
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
      filaEspera: []
    }
  ];
  function agregarEstacion(estacion) {
    if (!estacion.fila) {
      estacion.fila = [];
  }
    estacionesLista.push(estacion);
  }
  
  function agregarAfila(nombreEstacion, datosConductor) {
    const estacion = estacionesLista.find(est => est.nombre === nombreEstacion);
    console.log(estacion);
    if (estacion) {
      const nuevaPosicion = estacion.filaEspera.length + 1;
      estacion.filaEspera.push({
        ...datosConductor, 
        posicion: nuevaPosicion
      });
      console.log(`Conductor ${datosConductor.nombre} agregado a la fila de ${nombreEstacion}. Posición: ${nuevaPosicion}`);
      return nuevaPosicion;
    } else {
      console.error(`Error: No se encontró la estación "${nombreEstacion}"`);
      return false;
    }
  }

  export { estacionesLista, agregarEstacion, agregarAfila};