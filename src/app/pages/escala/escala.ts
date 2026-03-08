import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EscalaService } from '../../shared/services/escalaService';
import { InternosService } from '../../shared/services/internosService';
import { Escala } from '../../shared/models/escala';
import { Interno } from '../../shared/models/interno';

@Component({
  selector: 'app-escala',
  imports: [CommonModule, FormsModule],
  templateUrl: './escala.html',
  styleUrl: './escala.css',
})
export class Escalas {
  escalas: Escala[] = [];
  escalaSelecionada: Escala | null = null;
  internosDisponiveis: Interno[] = [];

  constructor(
    protected escalaService: EscalaService,
    protected internosService: InternosService
  ) {
    this.escalas = this.escalaService.getEscalas();
    this.internosDisponiveis = this.internosService.getInternos();

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

    this.ajustarInternosPorAtribuicao();
  }

  editar(escala: Escala) {
    this.escalaSelecionada = {
      ...escala,
      internos: [...escala.internos]
    };

    this.ajustarInternosPorAtribuicao();
  }

  ajustarInternosPorAtribuicao() {
    if (!this.escalaSelecionada || this.internosDisponiveis.length === 0) return;

    if (this.escalaSelecionada.atribuicao === 'Urgência Dia') {
      this.escalaSelecionada.internos = [
        this.escalaSelecionada.internos[0] || this.internosDisponiveis[0],
        this.escalaSelecionada.internos[1] || this.internosDisponiveis[0],
        this.escalaSelecionada.internos[2] || this.internosDisponiveis[0]
      ];
    }

    if (this.escalaSelecionada.atribuicao === 'Urgência Noite') {
      this.escalaSelecionada.internos = [
        this.escalaSelecionada.internos[0] || this.internosDisponiveis[0],
        this.escalaSelecionada.internos[1] || this.internosDisponiveis[0]
      ];
    }

    if (this.escalaSelecionada.atribuicao === 'Residência Noite') {
      this.escalaSelecionada.internos = [
        this.escalaSelecionada.internos[0] || this.internosDisponiveis[0]
      ];
    }
  }

  atualizarInterno(index: number, internoId: string) {
    if (!this.escalaSelecionada) return;

    const interno = this.internosDisponiveis.find(
      i => i.id === Number(internoId)
    );

    if (interno) {
      this.escalaSelecionada.internos[index] = interno;
    }
  }

  guardar() {
    if (!this.escalaSelecionada) return;

    const escalaValida = this.escalaService.validarEscala(this.escalaSelecionada);

    if (!escalaValida) {
      alert('A combinação de atribuição e internos não é válida.');
      return;
    }

    const internoRepetido = this.escalaService.existeInternoRepetidoNoMesmoDia(this.escalaSelecionada);

    if (internoRepetido) {
      alert('Não é possível atribuir o mesmo interno duas vezes no mesmo dia.');
      return;
    }

    const atribuicaoRepetida = this.escalaService.existeAtribuicaoRepetidaNoMesmoDia(this.escalaSelecionada);

    if (atribuicaoRepetida) {
      alert('Essa atribuição já existe nesse dia.');
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