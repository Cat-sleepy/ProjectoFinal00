import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Escala } from '../models/escala';

@Injectable({
  providedIn: 'root'
})
export class EscalaService {
  atribuirEscala = new Subject<void>();
escalas: Escala[] = [
  {
    id: 1,
    data: '2026-03-10',
    internos: [
      { id: 1, nome: 'Ana Silva', anoInternato: 1, estado: 'Ativo' },
      { id: 3, nome: 'Mariana Sousa', anoInternato: 1, estado: 'Ativo' },
      { id: 4, nome: 'Pedro Lima', anoInternato: 1, estado: 'Ativo' }
    ],
    atribuicao: 'Urgência Dia'
  },
  {
    id: 2,
    data: '2026-03-11',
    internos: [
      { id: 2, nome: 'João Costa', anoInternato: 1, estado: 'Ativo' },
      { id: 5, nome: 'Rita Lopes', anoInternato: 3, estado: 'Ativo' }
    ],
    atribuicao: 'Urgência Noite'
  }
];

  constructor() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const dadosGuardados = localStorage.getItem('escalas');

      if (dadosGuardados) {
        this.escalas = JSON.parse(dadosGuardados);
      } else {
        this.guardarEscalas();
      }
    }
  }

  triggerNovaEscala() {
    this.atribuirEscala.next();
  }

  guardarEscalas() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('escalas', JSON.stringify(this.escalas));
    }
  }

  getEscalas(): Escala[] {
    return this.escalas;
  }

  validarEscala(escala: Escala): boolean {
  const anos = escala.internos.map(i => i.anoInternato);

  if (escala.atribuicao === 'Urgência Dia') {
    return escala.internos.length === 3 && anos.every(ano => ano === 1);
  }

  if (escala.atribuicao === 'Urgência Noite') {
    const primeiroAno = anos.filter(ano => ano === 1).length;
    const outrosAnos = anos.filter(ano => [2, 3, 4, 5].includes(ano)).length;

    return escala.internos.length === 2 && primeiroAno === 1 && outrosAnos === 1;
  }

  if (escala.atribuicao === 'Residência Noite') {
    return escala.internos.length === 1 && [2, 3, 4, 5].includes(anos[0]);
  }

  return false;
}

  criarEscala(novaEscala: Escala) {
    const novoId =
      this.escalas.length > 0
        ? Math.max(...this.escalas.map(e => e.id)) + 1
        : 1;

    novaEscala.id = novoId;
    this.escalas.push(novaEscala);
    this.guardarEscalas();
  }

  apagarEscala(id: number) {
    this.escalas = this.escalas.filter(e => e.id !== id);
    this.guardarEscalas();
  }

  editarEscala(escalaAtualizada: Escala) {
    const index = this.escalas.findIndex(e => e.id === escalaAtualizada.id);

    if (index !== -1) {
      this.escalas[index] = escalaAtualizada;
      this.guardarEscalas();
    }
  }
}