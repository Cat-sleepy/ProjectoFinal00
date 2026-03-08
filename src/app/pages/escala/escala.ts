import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EscalaService } from '../../shared/services/escalaService';
import { Escala } from '../../shared/models/escala';

@Component({
  selector: 'app-escala',
  imports: [CommonModule, FormsModule],
  templateUrl: './escala.html',
  styleUrl: './escala.css',
})
export class Escalas {
  escalas: Escala[] = [];
  escalaSelecionada: Escala | null = null;

  constructor(protected escalaService: EscalaService) {
    this.escalas = this.escalaService.getEscalas();

    this.escalaService.atribuirEscala.subscribe(() => {
      this.novaEscala();
    });
  }

  novaEscala() {
    this.escalaSelecionada = {
      id: 0,
      data: '',
      interno: {
        id: 0,
        nome: ''
      },
      periodoDia: '',
      atribuicao: ''
    };
  }

  editar(escala: Escala) {
    this.escalaSelecionada = {
      ...escala,
      interno: { ...escala.interno }
    };
  }

  guardar() {
    console.log('guardar escala');
    this.escalaSelecionada = null;
  }

  cancelar() {
    this.escalaSelecionada = null;
  }

  apagar(id: number) {
    console.log('apagar escala', id);
  }
}
