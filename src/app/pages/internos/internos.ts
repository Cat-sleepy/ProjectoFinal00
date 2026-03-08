import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InternosService } from '../../shared/services/internosService';
import { Interno } from '../../shared/models/interno';

@Component({
  selector: 'app-internos',
  imports: [CommonModule, FormsModule],
  templateUrl: './internos.html',
  styleUrl: './internos.css'
})
export class Internos {
  internos: Interno[] = [];
  internoSelecionado: Interno | null = null;

  constructor(protected internosService: InternosService) {
    this.internos = this.internosService.getInternos();

    this.internosService.abrirNovoInterno.subscribe(() => {
      this.novoInterno();
    });
  }

  novoInterno() {
    this.internoSelecionado = {
      id: 0,
      nome: '',
      anoInternato: 1,
      estado: ''
    };
  }

  editar(interno: Interno) {
    this.internoSelecionado = { ...interno };
  }

  guardar() {
    if (!this.internoSelecionado) return;

    if (this.internoSelecionado.id === 0) {
      this.internosService.criarInterno(this.internoSelecionado);
    } else {
      this.internosService.editarInterno(this.internoSelecionado);
    }

    this.internos = this.internosService.getInternos();
    this.internoSelecionado = null;
  }

  cancelar() {
    this.internoSelecionado = null;
  }

  apagar(id: number) {
    this.internosService.apagarInterno(id);
    this.internos = this.internosService.getInternos();
  }
}
