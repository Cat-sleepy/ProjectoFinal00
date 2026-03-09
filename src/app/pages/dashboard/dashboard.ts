import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EscalaService } from '../../shared/services/escalaService';
import { Escala } from '../../shared/models/escala';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  escalas: Escala[] = [];
  diasCalendario: { numero: number; data: string; escalas: Escala[] }[] = [];
  mesAtual: string = '';

  constructor(private escalaService: EscalaService) {
    this.escalas = this.escalaService.getEscalas();
    this.gerarCalendarioMensal();
  }

  gerarCalendarioMensal() {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = hoje.getMonth();

  this.mesAtual = hoje.toLocaleDateString('pt-PT', {
    month: 'long',
    year: 'numeric'
  });

  const totalDias = new Date(ano, mes + 1, 0).getDate();
  this.diasCalendario = [];

  for (let dia = 1; dia <= totalDias; dia++) {
    const dataISO = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;

    this.diasCalendario.push({
      numero: dia,
      data: dataISO,
      escalas: this.escalas.filter(e => e.data === dataISO)
    });
  }
  }
}