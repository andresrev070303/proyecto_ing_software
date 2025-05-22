/* combustible.filters.js */
import { estacionesLista } from '../data/mockEstaciones.js';


export function ordenarPorCantidad(estaciones = estacionesLista) {
  return [...estaciones].sort((a, b) =>
    b.combustibles.reduce((acc, c) => acc + c.cantidad, 0) -
    a.combustibles.reduce((acc, c) => acc + c.cantidad, 0)
  );
}

export function filtrarPorCombustible(tipo, estaciones = estacionesLista) {
  const tiposValidos = ["Diesel", "Normal", "Especial", "Gas"];
  if (!tiposValidos.includes(tipo)) {
    throw new Error(`Tipo de combustible "${tipo}" no reconocido`);
  }
  return estaciones.filter(e =>
    e.combustibles.some(c => c.tipo === tipo)
  );
}

export function filtrarPorZona(zona, estaciones = estacionesLista) {
  if (zona === "Todas las zonas") return [...estaciones];
  const zonasValidas = ["Norte", "Sur", "Cercado", "Quillacollo", "Colcapirua"];
  if (!zonasValidas.includes(zona)) {
    throw new Error(`Zona "${zona}" no reconocida`);
  }
  return estaciones.filter(e => e.zona === zona);
}

export function aplicarFiltrosCombinados({ zona, combustible, ordenar } = {}) {
  let resultado = obtenerEstaciones();

  if (zona && zona !== "Todas las zonas") {
    resultado = filtrarPorZona(zona, resultado);
  }

  if (combustible && combustible !== "Todos") {
    resultado = filtrarPorCombustible(combustible, resultado);
  }

  if (ordenar) {
    resultado = ordenarPorCantidad(resultado);
  }

  return resultado;
}
