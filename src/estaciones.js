/* estaciones.js */
import { estacionesLista } from './data/mockEstaciones.js';
  
export function obtenerEstaciones() {
    return estacionesLista;
}
  
export function ordenarPorCantidad() {
    return [...estacionesLista].sort((a, b) => b.cantidadDisponible - a.cantidadDisponible);
}
  
export function filtrarPorCombustible(tipo) {
    const tiposValidos = ["Diesel", "Normal", "Especial", "Gas"];
    if (!tiposValidos.includes(tipo)) {
        throw new Error(`Tipo de combustible "${tipo}" no reconocido`);
    }
    return estacionesLista.filter(e => e.tipoCombustible === tipo);
}