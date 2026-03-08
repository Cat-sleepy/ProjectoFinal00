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
    internos: [],
    atribuicao: 'Urgência Dia'
  };
}

  editar(escala: Escala) {
    this.escalaSelecionada = {
      ...escala,
      internos: [...escala.internos]
    };
  }

  guardar() {
    if (!this.escalaSelecionada) return;

    const escalaValida = this.escalaService.validarEscala(this.escalaSelecionada);

    if (!escalaValida) {
      alert('A combinação de atribuição, período e internos não é válida.');
      return;
    }

    if (this.escalaSelecionada.id === 0) {
      this.escalaService.criarEscala(this.escalaSelecionada);
    } else {
      this.escalaService.editarEscala(this.escalaSelecionada);
    }

    this.escalas = this.escalaService.getEscalas();
    this.escalaSelecionada = null;
  }

  cancelar() {
    this.escalaSelecionada = null;
  }

  apagar(id: number) {
    this.escalaService.apagarEscala(id);
    this.escalas = this.escalaService.getEscalas();
  }
}
