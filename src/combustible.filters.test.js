import  {ordenarPorCantidad} from './estaciones.js';

describe('Ordenamiento de Estaciones', () => {
  it('debe ordenar por cantidad descendente', () => {
    const ordenadas = ordenarPorCantidad();
    console.log(ordenadas);
    expect(ordenadas[0].nombre).toBe("Estación Cochabamba"); 
    expect(ordenadas[1].nombre).toBe("Estación San Martín"); 
    expect(ordenadas[5].nombre).toBe("Estación Queru Queru"); 
  });
});