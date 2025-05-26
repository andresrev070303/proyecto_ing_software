import { agregarAfila } from './data/mockEstaciones.js';
import { obtenerEstaciones } from './utils/estaciones.js';
import { filtrarPorCombustible, ordenarPorCantidad, filtrarPorZona, aplicarFiltrosCombinados } from './utils/combustible.filters.js';
import { agregarCombustibleExistente } from './data/mockEstaciones.js';

const selectCombustible = document.querySelector("#combustible");
const selectZona = document.querySelector("#filtro-zona");
const checkboxOrdenar = document.querySelector("#ordenar-checkbox");
const divEstaciones = document.querySelector("#estaciones-container");

// Función para mostrar las estaciones según un arreglo dado
function mostrarEstaciones(estaciones) {
  if (!Array.isArray(estaciones) || estaciones.length === 0) {
    divEstaciones.innerHTML = "<p>No se encontraron estaciones con los filtros aplicados</p>";
    return;
  }

  divEstaciones.innerHTML = "";

  estaciones.forEach(estacion => {
    const div = document.createElement("div");
    div.classList.add("estacion");

    // HTML para conductores en fila
    let filaHtml = "";
    if (estacion.filaEspera && estacion.filaEspera.length > 0) {
      filaHtml = `
        <h4>Conductores en fila:</h4>
        <ul>
          ${estacion.filaEspera.map(c => `<li>${c.nombre} - ${c.placa} (${c.tipo || 'sin tipo'})</li>`).join("")}
        </ul>
      `;
    }

    // HTML de los combustibles
    const combustiblesHtml = Array.isArray(estacion.combustibles)
      ? `<ul>${estacion.combustibles.map(c => `<li>${c.tipo}: ${c.cantidad} litros</li>`).join("")}</ul>`
      : `<p>No definidos</p>`;

    div.innerHTML = `
      <h3>${estacion.nombre}</h3>
      <p><strong>Zona:</strong> ${estacion.zona}</p>
      <p><strong>Dirección:</strong> ${estacion.direccion}</p>
      <p><strong>Combustibles:</strong> ${combustiblesHtml}</p>
      ${filaHtml}
    `;

    // Botón para agregar conductor
    const btnAgregarConductor = document.createElement("button");
    btnAgregarConductor.textContent = "Agregar conductor a la fila";
    btnAgregarConductor.addEventListener("click", () => mostrarFormularioConductor(estacion.nombre));
    div.appendChild(btnAgregarConductor);

    // Botón para ingresar combustible
    const btnAgregarCombustible = document.createElement("button");
    btnAgregarCombustible.textContent = "Ingresar combustible";
    btnAgregarCombustible.addEventListener("click", () => mostrarFormularioCombustible(estacion.nombre));
    div.appendChild(btnAgregarCombustible);

    // Botón calcular cola y resultado
    const btnCalcularCola = document.createElement("button");
    btnCalcularCola.textContent = "Calcular Cola";
    btnCalcularCola.style.marginTop = "5px";
    btnCalcularCola.style.display = "block";

    const resultadoCola = document.createElement("div");
    resultadoCola.style.marginTop = "5px";

    let detallesVisibles = false;

    btnCalcularCola.addEventListener("click", () => {
      detallesVisibles = !detallesVisibles;
      if (!detallesVisibles) {
        resultadoCola.innerHTML = "";
        return;
      }

      const autosPorTipo = {};
      (estacion.filaEspera || []).forEach(c => {
        const tipo = c.tipo || "Desconocido";
        autosPorTipo[tipo] = (autosPorTipo[tipo] || 0) + 1;
      });

      const evaluaciones = (estacion.combustibles || []).map(c => {
        const tipo = c.tipo;
        const cantidad = c.cantidad;
        const cantidadEnCola = autosPorTipo[tipo] || 0;

        if (cantidad <= 0) {
          return `<li>❌ <strong>${tipo}:</strong> No hay combustible disponible
            <ul><li>Vehículos en cola para ${tipo}: ${cantidadEnCola}</li></ul></li>`;
        }

        const capacidad = Math.floor(cantidad / 50);
        let mensaje = "";

        if (capacidad > cantidadEnCola) {
          mensaje = `✅ <strong>${tipo}:</strong> Sí alcanzará`;
        } else if (capacidad === cantidadEnCola) {
          mensaje = `⚠️ <strong>${tipo}:</strong> Alcanza justo, considera otro surtidor`;
        } else {
          mensaje = `❌ <strong>${tipo}:</strong> No alcanzará`;
        }

        return `<li>${mensaje}
          <ul>
            <li>Litros disponibles: ${cantidad}</li>
            <li>Capacidad para ${capacidad} vehículos</li>
            <li>Vehículos en cola para ${tipo}: ${cantidadEnCola}</li>
          </ul>
        </li>`;
      }).join("");

      resultadoCola.innerHTML = `
        <div style="margin-top: 10px; border: 1px solid #ccc; padding: 8px; border-radius: 5px;">
          <p><strong>Evaluación por tipo de combustible:</strong></p>
          <ul>${evaluaciones}</ul>
        </div>
      `;
    });

    div.appendChild(btnCalcularCola);
    div.appendChild(resultadoCola);

    divEstaciones.appendChild(div);
  });
}

