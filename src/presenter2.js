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
  const btnOrdenar = document.querySelector("#btn-ordenar");
  const divEstaciones = document.querySelector("#estaciones-container");
  
  // Función para renderizar estaciones
  function mostrarEstaciones(estaciones) {
    if (estaciones.length === 0) {
      divEstaciones.innerHTML = "<p class='no-resultados'>No se encontraron estaciones con los filtros aplicados</p>";
      return;
    }
  
    divEstaciones.innerHTML = estaciones.map(estacion => `
      <div class="estacion">
        <h3>${estacion.nombre}</h3>
        <p><strong>Zona:</strong> ${estacion.zona}</p>
        <p><strong>Direccion:</strong> ${estacion.direccion}</p>
        <p><strong>Combustible:</strong> ${estacion.tipoCombustible}</p>
        <p><strong>Disponible:</strong> ${estacion.cantidadDisponible} litros</p>
      </div>
    `).join("");
  }
  
  // Función para aplicar todos los filtros
  function aplicarFiltros() {
    const tipoCombustible = selectCombustible.value;
    const zona = selectZona.value;
    const ordenar = document.querySelector("#ordenar-checkbox")?.checked;
  
    const estacionesFiltradas = aplicarFiltrosCombinados({
      zona: zona,
      combustible: tipoCombustible,
      ordenar: ordenar
    });
  
    mostrarEstaciones(estacionesFiltradas);
  }
  
  // Eventos
  selectCombustible.addEventListener("change", aplicarFiltros);
  selectZona.addEventListener("change", aplicarFiltros);
  btnOrdenar.addEventListener("click", () => {
    aplicarFiltros();
  });
  
  // Carga inicial
  document.addEventListener("DOMContentLoaded", () => {
    // Inicializar selects
    selectZona.innerHTML = `
      <option value="Todas las zonas">Todas las zonas</option>
      <option value="Norte">Zona Norte</option>
      <option value="Sur">Zona Sur</option>
      <option value="Cercado">Cercado</option>
      <option value="Quillacollo">Quillacollo</option>
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