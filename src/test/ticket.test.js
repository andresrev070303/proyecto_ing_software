
import {
  generarTicket,
  obtenerTicketsPorEstacion,
  existeTicketActivoPorNombre,
  resetTickets
} from '../utils/ticket.js';

import { estacionesLista } from '../data/mockEstaciones';

describe('Generación de Ticket - TDD', () => {
  beforeEach(() => {
    resetTickets(estacionesLista); // Pasamos directamente el array
  });

  it('debe generar un ticket nuevo con número de turno correcto por fecha y tipo', () => {
  const ticket = generarTicket('Gulf Norte', 'Normal', 'ABC123', 'Nuevo Usuario', '2025-04-06');

  expect(ticket).toMatchObject({
    numeroTurno: 3, // Ya hay 2 tickets para Normal/2025-04-06
    tipoCombustible: 'Normal',
    estacion: 'Gulf Norte',
    placa: 'ABC123',
    nombre: 'Nuevo Usuario',
    fechaCarga: '2025-04-06'
  });
});

  it('no debe permitir múltiples tickets activos para la misma persona', () => {
    expect(() => {
      generarTicket('Gulf Norte', 'Normal', 'XYZ789', 'Carlos Rivas', '2025-04-06');
    }).toThrow('Ya tiene un ticket activo.');
  });

  it('debe incrementar el turno correctamente para otra fecha', () => {
    const ticket = generarTicket('Gulf Norte', 'Normal', 'NEWPLATE', 'Otro Usuario', '2025-04-07');

    expect(ticket.numeroTurno).toBe(1);
  });

  it('debe listar todos los tickets de una estación', () => {
    const tickets = obtenerTicketsPorEstacion('Gulf Norte');
    expect(tickets.length).toBe(2);
  });

  it('debe verificar si una persona tiene ticket activo', () => {
    const tiene = existeTicketActivoPorNombre('Lucía Mendoza');
    expect(tiene).toBe(true);
  });
});