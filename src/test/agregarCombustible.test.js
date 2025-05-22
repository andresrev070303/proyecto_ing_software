import { agregarCombustibleExistente } from "../data/mockEstaciones.js";


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
  






it("debería agregar 100 litros a Normal si ya existe", () => {
    const estacion = {
      nombre: "Solo Normal",
      direccion: "Av. Central",
      zona: "Norte",
      combustibles: [{ tipo: "Normal", cantidad: 500 }],
      filaEspera: []
    };
  
    localStorage.setItem("nuevasEstaciones", JSON.stringify([estacion]));
  
    const resultado = agregarCombustibleExistente("Solo Normal", "Normal", 100);
    expect(resultado).toBe("Se agregó 100 litros a Normal");
  
    const actualizadas = JSON.parse(localStorage.getItem("nuevasEstaciones"));
    const cantidadFinal = actualizadas[0].combustibles.find(c => c.tipo === "Normal").cantidad;
  
    expect(cantidadFinal).toBe(600);
  });
  