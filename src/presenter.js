import registrarSurtidor from "./registrarSurtidor.js";
import { agregarEstacion } from "./data/mockEstaciones.js";

document.addEventListener("DOMContentLoaded", () => {
  const openWindowButton = document.querySelector("#open-window-btn");
  const newWindow = document.querySelector("#new-window");
  const originalContent = document.querySelector("#original-content");
  const closeWindowButton = document.querySelector("#close-window-btn");

  // Mostrar la "nueva ventana" y ocultar el contenido original
  if (openWindowButton) {
    openWindowButton.addEventListener("click", () => {
      originalContent.style.display = "none";
      newWindow.style.display = "block";
    });
  }

  // Cerrar la "nueva ventana" y volver a mostrar el contenido original
  if (closeWindowButton) {
    closeWindowButton.addEventListener("click", () => {
      originalContent.style.display = "block";
      newWindow.style.display = "none";
    });
  }

  // Manejo del formulario
  const form = document.querySelector("#form-surtidor");
  const nombreInput = document.querySelector("#nombre");
  const zonaInput = document.querySelector("#zona");
  const resultadoDiv = document.querySelector("#resultado-surtidor");


  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nombre = nombreInput.value;
      const zona = zonaInput.value.trim();
      const resultado = registrarSurtidor({ nombre, zona});

      if (resultado === "") {
        resultadoDiv.innerHTML = `<p style="color: red;">Nombre inválido.</p>`;
      } else {
        const nuevaEstacion = {
          nombre: resultado.nombre,
          direccion: "",
          tipoCombustible: "",
          cantidadDisponible: 0,
          zona: resultado.zona
        };
        
        agregarEstacion(nuevaEstacion);

// Guardar en localStorage
const existentes = JSON.parse(localStorage.getItem("nuevasEstaciones") || "[]");
existentes.push(nuevaEstacion);
localStorage.setItem("nuevasEstaciones", JSON.stringify(existentes));
      }
    });
  }
});
import { estacionesLista } from "./data/mockEstaciones.js";
console.log("Estaciones registradas ahora:", estacionesLista);