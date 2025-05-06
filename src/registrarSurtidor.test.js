import registrarSurtidor from "./registrarSurtidor.js";



global.localStorage = {
    store: {},
    getItem(key) {
      return this.store[key] || null;
    },
    setItem(key, value) {
      this.store[key] = value;
    },
    removeItem(key) {
      delete this.store[key];
    },
    clear() {
      this.store = {};
    }
  };
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

      it("debería registrar nombre, zona, dirección y tipo de combustible correctamente", () => {
        expect(registrarSurtidor({nombre: "Copacabana E.S",zona: "Sur",direccion: "Av. Costanera #123",tipoCombustible: "Diesel"
        })).toEqual({
            nombre: "Copacabana E.S",
            zona: "Sur",
            direccion: "Av. Costanera #123",
            tipoCombustible: "Diesel"
        });
      });



      
      it("debería retornar 'Estacion de servicio ya existente' si la estación ya está registrada", () => {
        // Estación que ya existe en la base de datos original
        const resultado = registrarSurtidor({
          nombre: "Gulf Norte",
          zona: "Norte",
          direccion: "Av. América #1256",
          tipoCombustible: "Normal"
        });
      
        expect(resultado).toBe("Estacion de servicio ya existente");
        });      
});