/*src/test/registrarEstacion.test.js*/

import registrarEstacion from "../modules/estacion/registrarEstacion.js";

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
    expect(registrarEstacion({ nombre: "Copacabana E.S" })).toEqual({ nombre: "Copacabana E.S" });
  });

  it("debería registrar el nombre y la zona correctamente", () => {
    expect(registrarEstacion({ nombre: "Copacabana E.S", zona: "Sur" })).toEqual({ 
      nombre: "Copacabana E.S", 
      zona: "Sur" 
    });
  });

  it("debería registrar nombre, zona y dirección correctamente", () => {
    expect(registrarEstacion({ 
      nombre: "Copacabana E.S", 
      zona: "Sur", 
      direccion: "Av. Costanera #123" 
    })).toEqual({
      nombre: "Copacabana E.S",
      zona: "Sur",
      direccion: "Av. Costanera #123"
    });
  });

  it("debería registrar nombre, zona, dirección y tipo de combustible correctamente", () => {
    expect(registrarEstacion({
      nombre: "Copacabana E.S",
      zona: "Sur",
      direccion: "Av. Costanera #123",
      combustibles: [
        { tipo: "Diesel", cantidad: 0 }
      ]
    })).toEqual({
      nombre: "Copacabana E.S",
      zona: "Sur",
      direccion: "Av. Costanera #123",
      combustibles: [
        { tipo: "Diesel", cantidad: 0 }
      ]
    });
  });

  it("debería retornar 'Estacion de servicio ya existente' si la estación ya está registrada", () => {
    expect(registrarEstacion({
      nombre: "Gulf Norte",
      zona: "Norte",
      direccion: "Av. América #1256",
      combustibles: [
        { tipo: "Normal", cantidad: 850 },
        { tipo: "Diesel", cantidad: 600 }
      ]
    })).toBe("Estacion de servicio ya existente");
  });

  it("debería registrar una estación con un solo tipo de combustible en la nueva estructura", () => {
    const resultado = registrarEstacion({
      nombre: "Estación Nueva",
      zona: "Sur",
      direccion: "Av. Costanera #456",
      combustibles: [
        { tipo: "Diesel", cantidad: 0 }
      ]
    });

    expect(resultado).toEqual({
      nombre: "Estación Nueva",
      zona: "Sur",
      direccion: "Av. Costanera #456",
      combustibles: [
        { tipo: "Diesel", cantidad: 0 }
      ]
    });
  });
});