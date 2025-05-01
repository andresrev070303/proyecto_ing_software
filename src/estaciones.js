/* estaciones.js */
import { estacionesLista } from './data/mockEstaciones.js';

export function obtenerEstaciones() {
    return estacionesLista;
}

export function ordenarPorCantidad(estaciones = estacionesLista) {
    return [...estaciones].sort((a, b) => b.cantidadDisponible - a.cantidadDisponible);
}

export function filtrarPorCombustible(tipo, estaciones = estacionesLista) {
    const tiposValidos = ["Diesel", "Normal", "Especial", "Gas"]; // Gas se mantiene como válido
    if (!tiposValidos.includes(tipo)) {
        throw new Error(`Tipo de combustible "${tipo}" no reconocido`);
    }
    return estaciones.filter(e => e.tipoCombustible === tipo);
}

export function filtrarPorZona(zona, estaciones = estacionesLista) {
    if (zona === "Todas las zonas") return [...estaciones];
    const zonasValidas = ["Norte", "Sur", "Cercado", "Quillacollo", "Colcapirua"];
    if (!zonasValidas.includes(zona)) {
        throw new Error(`Zona "${zona}" no reconocida`);
    }
    return estaciones.filter(e => e.zona === zona);
}

export function aplicarFiltrosCombinados({zona, combustible, ordenar} = {}) {
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