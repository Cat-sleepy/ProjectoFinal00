import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Interno } from '../models/interno';

@Injectable({
  providedIn: 'root'
})
export class InternosService {

  abrirNovoInterno = new Subject<void>();
  internosAtualizados = new Subject<void>();
  pesquisaNome = new Subject<string>();

  internos: Interno[] = [];

  constructor() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const dadosGuardados = localStorage.getItem('internos');

      if (dadosGuardados) {
        const internosGuardados = JSON.parse(dadosGuardados);

        this.internos = internosGuardados.map((interno: any) =>
          this.normalizarInterno(interno)
        );
      } else {
        this.guardarInternos();
      }
    }
  }

  triggerNovoInterno() {
    this.abrirNovoInterno.next();
  }

  atualizarPesquisaNome(texto: string) {
    this.pesquisaNome.next(texto);
  }

  getInternos(): Interno[] {
    return this.internos.map(interno => ({
      ...interno
    }));
  }

  getInternoPorId(id: number): Interno | undefined {
    const interno = this.internos.find(
      item => Number(item.id) === Number(id)
    );

    return interno ? { ...interno } : undefined;
  }

  criarInterno(novoInterno: Interno): void {
    const novoId =
      this.internos.length > 0
        ? Math.max(...this.internos.map(i => Number(i.id))) + 1
        : 1;

    const internoNormalizado: Interno = this.normalizarInterno({
      ...novoInterno,
      id: novoId
    });

    this.internos.push(internoNormalizado);
    this.guardarInternos();
    this.internosAtualizados.next();
  }

  editarInterno(internoAtualizado: Interno): void {
    const index = this.internos.findIndex(
      interno => Number(interno.id) === Number(internoAtualizado.id)
    );

    if (index !== -1) {
      this.internos[index] = this.normalizarInterno(internoAtualizado);
      this.guardarInternos();
      this.internosAtualizados.next();
    }
  }

  guardarInterno(interno: Interno): void {
    if (!interno.id || Number(interno.id) === 0) {
      this.criarInterno(interno);
    } else {
      this.editarInterno(interno);
    }
  }

  apagarInterno(id: number): void {
    this.internos = this.internos.filter(
      interno => Number(interno.id) !== Number(id)
    );

    this.guardarInternos();
    this.internosAtualizados.next();
  }

  guardarInternos(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('internos', JSON.stringify(this.internos));
    }
  }

  private normalizarInterno(interno: any): Interno {
    return {
      ...interno,
      id: Number(interno.id),
      anoInternato: Number(interno.anoInternato)
    };
  }
}