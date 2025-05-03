import registrarSurtidor from "./registrarSurtidor.js";

describe("RegistrarSurtidor", () => {
    it("debería registrar el nombre correctamente", () => {
        expect(registrarSurtidor({ nombre: "Copacabana E.S" })).toEqual({ nombre: "Copacabana E.S" });
      });
});