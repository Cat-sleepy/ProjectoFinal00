import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternosService } from '../../shared/services/internosService';
import { EscalaService } from '../../shared/services/escalaService';
import { Interno } from '../../shared/models/interno';
import { Escala } from '../../shared/models/escala';

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './relatorios.html',
  styleUrl: './relatorios.css'
})
export class Relatorios {
  internos: Interno[] = [];
  escalas: Escala[] = [];

  totalInternos = 0;
  internosIndisponiveis = 0;
  totalEscalas = 0;
  escalasMesAtual = 0;

  constructor(
    private internosService: InternosService,
    private escalaService: EscalaService
  ) {
    this.carregarDados();
    this.calcularKpis();
  }

  carregarDados(): void {
    this.internos = this.internosService.getInternos();
    this.escalas = this.escalaService.getEscalas();
  }

  calcularKpis(): void {
    this.totalInternos = this.internos.length;

    this.internosIndisponiveis = this.internos.filter(
      interno => interno.estado.toLowerCase() === 'indisponível'
    ).length;

    this.totalEscalas = this.escalas.length;

    const hoje = new Date();

    this.escalasMesAtual = this.escalas.filter(escala => {
      const data = new Date(escala.data);
      return (
        data.getMonth() === hoje.getMonth() &&
        data.getFullYear() === hoje.getFullYear()
      );
    }).length;
  }
}