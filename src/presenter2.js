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
  
    divEstaciones.innerHTML = estaciones.map(estacion => `
      <div>
        <h3>${estacion.nombre}</h3>
        <p><strong>Zona:</strong> ${estacion.zona}</p>
        <p><strong>Dirección:</strong> ${estacion.direccion}</p>
        <p><strong>Combustible:</strong> ${estacion.tipoCombustible}</p>
        <p><strong>Disponible:</strong> ${estacion.cantidadDisponible} litros</p>
      </div>
    `).join("");
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