import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Escala } from '../models/escala';

@Injectable({
  providedIn: 'root'
})
export class EscalaService {

  atribuirEscala = new Subject<void>();

  triggerNovaEscala() {
    this.atribuirEscala.next();
  }

  escalas: Escala[] = [
    {
      id: 1,
      data: '2026-03-10',
      interno: {
        id: 1,
        nome: 'Ana Silva'
      },
      periodoDia: 'Dia',
      atribuicao: 'Urgência'
    },
    {
      id: 2,
      data: '2026-03-11',
      interno: {
        id: 2,
        nome: 'João Costa'
      },
      periodoDia: 'Noite',
      atribuicao: 'Residência'
    }
  ];

  getEscalas(): Escala[] {
    return this.escalas;
  }

}
