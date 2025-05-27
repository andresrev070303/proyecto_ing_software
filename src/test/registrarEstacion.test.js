/*src/test/registrarEstacion.test.js*/

import registrarEstacion from "../modules/estacion/registrarEstacion.js";

// Simulamos localStorage
global.localStorage = {
  store: {},
  getItem(key) {
    return this.store[key] || null;
  },
  setItem(key, value) {
    this.store[key] = value;
  },
  clear() {
    this.store = {};
  }
};

describe("RegistrarSurtidor", () => {
  beforeEach(() => {
    localStorage.clear(); // Limpiamos antes de cada test
  });

  it("debería registrar el nombre correctamente", () => {
    const resultado = registrarEstacion({ nombre: "Copacabana E.S" });
    expect(resultado).toEqual({ nombre: "Copacabana E.S" });
  });

  it("debería registrar el nombre y la zona correctamente", () => {
    const resultado = registrarEstacion({
      nombre: "Copacabana E.S",
      zona: "Sur"
    });

    expect(resultado).toEqual({
      nombre: "Copacabana E.S",
      zona: "Sur"
    });
  });

  it("debería registrar nombre, zona y dirección correctamente", () => {
    const resultado = registrarEstacion({
      nombre: "Copacabana E.S",
      zona: "Sur",
      direccion: "Av. Costanera #123"
    });

    expect(resultado).toEqual({
      nombre: "Copacabana E.S",
      zona: "Sur",
      direccion: "Av. Costanera #123"
    });
  });

  it("debería registrar nombre, zona, dirección y tipo de combustible correctamente", () => {
    const resultado = registrarEstacion({
      nombre: "Copacabana E.S",
      zona: "Sur",
      direccion: "Av. Costanera #123",
      combustibles: [
        { tipo: "Diesel", cantidad: 0 }
      ]
    });

    expect(resultado).toEqual({
      nombre: "Copacabana E.S",
      zona: "Sur",
      direccion: "Av. Costanera #123",
      combustibles: [
        {
          cantidad: 0,
          tipo: {
            tipo: "Diesel",
            cantidad: 0
          }
        }
      ]
    });
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
        {
          cantidad: 0,
          tipo: {
            tipo: "Diesel",
            cantidad: 0
          }
        }
      ]
    });
  });
});