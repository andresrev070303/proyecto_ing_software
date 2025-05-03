function registrarSurtidor({ nombre, zona, direccion }) {
    if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
      return "";
    }
  
    const resultado = { nombre: nombre.trim() };
  
    if (zona && typeof zona === "string" && zona.trim() !== "") {
      resultado.zona = zona.trim();
    }
  
    if (direccion && typeof direccion === "string" && direccion.trim() !== "") {
      resultado.direccion = direccion.trim();
    }
  
    return resultado;
  }
  
  export default registrarSurtidor;
  