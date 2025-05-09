import { agregarAfila } from './data/mockEstaciones.js';
import { 
  obtenerEstaciones, 
  filtrarPorCombustible, 
  ordenarPorCantidad,
  filtrarPorZona,
  aplicarFiltrosCombinados 
} from './estaciones.js';


const selectCombustible = document.querySelector("#combustible");
const selectZona = document.querySelector("#filtro-zona");
const checkboxOrdenar = document.querySelector("#ordenar-checkbox");
const divEstaciones = document.querySelector("#estaciones-container");


function mostrarEstaciones(estaciones) {
  if (estaciones.length === 0) {
    divEstaciones.innerHTML = "<p>No se encontraron estaciones con los filtros aplicados</p>";
    return;
  }

  divEstaciones.innerHTML = ""; 

  estaciones.forEach(estacion => {
    const div = document.createElement("div");

    let filaHtml = "";
    if (estacion.filaEspera && estacion.filaEspera.length > 0) {
      filaHtml = `
        <h4>Conductores en fila:</h4>
        <ul>
          ${estacion.filaEspera.map(conductor => `
            <li>${conductor.nombre} - ${conductor.placa}</li>
          `).join("")}
        </ul>
      `;
    }

    div.innerHTML = `
      <h3>${estacion.nombre}</h3>
      <p><strong>Zona:</strong> ${estacion.zona}</p>
      <p><strong>Dirección:</strong> ${estacion.direccion}</p>
      <p><strong>Combustible:</strong> ${estacion.tipoCombustible}</p>
      <p><strong>Disponible:</strong> ${estacion.cantidadDisponible} litros</p>
      ${filaHtml}
    `;

    const boton = document.createElement("button");
    boton.textContent = "Agregar conductor a la fila";
    boton.addEventListener("click", () => mostrarFormularioConductor(estacion.nombre));
    div.appendChild(boton);

    const boton2 = document.createElement("button");
    boton2.textContent = "Ingresar combustible";
    boton2.addEventListener("click", () => MostrarFormularioCombustible(estacion.nombre)); 
    div.appendChild(boton2);

    divEstaciones.appendChild(div);
  });
}


function obtenerCantidadCombustible(nombreEstacion) {
  const estaciones = obtenerEstaciones();
  const estacion = estaciones.find(est => est.nombre === nombreEstacion);
  return estacion ? estacion.cantidadDisponible : null;
}


function actualizarCantidadCombustible(nombreEstacion, nuevaCantidad) {
  const estaciones = obtenerEstaciones();
  const estacion = estaciones.find(est => est.nombre === nombreEstacion);
  if (estacion) {
    estacion.cantidadDisponible = nuevaCantidad;
  }
}


function MostrarFormularioCombustible(nombreEstacion){
  divEstaciones.innerHTML = `
    <h2>Agregar combustible a ${nombreEstacion}</h2>
    <form id="form-combustible">
      <label>Cantidad de combustible:</label>
      <input type="number" id="cantidadCombustible" required><br><br>
      <button type="submit">Registrar</button>
    </form>
    <div id="resultadoCombustible"></div>
  `;

  const form = document.getElementById("form-combustible");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const cantidad = parseFloat(document.getElementById("cantidadCombustible").value);
    if (isNaN(cantidad) || cantidad <= 0) {
      document.getElementById("resultadoCombustible").innerHTML =
      `<p style="color:red">Cantidad inválida.</p>`;
      return;
    }

    const cantidadActual = obtenerCantidadCombustible(nombreEstacion);
    if (cantidadActual !== null) {
      const cantidadTotal = cantidadActual + cantidad;

      
      actualizarCantidadCombustible(nombreEstacion, cantidadTotal);

      document.getElementById("resultadoCombustible").innerHTML =
        '<p style="color:green">Se agregó ${cantidad} litros. Total disponible: ${cantidadTotal} litros.</p>';

      mostrarEstaciones(obtenerEstaciones());
    }
  });
}


function mostrarFormularioConductor(nombreEstacion) {
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
    const tiempo = posicion * 5;

    document.getElementById("resultadoConductor").innerHTML =
      `<p style="color:green">Conductor registrado en la posición ${posicion} de la fila</p>
      <p style="color:black">Tiempo estimado : ${tiempo} minutos</p>`;
    mostrarEstaciones(obtenerEstaciones());
  });
}


function aplicarFiltros() {
  const estacionesFiltradas = aplicarFiltrosCombinados({
    zona: selectZona.value,
    combustible: selectCombustible.value,
    ordenar: checkboxOrdenar.checked
  });

  mostrarEstaciones(estacionesFiltradas);
}


selectCombustible.addEventListener("change", aplicarFiltros);
selectZona.addEventListener("change", aplicarFiltros);
checkboxOrdenar.addEventListener("change", aplicarFiltros);


document.addEventListener("DOMContentLoaded", () => {
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