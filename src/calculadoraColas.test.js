import { calcularVehiculosEnCola } from "./calculadoraColas.js";

describe("calcularVehiculosEnCola", () => {
  it("debería devolver 2 para una distancia de 12", () => {
    expect(calcularVehiculosEnCola(12)).toBe(2);
  });
  it("debería devolver 4 para una distancia de 21", () => {
    expect(calcularVehiculosEnCola(21)).toBe(4); // 3.5 redondea a 4
  });
});