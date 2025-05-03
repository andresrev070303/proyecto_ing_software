function registrarSurtidor({ nombre, zona }) {
    if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
      return "";
    }
  
    const resultado = { nombre: nombre.trim() };
  
    if (zona && typeof zona === "string" && zona.trim() !== "") {
      resultado.zona = zona.trim();
    }
  
    return resultado;
  }
  
  export default registrarSurtidor;
  