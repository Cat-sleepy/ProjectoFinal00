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

        const internosGuardados = JSON.parse(dadosGuardados);

        this.internos = internosGuardados.map((interno: any) => ({
          ...interno,
          id: Number(interno.id),
          anoInternato: Number(interno.anoInternato)
        }));

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

    return this.internos.map(interno => ({
      ...interno,
      id: Number(interno.id),
      anoInternato: Number(interno.anoInternato)
    }));

  }

  criarInterno(novoInterno: Interno) {

    const novoId =
      this.internos.length > 0
        ? Math.max(...this.internos.map(i => Number(i.id))) + 1
        : 1;

    const internoNormalizado: Interno = {
      ...novoInterno,
      id: novoId,
      anoInternato: Number(novoInterno.anoInternato)
    };

    this.internos.push(internoNormalizado);

    this.guardarInternos();

  }

  apagarInterno(id: number) {

    this.internos = this.internos.filter(
      interno => Number(interno.id) !== Number(id)
    );

    this.guardarInternos();

  }

  editarInterno(internoAtualizado: Interno) {

    const index = this.internos.findIndex(
      interno => Number(interno.id) === Number(internoAtualizado.id)
    );

    if (index !== -1) {

      this.internos[index] = {
        ...internoAtualizado,
        id: Number(internoAtualizado.id),
        anoInternato: Number(internoAtualizado.anoInternato)
      };

      this.guardarInternos();

    }

  }

  pesquisaNome = new Subject<string>();
  atualizarPesquisaNome(texto: string) {
  this.pesquisaNome.next(texto);
}

}