/*calculadoraColas.test.sj*/
import { calcularVehiculosEnCola, calcularCapacidadCarga, gasolinaAlcanzara } from "../utils/calculadoraColas.js";

describe("calcularCola", () => {
  it("debería devolver 2 para una distancia de 12", () => {
    expect(calcularVehiculosEnCola(12)).toBe(2);
  });
  it("debería devolver 4 para una distancia de 21", () => {
    expect(calcularVehiculosEnCola(21)).toBe(4); // 3.5 redondea a 4
  });
  it("debería devolver 2 para 100 litros", () => {
    expect(calcularCapacidadCarga(100)).toBe(2);
  });
  it("debería retornar mensaje positivo si alcanza", () => {
    expect(gasolinaAlcanzara(18, 200)).toBe("Sí alcanzará: Hay suficiente combustible para su turno");
  });
  it("debería retornar mensaje negativo si no alcanza", () => {
    expect(gasolinaAlcanzara(30, 50)).toBe("No alcanzará: El combustible no cubrirá su posición en la cola");
  });
  it("debería retornar mensaje de advertencia si la capacidad es exacta", () => {
    expect(gasolinaAlcanzara(18, 150)).toBe("Advertencia: El combustible justo alcanza, mejor ir a otro surtidor para no arriesgarse");
  });

});