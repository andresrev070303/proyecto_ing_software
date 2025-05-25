
import {
  generarTicket,
  obtenerTicketsPorEstacion,
  existeTicketActivoPorNombre,
  resetTickets,
  obtenerTodosLosTicketsAgrupados
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
    expect(tickets.length).toBeGreaterThanOrEqual(2);
    expect(tickets[0].fechaCarga <= tickets[1].fechaCarga).toBe(true);
  
    if (tickets[0].fechaCarga === tickets[1].fechaCarga) {
      expect(tickets[0].numeroTurno).toBeLessThan(tickets[1].numeroTurno);
    }
  });

  it('debe verificar si una persona tiene ticket activo', () => {
    const tiene = existeTicketActivoPorNombre('Lucía Mendoza');
    expect(tiene).toBe(true);
  });
  
  describe('Obtener todos los tickets agrupados por estación', () => {
    beforeEach(() => {
      resetTickets(estacionesLista);
    });
  
    it('debe retornar un objeto con tickets agrupados por estación', () => {
      const agrupados = obtenerTodosLosTicketsAgrupados();
      
      expect(agrupados).toHaveProperty('Gulf Norte');
      expect(Array.isArray(agrupados['Gulf Norte'])).toBe(true);
      expect(agrupados['Gulf Norte'].length).toBeGreaterThanOrEqual(1);
    });
  
    it('cada estación debe tener tickets ordenados por fecha y turno', () => {
      const agrupados = obtenerTodosLosTicketsAgrupados();
      const tickets = agrupados['Gulf Norte'];
  
      for (let i = 1; i < tickets.length; i++) {
        const prev = tickets[i - 1];
        const curr = tickets[i];
  
        if (prev.fechaCarga === curr.fechaCarga) {
          expect(prev.numeroTurno).toBeLessThanOrEqual(curr.numeroTurno);
        } else {
          expect(prev.fechaCarga <= curr.fechaCarga).toBe(true);
        }
      }
    });
  });
});