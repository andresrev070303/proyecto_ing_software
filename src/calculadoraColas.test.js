import { calcularVehiculosEnCola } from "./calculadoraColas.js";

describe("calcularVehiculosEnCola", () => {
  it("debería devolver 2 para una distancia de 12", () => {
    expect(calcularVehiculosEnCola(12)).toBe(2);
  });
});