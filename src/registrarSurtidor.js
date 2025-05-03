function registrarSurtidor({ nombre }) {
    if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
      return "";
    }
  
    return { nombre: nombre.trim() };
  }
  export default registrarSurtidor;
  