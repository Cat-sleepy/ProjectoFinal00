import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Interno } from '../models/interno';

@Injectable({
  providedIn: 'root'
})
export class InternosService {
  abrirNovoInterno = new Subject<void>();

  triggerNovoInterno() {
    this.abrirNovoInterno.next();
  }

  internos: Interno[] = [
    { id: 1, nome: 'Ana Silva', anoInternato: 1, estado: 'Ativo' },
    { id: 2, nome: 'João Costa', anoInternato: 2, estado: 'Indisponível' },
    { id: 3, nome: 'Mariana Sousa', anoInternato: 3, estado: 'Sem atribuição' }
  ];

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
  }

  apagarInterno(id: number) {
    this.internos = this.internos.filter(interno => interno.id !== id);
  }

  editarInterno(internoAtualizado: Interno) {
    const index = this.internos.findIndex(
      interno => interno.id === internoAtualizado.id
    );

    if (index !== -1) {
      this.internos[index] = internoAtualizado;
    }
  }
}