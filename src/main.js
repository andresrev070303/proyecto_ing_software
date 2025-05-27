// import "./presenter.js";
// import "./presenter2.js";

import { obtenerEstaciones } from "./utils/estaciones.js";
import { resetTickets } from "./utils/ticket.js";

// 👇 Inicializa los datos del sistema de tickets con las estaciones actuales
resetTickets(obtenerEstaciones());

// 👇 Importa los presentadores después de inicializar todo
import "./presenterRegistrarEstaciones.js";
import "./presenterAgregarCombustible.js";
import "./presenterMostrarEstaciones.js";
import "./presenterAgregarFila.js";
import "./presenterFiltarEstaciones.js";
import "./presenterGenerarTickets.js";
import "./presenterMostrarTickets.js";
console.log("Aplicación iniciada");
document.querySelector("#btn-volver-estaciones")?.addEventListener("click", () => {
    document.querySelector("#agregar-combustible-section").style.display = "none";
    document.querySelector("#seccion-estaciones").style.display = "block";
  });
  