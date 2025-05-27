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
  
  // ✅ Botón "Volver" del formulario de agregar a fila
  document.querySelector("#btn-volver-estaciones-fila")?.addEventListener("click", () => {
    document.querySelector("#agregar-fila-section").style.display = "none";
    document.querySelector("#seccion-estaciones").style.display = "block";
  });
  
  // ✅ Mostrar formulario de agregar a fila desde la tarjeta
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-agregar-fila")) {
      const nombreEstacion = e.target.getAttribute("data-estacion");
  
      const formFila = document.querySelector("#agregar-fila-section");
      const listaEstaciones = document.querySelector("#seccion-estaciones");
      const selectFila = document.querySelector("#estacion-fila");
  
      formFila.style.display = "block";
      if (listaEstaciones) listaEstaciones.style.display = "none";
  
      // Preseleccionar estación
      if (selectFila) {
        selectFila.value = nombreEstacion;
      }
  
      formFila.scrollIntoView({ behavior: "smooth" });
    }
  });
  // Botón "Volver" de formulario Generar Ticket
document.querySelector("#btn-volver-estaciones-ticket")?.addEventListener("click", () => {
    document.querySelector("#generar-ticket-section").style.display = "none";
    document.querySelector("#seccion-estaciones").style.display = "block";
  });
  
  // Mostrar formulario de Generar Ticket desde botón
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-generar-ticket")) {
      const nombreEstacion = e.target.getAttribute("data-estacion");
  
      const formTicket = document.querySelector("#generar-ticket-section");
      const listaEstaciones = document.querySelector("#seccion-estaciones");
      const selectTicket = document.querySelector("#ticket-estacion");
  
      formTicket.style.display = "block";
      if (listaEstaciones) listaEstaciones.style.display = "none";
  
      // Preseleccionar estación
      if (selectTicket) {
        selectTicket.value = nombreEstacion;
      }
  
      formTicket.scrollIntoView({ behavior: "smooth" });
    }
  });
  