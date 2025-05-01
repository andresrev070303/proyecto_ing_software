import { obtenerEstaciones, filtrarPorCombustible, ordenarPorCantidad } from './estaciones.js';

// Elementos del DOM
const selectCombustible = document.querySelector("#combustible");
const btnOrdenar = document.querySelector("#btn-ordenar");
const divEstaciones = document.querySelector("#estaciones-container");

// Función para renderizar estaciones
function mostrarEstaciones(estaciones) {
  if (estaciones.length === 0) {
    divEstaciones.innerHTML = "<p>No hay estaciones con este filtro</p>";
    return;
  }

  divEstaciones.innerHTML = estaciones.map(estacion => `
    <div class="estacion">
      <h3>${estacion.nombre}</h3>
      <p><strong>Direccion:</strong> ${estacion.direccion}</p> 
      <p><strong>Combustible:</strong> ${estacion.tipoCombustible}</p>
      <p><strong>Disponible:</strong> ${estacion.cantidadDisponible} litros</p>
    </div>
  `).join("");
}

// Evento: Filtrar por combustible
selectCombustible.addEventListener("change", () => {
  const tipo = selectCombustible.value;
  const estaciones = obtenerEstaciones();
  const estacionesFiltradas = tipo === "Todos" 
    ? estaciones 
    : filtrarPorCombustible(tipo);
  mostrarEstaciones(estacionesFiltradas);
});

// Evento: Ordenar por cantidad
btnOrdenar.addEventListener("click", () => {
  const estacionesOrdenadas = ordenarPorCantidad();
  mostrarEstaciones(estacionesOrdenadas);
});

// Carga inicial
document.addEventListener("DOMContentLoaded", () => {
  mostrarEstaciones(obtenerEstaciones());
});