function mostrarFormularioCombustible(nombreEstacion) {
  const estacion = obtenerEstaciones().find(e => e.nombre === nombreEstacion);
  if (!estacion) {
    divEstaciones.innerHTML = `<p style="color:red">Estación no encontrada</p>`;
    return;
  }

  const opcionesCombustible = estacion.combustibles.map(c => `<option value="${c.tipo}">${c.tipo}</option>`).join("");

  divEstaciones.innerHTML = `
    <h2>Agregar combustible a ${nombreEstacion}</h2>
    <form id="form-combustible">
      <label>Tipo de combustible:</label>
      <select id="tipoCombustible">${opcionesCombustible}</select><br><br>
      <label>Cantidad de combustible:</label>
      <input type="number" id="cantidadCombustible" required><br><br>
      <button type="submit">Registrar</button>
    </form>
    <div id="resultadoCombustible"></div>
    <button id="cerrarFormularioBtn">Cerrar ventana</button>
  `;

  document.getElementById("cerrarFormularioBtn").addEventListener("click", () => {
    mostrarEstaciones(obtenerEstaciones());
  });

  const form = document.getElementById("form-combustible");
  form.addEventListener("submit", e => {
    e.preventDefault();

    const tipo = document.getElementById("tipoCombustible").value;
    const cantidad = parseFloat(document.getElementById("cantidadCombustible").value);

    if (isNaN(cantidad) || cantidad <= 0) {
      document.getElementById("resultadoCombustible").innerHTML = `<p style="color:red">Cantidad inválida.</p>`;
      return;
    }

    const resultado = agregarCombustibleExistente(nombreEstacion, tipo, cantidad);

    if (resultado.startsWith("Se agregó")) {
      document.getElementById("resultadoCombustible").innerHTML = `
        <div style="color: green; font-weight: bold; padding: 5px; border: 1px solid green; border-radius: 4px;">
          ✅ Se registró correctamente el ingreso de <strong>${tipo}</strong> con <strong>${cantidad} litros</strong>.
        </div>`;
      // Actualizamos la vista para que muestre los cambios sin cerrar
      setTimeout(() => mostrarEstaciones(obtenerEstaciones()), 1000);
    }
  });
}

function mostrarFormularioConductor(nombreEstacion) {
  const estacion = obtenerEstaciones().find(e => e.nombre === nombreEstacion);
  if (!estacion) {
    divEstaciones.innerHTML = `<p style="color:red">Estación no encontrada</p>`;
    return;
  }
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
    <button id="cerrarFormularioConductorBtn">Cerrar ventana</button>
  `;

  document.getElementById("cerrarFormularioConductorBtn").addEventListener("click", () => {
    mostrarEstaciones(obtenerEstaciones());
  });

  const form = document.getElementById("form-conductor");
  form.addEventListener("submit", e => {
    e.preventDefault();

    const nombre = document.getElementById("nombreConductor").value.trim();
    const placa = document.getElementById("placaVehiculo").value.trim();
    const tipo = document.getElementById("tipoCombustible").value;

    if (!nombre || !placa) {
      document.getElementById("resultadoConductor").innerHTML = `<p style="color:red">Todos los campos son obligatorios.</p>`;
      return;
    }

    const nuevoConductor = { nombre, placa, tipo };
    const posicion = agregarAfila(nombreEstacion, nuevoConductor);

    if (posicion !== -1) {
      document.getElementById("resultadoConductor").innerHTML = `
        <div style="color: green; font-weight: bold; padding: 5px; border: 1px solid green; border-radius: 4px;">
          ✅ El conductor <strong>${nombre}</strong> con placa <strong>${placa}</strong> fue agregado a la fila en la posición <strong>${posicion + 1}</strong>.
        </div>`;
      setTimeout(() => mostrarEstaciones(obtenerEstaciones()), 1000);
    } else {
      document.getElementById("resultadoConductor").innerHTML = `<p style="color:red">Error al agregar conductor.</p>`;
    }
  });
}

// Función para actualizar la lista de estaciones con los filtros aplicados
function actualizarLista() {
  let estaciones = obtenerEstaciones();

  // Aplicar filtro por zona
  const zonaSeleccionada = selectZona.value;
  if (zonaSeleccionada && zonaSeleccionada !== "todas") {
    estaciones = filtrarPorZona(estaciones, zonaSeleccionada);
  }

  // Aplicar filtro por combustible
  const combustibleSeleccionado = selectCombustible.value;
  if (combustibleSeleccionado && combustibleSeleccionado !== "todos") {
    estaciones = filtrarPorCombustible(estaciones, combustibleSeleccionado);
  }

  // Aplicar orden si está marcado
  if (checkboxOrdenar.checked) {
    estaciones = ordenarPorCantidad(estaciones);
  }

  mostrarEstaciones(estaciones);
}
function cargarOpcionesFiltros() {
  const estaciones = obtenerEstaciones();

  // Obtener zonas únicas
  const zonasUnicas = [...new Set(estaciones.map(e => e.zona))];
  // Limpiar opciones existentes
  selectZona.innerHTML = '<option value="todas">Todas las zonas</option>';
  zonasUnicas.forEach(zona => {
    const option = document.createElement('option');
    option.value = zona;
    option.textContent = zona;
    selectZona.appendChild(option);
  });

  // Obtener combustibles únicos
  // Extraemos todos los tipos de combustible de todas las estaciones
  const tiposCombustible = new Set();
  estaciones.forEach(est => {
    est.combustibles.forEach(c => tiposCombustible.add(c.tipo));
  });
  // Limpiar opciones existentes
  selectCombustible.innerHTML = '<option value="todos">Todos los combustibles</option>';
  tiposCombustible.forEach(tipo => {
    const option = document.createElement('option');
    option.value = tipo;
    option.textContent = tipo;
    selectCombustible.appendChild(option);
  });
}



// Eventos para filtros y orden
selectZona.addEventListener("change", actualizarLista);
selectCombustible.addEventListener("change", actualizarLista);
checkboxOrdenar.addEventListener("change", actualizarLista);

// Inicialización al cargar el script
cargarOpcionesFiltros();
actualizarLista();

export { mostrarEstaciones };
