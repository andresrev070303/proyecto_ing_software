import { estacionesLista } from "./data/mockEstaciones.js";
function registrarSurtidor({ nombre, zona, direccion, tipoCombustible }) {
    if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
      return "";
    }
  
    const resultado = { nombre: nombre.trim(),
  };
    
  
    if (zona && typeof zona === "string" && zona.trim() !== "") {
      resultado.zona = zona.trim();
    }
  
    if (direccion && typeof direccion === "string" && direccion.trim() !== "") {
      resultado.direccion = direccion.trim();

    if (tipoCombustible) {
        resultado.tipoCombustible = tipoCombustible;
    }
      
    }
    if (resultado.nombre && resultado.zona && resultado.direccion && resultado.tipoCombustible) {
      let adicionales = [];
      try {
        adicionales = JSON.parse(localStorage.getItem("nuevasEstaciones") || "[]");
      } catch (e) {
        console.error("Error leyendo nuevasEstaciones:", e);
      }
      
        const existentes = [...estacionesLista, ...adicionales];
    
        const yaExiste = existentes.some(e =>
          e.nombre === resultado.nombre &&
          e.zona === resultado.zona &&
          e.direccion === resultado.direccion &&
          e.tipoCombustible === resultado.tipoCombustible
        );
    
        if (yaExiste) {
          return "Estacion de servicio ya existente";
        }
      }
    return resultado;
  }
  
  export default registrarSurtidor;
  