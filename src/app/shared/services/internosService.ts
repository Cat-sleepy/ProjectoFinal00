import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Interno } from '../models/interno';

@Injectable({
  providedIn: 'root'
})
export class InternosService {
  abrirNovoInterno = new Subject<void>();

  internos: Interno[] = [
    { id: 1, nome: 'Ana Silva', anoInternato: 1, estado: 'Ativo' },
    { id: 2, nome: 'João Costa', anoInternato: 2, estado: 'Indisponível' },
    { id: 3, nome: 'Mariana Sousa', anoInternato: 3, estado: 'Sem atribuição' }
  ];

  constructor() {
  if (typeof window !== 'undefined' && window.localStorage) {
    const dadosGuardados = localStorage.getItem('internos');

    if (dadosGuardados) {
      this.internos = JSON.parse(dadosGuardados);
    } else {
      this.guardarInternos();
    }
  }
}

  triggerNovoInterno() {
    this.abrirNovoInterno.next();
  }

  guardarInternos() {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem('internos', JSON.stringify(this.internos));
  }
}

  getInternos(): Interno[] {
    return this.internos;
  }

  criarInterno(novoInterno: Interno) {
    const novoId =
      this.internos.length > 0
        ? Math.max(...this.internos.map(i => i.id)) + 1
        : 1;

    novoInterno.id = novoId;
    this.internos.push(novoInterno);
    this.guardarInternos();
  }

  apagarInterno(id: number) {
    this.internos = this.internos.filter(interno => interno.id !== id);
    this.guardarInternos();
  }

  editarInterno(internoAtualizado: Interno) {
    const index = this.internos.findIndex(
      interno => interno.id === internoAtualizado.id
    );

    if (index !== -1) {
      this.internos[index] = internoAtualizado;
      this.guardarInternos();
    }
  }
}