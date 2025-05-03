import registrarSurtidor from "./registrarSurtidor.js";
import { agregarEstacion } from "./data/mockEstaciones.js";

document.addEventListener("DOMContentLoaded", () => {
  const openWindowButton = document.querySelector("#open-window-btn");
  const newWindow = document.querySelector("#new-window");
  const originalContent = document.querySelector("#original-content");
  const closeWindowButton = document.querySelector("#close-window-btn");


  const openWindow2Button = document.querySelector("#open-window2-btn");
  const newWindow2 = document.querySelector("#new-window2");
  const closeWindow2Button = document.querySelector("#close-window2-btn");

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
     // Mostrar la "ventana 2"
  if (openWindow2Button) {
    openWindow2Button.addEventListener("click", () => {
      originalContent.style.display = "none";
      newWindow2.style.display = "block";
    });
  }

  // Cerrar la "ventana 2"
  if (closeWindow2Button) {
    closeWindow2Button.addEventListener("click", () => {
      newWindow2.style.display = "none";
      originalContent.style.display = "block";
    });
  }
  }

  // Manejo del formulario
  const form = document.querySelector("#form-surtidor");
  const nombreInput = document.querySelector("#nombre");
  const zonaInput = document.querySelector("#zona");
  const direccionInput = document.querySelector("#direccion");

  const resultadoDiv = document.querySelector("#resultado-surtidor");
  if (!nombre || !zona || !direccion) {
    resultadoDiv.innerHTML = `<p style="color: red;">Todos los campos son obligatorios.</p>`;
    return;
  }
  


  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nombre = nombreInput.value;
      const zona = zonaInput.value.trim();
      const direccion = direccionInput.value.trim();
      const resultadoDiv = document.querySelector("#resultado-surtidor");

      const resultado = registrarSurtidor({ nombre, zona, direccion});

      if (resultado === "Estacion de servicio ya existente") {
        resultadoDiv.innerHTML = `<p style="color: red;">${resultado}</p>`;
      } else {
        const nuevaEstacion = {
          nombre: resultado.nombre,
          zona: resultado.zona,
          direccion: resultado.direccion,
          tipoCombustible: "",
          cantidadDisponible: 0
        };
        
        agregarEstacion(nuevaEstacion);

// Guardar en localStorage
const existentes = JSON.parse(localStorage.getItem("nuevasEstaciones") || "[]");
existentes.push(nuevaEstacion);
localStorage.setItem("nuevasEstaciones", JSON.stringify(existentes));

resultadoDiv.innerHTML = `<p style="color: green;">Registrado correctamente: ${resultado.nombre}</p>`;

      }
    });
  }
});
import { estacionesLista } from "./data/mockEstaciones.js";
console.log("Estaciones registradas ahora:", estacionesLista);