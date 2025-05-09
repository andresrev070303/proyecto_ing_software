import registrarSurtidor from "./registrarSurtidor.js";
import { agregarEstacion } from "./data/mockEstaciones.js";
import { gasolinaAlcanzara, calcularVehiculosEnCola, calcularCapacidadCarga } from "./calculadoraColas.js";

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
  const tipoCombustibleInput = document.querySelector("#tipoCombustible");

  const formCola = document.querySelector("#form-cola");
  const distanciaInput = document.querySelector("#distancia");
  const combustibleInput = document.querySelector("#combustible");
  const resultadoColaDiv = document.querySelector("#resultado-cola");
  
  const detalleColaDiv = document.querySelector("#detalle-cola");
  const mostrarDetalleBtn = document.querySelector("#mostrar-detalle-btn");
  

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
      const tipoCombustible = tipoCombustibleInput.value;

      const resultado = registrarSurtidor({ nombre, zona, direccion, tipoCombustible });

      if (resultado === "Estacion de servicio ya existente") {
        resultadoDiv.innerHTML = `<p style="color: red;">${resultado}</p>`;
      } else {
        const nuevaEstacion = {
          nombre: resultado.nombre,
          zona: resultado.zona,
          direccion: resultado.direccion,
          tipoCombustible: resultado.tipoCombustible,
          cantidadDisponible: 0,
          fila: [],
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

  if (formCola) {
    formCola.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const distancia = parseFloat(distanciaInput.value);
      const combustible = parseFloat(combustibleInput.value);

      if (isNaN(distancia) || distancia <= 0 || isNaN(combustible) || combustible <= 0) {
        resultadoColaDiv.innerHTML = `<p style="color: red;">Ingresa valores válidos.</p>`;
        mostrarDetalleBtn.style.display = "none";
        detalleColaDiv.style.display = "none";
        return;
      }
  
      
      const vehiculos = calcularVehiculosEnCola(distancia);
      const capacidad = calcularCapacidadCarga(combustible);
      const mensaje = gasolinaAlcanzara(distancia, combustible);
  
      resultadoColaDiv.innerHTML = `<p><strong>${mensaje}</strong></p>`;
      mostrarDetalleBtn.style.display = "inline-block";
      detalleColaDiv.style.display = "none";
  
      mostrarDetalleBtn.onclick = () => {
        const visible = detalleColaDiv.style.display === "block";
        detalleColaDiv.style.display = visible ? "none" : "block";
        mostrarDetalleBtn.textContent = visible ? "Ver detalles del cálculo" : "Ocultar detalles";
  
        if (!visible) {
          detalleColaDiv.innerHTML = `
            <h4>Detalles del cálculo:</h4>
            <ul>
              <li><strong>Fórmula vehículos en cola:</strong> distancia / 6m (promedio de auto)</li>
              <li><strong>Fórmula capacidad de carga:</strong> combustible / 50 (promedio de carga por auto)</li>
              <li><strong>Distancia ingresada:</strong> ${distancia} metros</li>
              <li><strong>Combustible ingresado:</strong> ${combustible} litros</li>
              <li><strong>Vehículos en cola:</strong> ${vehiculos}</li>
              <li><strong>Capacidad del surtidor:</strong> ${capacidad} vehículos</li>
            </ul>`;
        }
      };
    });
  }
  
});
import { estacionesLista } from "./data/mockEstaciones.js";
console.log("Estaciones registradas ahora:", estacionesLista);