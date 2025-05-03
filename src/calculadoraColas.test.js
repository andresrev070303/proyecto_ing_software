import { calcularVehiculosEnCola, calcularCapacidadCarga, gasolinaAlcanzara } from "./calculadoraColas.js";

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
});