import { obtenerTodosLosTicketsAgrupados } from "./utils/ticket.js";

const container = document.querySelector("#lista-tickets");

if (container) {
  window.addEventListener("DOMContentLoaded", () => {
    const ticketsAgrupados = obtenerTodosLosTicketsAgrupados();

    // Limpiar contenedor
    container.innerHTML = "";

    if (Object.keys(ticketsAgrupados).length === 0) {
      container.innerHTML = "<p>No hay tickets registrados.</p>";
      return;
    }

    // Mostrar tickets agrupados por estación
    for (const [nombreEstacion, tickets] of Object.entries(ticketsAgrupados)) {
      if (tickets.length === 0) continue;

      const divEstacion = document.createElement("div");
      divEstacion.className = "ticket-estacion";
      divEstacion.innerHTML = `
        <h3>Tickets - ${nombreEstacion}</h3>
        <ul>
          ${tickets.map(t => `
            <li>
              Turno: <strong>${t.numeroTurno}</strong> |
              Nombre: <strong>${t.nombre}</strong> |
              Placa: <strong>${t.placa}</strong> |
              Fecha: <strong>${t.fechaCarga}</strong>
            </li>
          `).join("")}
        </ul>
      `;
      container.appendChild(divEstacion);
    }
  });
}