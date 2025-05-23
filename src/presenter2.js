import { agregarAfila } from './data/mockEstaciones.js';
import { 
  obtenerEstaciones, 
} from './utils/estaciones.js';
import {
  filtrarPorCombustible, 
  ordenarPorCantidad,
  filtrarPorZona,
  aplicarFiltrosCombinados 
} from './utils/combustible.filters.js';
import { agregarCombustibleExistente } from './data/mockEstaciones.js';


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
          <li>${conductor.nombre} - ${conductor.placa} (${conductor.tipo || 'sin tipo'})</li>
        `).join("")}
        
        </ul>
      `;
    }

    div.innerHTML = `
      <h3>${estacion.nombre}</h3>
      <p><strong>Zona:</strong> ${estacion.zona}</p>
      <p><strong>Dirección:</strong> ${estacion.direccion}</p>
      ${Array.isArray(estacion.combustibles) ? `
        <p><strong>Combustibles:</strong></p>
        <ul>
          ${estacion.combustibles.map(c => `<li>${c.tipo}: ${c.cantidad} litros</li>`).join("")}
        </ul>` : `<p><strong>Combustibles:</strong> No definidos</p>`
      }
      
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
    // Botón para calcular si alcanza la gasolina automáticamente
const calcularBtn = document.createElement("button");
calcularBtn.textContent = "Calcular Cola";
calcularBtn.style.marginTop = "5px";
calcularBtn.style.display = "block";

const resultadoCola = document.createElement("div");
resultadoCola.style.marginTop = "5px";

let detallesVisibles = false;

calcularBtn.addEventListener("click", () => {
  detallesVisibles = !detallesVisibles;

  if (!detallesVisibles) {
    resultadoCola.innerHTML = "";
    return;
  }

  const cantidadAutos = estacion.filaEspera?.length || 0;

  const evaluaciones = estacion.combustibles.map(c => {
    const capacidad = Math.floor(c.cantidad / 50);
    let mensaje = "";

    if (capacidad > cantidadAutos) {
      mensaje = `✅ <strong>${c.tipo}:</strong> Sí alcanzará`;
    } else if (capacidad === cantidadAutos) {
      mensaje = `⚠️ <strong>${c.tipo}:</strong> Alcanza justo, considera otro surtidor`;
    } else {
      mensaje = `❌ <strong>${c.tipo}:</strong> No alcanzará`;
    }

    return `
      <li>${mensaje}
        <ul>
          <li>Litros disponibles: ${c.cantidad}</li>
          <li>Capacidad para ${capacidad} vehículos</li>
          <li>Vehículos en cola: ${cantidadAutos}</li>
        </ul>
      </li>
    `;
  }).join("");

  resultadoCola.innerHTML = `
    <div style="margin-top: 10px; border: 1px solid #ccc; padding: 8px; border-radius: 5px;">
      <p><strong>Evaluación por tipo de combustible:</strong></p>
      <ul>${evaluaciones}</ul>
    </div>
  `;
});


div.appendChild(calcularBtn);
div.appendChild(resultadoCola);


    divEstaciones.appendChild(div);
  });
}


function obtenerCantidadCombustible(nombreEstacion) {
  const estaciones = obtenerEstaciones();
  const estacion = estaciones.find(est => est.nombre === nombreEstacion);
  return estacion ? estacion.cantidadDisponible : null;
}


function actualizarCantidadCombustible(nombreEstacion, nuevaCantidad) {
  let estaciones = obtenerEstaciones();
  const estacion = estaciones.find(est => est.nombre.toLowerCase() === nombreEstacion.toLowerCase());

  if (estacion) {
    estacion.cantidadDisponible = nuevaCantidad;

    // Actualizar en localStorage si está allí
    try {
      const adicionales = JSON.parse(localStorage.getItem("nuevasEstaciones") || "[]");
      const index = adicionales.findIndex(e => e.nombre.toLowerCase() === nombreEstacion.toLowerCase());
      if (index !== -1) {
        adicionales[index] = estacion;
        localStorage.setItem("nuevasEstaciones", JSON.stringify(adicionales));
      }
    } catch (error) {
      console.error("Error actualizando cantidad en localStorage:", error);
    }
  }
}



function MostrarFormularioCombustible(nombreEstacion) {
  const estacion = obtenerEstaciones().find(e => e.nombre === nombreEstacion);
  if (!estacion) {
    divEstaciones.innerHTML = `<p style="color:red">Estación no encontrada</p>`;
    return;
  }

  const opcionesCombustible = estacion.combustibles.map(c =>
    `<option value="${c.tipo}">${c.tipo}</option>`
  ).join("");

  divEstaciones.innerHTML = `
    <h2>Agregar combustible a ${nombreEstacion}</h2>
    <form id="form-combustible">
      <label>Tipo de combustible:</label>
      <select id="tipoCombustible">${opcionesCombustible}</select><br><br>

      <label>Cantidad de combustible:</label>
      <input type="number" id="cantidadCombustible" required><br><br>

      <button type="submit">Registrar</button>
    </form>
    <div id="resultadoCombustible"></div><div id="resultadoCombustible"></div>
<button id="cerrarFormularioBtn">Cerrar ventana</button>

  `;

  const form = document.getElementById("form-combustible");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById("cerrarFormularioBtn").addEventListener("click", () => {
      mostrarEstaciones(obtenerEstaciones());
    });
    

    const tipo = document.getElementById("tipoCombustible").value;
    const cantidad = parseFloat(document.getElementById("cantidadCombustible").value);

    if (isNaN(cantidad) || cantidad <= 0) {
      document.getElementById("resultadoCombustible").innerHTML =
        `<p style="color:red">Cantidad inválida.</p>`;
      return;
    }

    const resultado = agregarCombustibleExistente(nombreEstacion, tipo, cantidad);

    if (resultado.startsWith("Se agregó")) {
      document.getElementById("resultadoCombustible").innerHTML = `
        <div style="color: green; font-weight: bold; padding: 5px; border: 1px solid green; border-radius: 4px;">
          ✅ Se registró correctamente el ingreso de <strong>${tipo}</strong> con <strong>${cantidad} litros</strong>.
        </div>`;
    }
    
    
  });
}


function mostrarFormularioConductor(nombreEstacion) {
  const estacion = obtenerEstaciones().find(e => e.nombre === nombreEstacion);
  const opcionesCombustible = estacion.combustibles.map(c => `<option value="${c.tipo}">${c.tipo}</option>`).join("");

  divEstaciones.innerHTML = `
    <h2>Agregar conductor a ${nombreEstacion}</h2>
    <form id="form-conductor">
      <label>Nombre del conductor:</label>
      <input type="text" id="nombreConductor" required><br>
      <label>Placa del vehículo:</label>
      <input type="text" id="placaVehiculo" required><br>
      <label>Tipo de combustible:</label>
      <select id="tipoCombustible">${opcionesCombustible}</select><br><br>
      <button type="submit">Registrar</button>
    </form>
    <div id="resultadoConductor"></div>
  `;

  const form = document.getElementById("form-conductor");
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombreConductor").value.trim();
    const placa = document.getElementById("placaVehiculo").value.trim();
    const tipo = document.getElementById("tipoCombustible").value;

    const nuevoConductor = { nombre, placa, tipo };

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
export {mostrarEstaciones};