import { agregarAfila } from './data/mockEstaciones.js';
import { 
    obtenerEstaciones, 
    filtrarPorCombustible, 
    ordenarPorCantidad,
    filtrarPorZona,
    aplicarFiltrosCombinados 
  } from './estaciones.js';
  
  // Elementos del DOM
  const selectCombustible = document.querySelector("#combustible");
  const selectZona = document.querySelector("#filtro-zona");
  const checkboxOrdenar = document.querySelector("#ordenar-checkbox");
  const divEstaciones = document.querySelector("#estaciones-container");
  
  // Función para renderizar estaciones
  function mostrarEstaciones(estaciones) {
    if (estaciones.length === 0) {
      divEstaciones.innerHTML = "<p>No se encontraron estaciones con los filtros aplicados</p>";
      return;
    }
  
    //divEstaciones.innerHTML = "";
  
    estaciones.forEach(estacion => {
      const div = document.createElement("div");
  
      div.innerHTML = `
        <h3>${estacion.nombre}</h3>
        <p><strong>Zona:</strong> ${estacion.zona}</p>
        <p><strong>Dirección:</strong> ${estacion.direccion}</p>
        <p><strong>Combustible:</strong> ${estacion.tipoCombustible}</p>
        <p><strong>Disponible:</strong> ${estacion.cantidadDisponible} litros</p>
      `;
  
      const boton = document.createElement("button");
      boton.textContent = "Agregar conductor a la fila";
      boton.addEventListener("click", () => mostrarFormularioConductor(estacion.nombre));
  
      div.appendChild(boton);
      divEstaciones.appendChild(div);
    });
  }

  function mostrarFormularioConductor(nombreEstacion) {
    divEstaciones.innerHTML = "";
    divEstaciones.innerHTML = `
      <h2>Agregar conductor a ${nombreEstacion}</h2>
      <form id="form-conductor">
        <label>Nombre del conductor:</label>
        <input type="text" id="nombreConductor" required><br>
        <label>Placa del vehículo:</label>
        <input type="text" id="placaVehiculo" required><br>
        <button type="submit">Registrar</button>
      </form>
      <div id="resultadoConductor"></div>
    `;
  
    const form = document.getElementById("form-conductor");
    form.addEventListener("submit", function(e) {
      e.preventDefault();
  
      const nombre = document.getElementById("nombreConductor").value.trim();
      const placa = document.getElementById("placaVehiculo").value.trim();
      const nuevoConductor = { nombre, placa };

      const posicion = agregarAfila(nombreEstacion, nuevoConductor);
  
      document.getElementById("resultadoConductor").innerHTML =
        `<p style="color:green">Conductor registrado en la posición ${posicion} de la fila</p>`;
    });
  }
  // Función para aplicar todos los filtros
  function aplicarFiltros() {
    const estacionesFiltradas = aplicarFiltrosCombinados({
      zona: selectZona.value,
      combustible: selectCombustible.value,
      ordenar: checkboxOrdenar.checked
    });
  
    mostrarEstaciones(estacionesFiltradas);
  }
  
  // Eventos
  selectCombustible.addEventListener("change", aplicarFiltros);
  selectZona.addEventListener("change", aplicarFiltros);
  checkboxOrdenar.addEventListener("change", aplicarFiltros);
  
  // Carga inicial
  document.addEventListener("DOMContentLoaded", () => {
    // Inicializar selects
    selectZona.innerHTML = `
      <option value="Todas las zonas">Todas las zonas</option>
      <option value="Norte">Zona Norte</option>
      <option value="Sur">Zona Sur</option>
      <option value="Cercado">Cercado</option>
      <option value="Quillacollo">Quillacollo</option>
      <option value="Colcapirua">Colcapirua</option>
    `;
  
    selectCombustible.innerHTML = `
      <option value="Todos">Todos</option>
      <option value="Normal">Normal</option>
      <option value="Especial">Especial</option>
      <option value="Diesel">Diesel</option>
      <option value="Gas">Gas</option>
    `;
  
    mostrarEstaciones(obtenerEstaciones());
  });