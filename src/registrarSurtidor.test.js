import registrarSurtidor from "./registrarSurtidor.js";

describe("RegistrarSurtidor", () => {
    it("debería registrar el nombre correctamente", () => {
        expect(registrarSurtidor({ nombre: "Copacabana E.S", })).toEqual({ nombre: "Copacabana E.S" });
      });
      it("debería registrar el nombre y la zona correctamente", () => {
        expect(registrarSurtidor({ nombre: "Copacabana E.S", zona: "Sur" })).toEqual({ 
            nombre: "Copacabana E.S", 
            zona: "Sur" });
      });
      it("debería registrar nombre, zona y dirección correctamente", () => {
        expect(registrarSurtidor({ nombre: "Copacabana E.S", zona: "Sur", direccion: "Av. Costanera #123" })).toEqual({ 
          nombre: "Copacabana E.S", 
          zona: "Sur", 
          direccion: "Av. Costanera #123" 
        });
      });
      
});