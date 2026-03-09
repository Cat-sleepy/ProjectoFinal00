import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Escala } from '../models/escala';
import { Interno } from '../models/interno';

@Injectable({
  providedIn: 'root'
})
export class EscalaService {
  private escalas: Escala[] = [];

  private atribuirEscalaSource = new Subject<void>();
  atribuirEscala = this.atribuirEscalaSource.asObservable();

  constructor() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const dadosGuardados = localStorage.getItem('escalas');

      if (dadosGuardados) {
        const escalasGuardadas = JSON.parse(dadosGuardados);

        this.escalas = escalasGuardadas.map((escala: any) => ({
          ...escala,
          id: Number(escala.id),
          internos: (escala.internos || []).map((interno: any) => ({
            ...interno,
            id: Number(interno.id),
            anoInternato: Number(interno.anoInternato)
          }))
        }));
      } else {
        this.guardarEscalas();
      }
    }
  }

  triggerNovaEscala(): void {
    this.atribuirEscalaSource.next();
  }

  private guardarEscalas(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('escalas', JSON.stringify(this.escalas));
    }
  }

  getEscalas(): Escala[] {
    return this.escalas.map(escala => ({
      ...escala,
      id: Number(escala.id),
      internos: escala.internos.map((interno: Interno) => ({
        ...interno,
        id: Number(interno.id),
        anoInternato: Number(interno.anoInternato)
      }))
    }));
  }

  criarEscala(escala: Escala): void {
    const novoId =
      this.escalas.length > 0
        ? Math.max(...this.escalas.map(e => Number(e.id))) + 1
        : 1;

    const novaEscala: Escala = {
      ...escala,
      id: novoId,
      internos: escala.internos.map(interno => ({
        ...interno,
        id: Number(interno.id),
        anoInternato: Number(interno.anoInternato)
      }))
    };

    this.escalas.push(novaEscala);
    this.guardarEscalas();
  }

  editarEscala(escalaAtualizada: Escala): void {
    const index = this.escalas.findIndex(
      e => Number(e.id) === Number(escalaAtualizada.id)
    );

    if (index !== -1) {
      this.escalas[index] = {
        ...escalaAtualizada,
        id: Number(escalaAtualizada.id),
        internos: escalaAtualizada.internos.map(interno => ({
          ...interno,
          id: Number(interno.id),
          anoInternato: Number(interno.anoInternato)
        }))
      };

      this.guardarEscalas();
    }
  }

  apagarEscala(id: number): void {
    this.escalas = this.escalas.filter(
      escala => Number(escala.id) !== Number(id)
    );

    this.guardarEscalas();
  }

  validarEscala(escala: Escala): { valida: boolean; mensagem: string } {
    const internos = escala.internos
    .filter(i => i && i.id)
    .map(interno => ({
      ...interno,
      id: Number(interno.id),
      anoInternato: Number(interno.anoInternato)
  }));

    if (escala.atribuicao === 'Urgência Dia') {
      if (internos.length !== 3) {
        return {
          valida: false,
          mensagem: 'Urgência Dia tem de ter exatamente 3 internos.'
        };
      }

      const todosPrimeiroAno = internos.every(i => i.anoInternato === 1);

      if (!todosPrimeiroAno) {
        return {
          valida: false,
          mensagem: 'Urgência Dia só pode ter internos do 1.º ano.'
        };
      }

      return { valida: true, mensagem: '' };
    }

    if (escala.atribuicao === 'Urgência Noite') {
      if (internos.length !== 2) {
        return {
          valida: false,
          mensagem: 'Urgência Noite tem de ter exatamente 2 internos.'
        };
      }

      const primeiroAno = internos.filter(i => i.anoInternato === 1).length;
      const outrosAnos = internos.filter(i => i.anoInternato > 1).length;

      if (primeiroAno !== 1 || outrosAnos !== 1) {
        return {
          valida: false,
          mensagem: 'Urgência Noite tem de ter 1 interno do 1.º ano e 1 interno de outro ano.'
        };
      }

      return { valida: true, mensagem: '' };
    }

    if (escala.atribuicao === 'Residência Noite') {
      if (internos.length !== 1) {
        return {
          valida: false,
          mensagem: 'Residência Noite tem de ter exatamente 1 interno.'
        };
      }

      if (internos[0].anoInternato === 1) {
        return {
          valida: false,
          mensagem: 'Residência Noite não pode ter internos do 1.º ano.'
        };
      }

      return { valida: true, mensagem: '' };
    }

    return {
      valida: false,
      mensagem: 'Atribuição inválida.'
    };
  }

  existeInternoRepetidoNoMesmoDia(escala: Escala): boolean {
    const idsNovos = escala.internos.map(i => Number(i.id));

    return this.escalas.some(outraEscala =>
      Number(outraEscala.id) !== Number(escala.id) &&
      outraEscala.data === escala.data &&
      outraEscala.internos.some(internoExistente =>
        idsNovos.includes(Number(internoExistente.id))
      )
    );
  }

  existeAtribuicaoRepetidaNoMesmoDia(escala: Escala): boolean {
    return this.escalas.some(outraEscala =>
      Number(outraEscala.id) !== Number(escala.id) &&
      outraEscala.data === escala.data &&
      outraEscala.atribuicao === escala.atribuicao
    );
  }

  getEscalaPorId(id: number): Escala | undefined {
  return this.getEscalas().find(escala => Number(escala.id) === Number(id));
}
}